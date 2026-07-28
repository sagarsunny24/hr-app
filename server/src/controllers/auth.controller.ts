import { RequestHandler } from "express";
import { AppDataSource } from "@/config/db.js";
import { Companies } from "@/entities/Companies.js";
import { Employee } from "@/entities/Employee.js";
import { Users } from "@/entities/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  AuthPayload,
  LoginArgs,
  LoginUserBody,
  RegisterArgs,
} from "@hr-app/shared";
import { envSchema } from "@/config/env.js";
import { Response } from "express";
import { GraphQLError } from "graphql";
const registerCompany = async (args: RegisterArgs) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const {
      emp_name,
      emp_email,
      emp_phone,
      emp_dept,
      emp_role,
      emp_joining_date,
      emp_status,
      company_name,
      registration_no,
      ceo_name,
      emp_designation,
      company_loc,
      created_date,
      company_address,
      password,
    } = args.input;
    const companyRepo = queryRunner.manager.getRepository(Companies);
    const employeeRepo = queryRunner.manager.getRepository(Employee);
    const userRepo = queryRunner.manager.getRepository(Users);

    const company = await companyRepo.save({
      company_name,
      registration_no,
      ceo_name,
      company_loc,
      created_date,
      company_address,
    });
    const employee = await employeeRepo.save({
      emp_name,
      emp_email,
      emp_phone,
      emp_dept,
      emp_role,
      emp_designation,
      emp_joining_date,
      emp_status,
      company,
    });
    const hashedPWD = await bcrypt.hash(password, 10);
    await userRepo.save({
      email: emp_email,
      password_hash: hashedPWD,
      user_id: employee.emp_id,
    });
    await queryRunner.commitTransaction();

    return { message: "Company successfully created" };
  } catch (err) {
    await queryRunner.rollbackTransaction();
    return err;
  } finally {
    await queryRunner.release();
  }
};

const loginUser = async (args: LoginArgs, res: Response) => {
  try {
    const { email, password }: LoginUserBody = args.input;
    const userRepo = AppDataSource.getRepository(Users);
    const employeeRepo = AppDataSource.getRepository(Employee);
    const user = await userRepo.findOne({
      where: {
        email: email,
      },
      relations: {
        user: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    } else {
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        throw new Error("Unauthorized");
      } else {
        const employee = await employeeRepo.findOne({
          where: {
            emp_email: email,
            emp_id: user.user_id,
          },
          relations: {
            company: true,
          },
        });
        if (!employee) {
          throw new Error("Employee does not exist");
        }
        const payload = {
          emp_id: employee.emp_id,
          emp_role: employee.emp_role,
          company_id: employee.company.company_id,
        };

        const accessToken = jwt.sign(payload, envSchema.ACCESS_TOKEN_SECRET, {
          expiresIn: "1d",
        });
        const refreshToken = jwt.sign(payload, envSchema.REFRESH_TOKEN_SECRET, {
          expiresIn: "7d",
        });
        user.refresh_token = refreshToken;
        await userRepo.save(user);
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
          maxAge: 604800000,
        });
        return {
          accessToken: accessToken,
          role: employee.emp_role,
          profile_image_path: employee.profile_image_path,
        };
      }
    }
  } catch (err) {
    return err;
  }
};

async function fetchUserByRefreshToken(refreshToken: string) {
  const userRepo = AppDataSource.getRepository(Users);
  const empRepo = AppDataSource.getRepository(Employee);

  let decoded: AuthPayload;

  try {
    decoded = jwt.verify(
      refreshToken,
      envSchema.REFRESH_TOKEN_SECRET,
    ) as AuthPayload;
  } catch {
    throw new Error("Invalid refresh token")
  }
  const userfound = await userRepo.findOneBy({ refresh_token: refreshToken });
  if (!userfound) throw new Error("User has no refresh token");
  const user = await empRepo.findOne({
    where: { emp_id: decoded.emp_id },
    relations: {
      company: true,
    },
  });
  if (!user)
    throw new Error("Employee not found")
  const payload = {
    emp_id: user.emp_id,
    emp_role: user.emp_role,
    company_id: user.company.company_id,
  };
  const accessToken =  jwt.sign(payload, envSchema.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  const newrefreshToken = jwt.sign(payload, envSchema.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  userfound.refresh_token = newrefreshToken;
  await userRepo.save(userfound);
  return {
    accessToken,
    role: user.emp_role,
    profile_image_path: user.profile_image_path,
  };
}

export { registerCompany, loginUser, fetchUserByRefreshToken };

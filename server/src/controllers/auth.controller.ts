import { RequestHandler } from "express";
import { AppDataSource } from "@/config/db.js";
import { Companies } from "@/entities/Companies.js";
import { Employee } from "@/entities/Employee.js";
import { Users } from "@/entities/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginUserBody } from "@hr-app/shared";
import { envSchema } from "@/config/env.js";

const registerCompany: RequestHandler = async (req, res, next) => {
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
      company_loc,
      created_date,
      company_address,
      password,
    } = req.body;

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

    res.status(201).json({ message: "Company successfully created" });
  } catch (err) {
    await queryRunner.rollbackTransaction();
    next(err);
  } finally {
    await queryRunner.release();
  }
};

const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password }: LoginUserBody = req.body;
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
      return next({ status: 404, message: "User not found" });
    } else {
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return next({ status: 401, message: "Unauthorized" });
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
          return next({ status: 404, message: "Employee does not exist" });
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
          sameSite: "none",
          secure: false,
          maxAge: 604800000,
        });
        res
          .status(200)
          .json({ accessToken: accessToken, role: employee.emp_role });
        
      }
    }
  } catch (err) {
    next(err);
  }
};

export { registerCompany, loginUser };

import { RequestHandler } from "express";
import { AppDataSource } from "@/config/db.js";
import { Companies } from "@/entities/Companies.js";
import { Employee } from "@/entities/Employee.js";
import { Users } from "@/entities/Users.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

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
      user: employee,
      email: emp_email,
      password_hash: hashedPWD,
    });
    await queryRunner.commitTransaction();
  
    res
      .status(201)
      .json({ message: "Company successfully created" });
  } catch (err) {
    await queryRunner.rollbackTransaction();
    next(err);
  } finally {
    await queryRunner.release();
  }
};

const loginUser:RequestHandler = async(req,res,next)=>{

}

export { registerCompany };

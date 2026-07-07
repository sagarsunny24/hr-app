import { RequestHandler } from "express";
import { AppDataSource } from "@/config/db.js";
import { Companies } from "@/entities/Companies.js";
import { Employee } from "@/entities/Employee.js";

const registerCompany: RequestHandler = async (req, res, next) => {
  const queryRunner = AppDataSource.createQueryRunner()
  await queryRunner.connect()
  await queryRunner.startTransaction()
  try {
    const {
      emp_name,emp_email,emp_phone,emp_dept,emp_role,emp_joining_date,emp_status,
      company_name,
      registration_no,
      ceo_name,
      company_loc,
      created_date,
      company_address,
    } = req.body;

   const companyRepo = queryRunner.manager.getRepository(Companies)
   const employeeRepo = queryRunner.manager.getRepository(Employee)

  const company = await companyRepo.save({
    company_name,
      registration_no,
      ceo_name,
      company_loc,
      created_date,
      company_address,
  })
  const employee = await employeeRepo.save({
    emp_name,emp_email,emp_phone,emp_dept,emp_role,emp_joining_date,emp_status,company
  })
 await queryRunner.commitTransaction()
    
    res.status(201).json({ message: "Company successfully created" });
  } catch (err) {
    await queryRunner.rollbackTransaction()
    next(err);
  }
  finally{
await queryRunner.release()
  }
};




export {registerCompany}
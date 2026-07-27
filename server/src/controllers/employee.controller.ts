import type { EmployeeDetails, ViewAllFilter } from "@hr-app/shared";
import { AppDataSource } from "@/config/db.js";
import { Employee } from "@/entities/Employee.js";
import { Companies } from "@/entities/Companies.js";
import { Users } from "@/entities/Users.js";
import bcrypt from "bcrypt";
type CreateArgs = {
  input: EmployeeDetails;
  company_id: string;
};

const createNewEmp = async (args: CreateArgs) => {
  const {
    emp_name,
    emp_email,
    emp_phone,
    emp_dept,
    emp_role,
    emp_joining_date,
    emp_status,
    emp_address,
    emp_designation,
    profile_image_path,
    emp_manager_id,
  } = args.input;
  const { company_id } = args;
  const employeeRepo = AppDataSource.getRepository(Employee);
  let manager: Employee | null = null;
  const companyRepo = AppDataSource.getRepository(Companies);
  const company = await companyRepo.findOneBy({ company_id: company_id });
  const usersRepo = await AppDataSource.getRepository(Users);
  if (!company) {
    throw new Error(`Company with id: ${company_id} not found`);
  }
  if (emp_manager_id) {
    manager = await employeeRepo.findOneBy({ emp_id: emp_manager_id });
  }
  // if (!manager) {
  //   throw new Error(`Manager with id: ${emp_manager_id} not found`);
  // }

  try {
    const newEmployee = employeeRepo.create({
      emp_name,
      emp_address,
      emp_dept,
      emp_email,
      emp_joining_date,
      emp_manager: manager,
      emp_phone,
      emp_role,
      emp_designation,
      emp_status,
      company: company,
      profile_image_path,
    });

    await employeeRepo.save(newEmployee);
    const temp_password =
      emp_name.slice(0, 4) +
      emp_email.slice(0, 4) +
      Math.floor(1000 + Math.random() * 9000);
    const password_hash = await bcrypt.hash(temp_password, 10);
    const newUser = usersRepo.create({
      email: emp_email,
      user: newEmployee,
      password_hash,
      refresh_token: null,
    });
    await usersRepo.save(newUser);
    return {
      message: "Employee created successfully",
      email: emp_email,
      temp_pswrd: temp_password,
    };
  } catch (err) {
    throw new Error(`Failed to create employee: ${(err as Error).message}`);
  }
};

const viewAllEmployees = async (
  company_id: string,
  { filter }: ViewAllFilter,
) => {
  const employeeRepo = AppDataSource.getRepository(Employee);

  const qb = employeeRepo.createQueryBuilder("employee");

  qb.where("employee.company_id = :company_id", { company_id });

  if(filter?.emp_name && filter?.emp_name?.trim() !== ""){
    qb.andWhere("employee.emp_name ILIKE :name",{
      name:`%${filter.emp_name.trim()}%` 

    })
   
  }
  if (filter?.emp_dept) {
    qb.andWhere("employee.emp_dept = :dept", { dept: filter.emp_dept });
  }
  if (filter?.emp_role) {
    qb.andWhere("employee.emp_role = :role", { role: filter.emp_role });
  }
  if (filter?.emp_designation) {
    qb.andWhere("employee.emp_designation = :designation", {
      designation: filter.emp_designation,
    });
  }

  if (filter?.emp_status) {
    qb.andWhere("employee.emp_status = :status", { status: filter.emp_status });
  }
  if (filter?.emp_joining_date) {
    qb.andWhere("employee.emp_joining_date > :date", {
      date: "2024-01-01",
    });
  }
  qb.skip(filter?.offset ?? 0);
  qb.take(filter?.limit ?? 10);
  const [employees,total] = await qb.getManyAndCount()
  const limit = filter?.limit ?? 10;
const offset = filter?.offset ?? 0;

const page = Math.floor(offset / limit) + 1;
  return {
    data:employees,
    total:total,
    page,
    limit,
    totalPages: Math.ceil(total/limit),
  }

  // const company = await companyRepo.findOneBy({company_id:company_id})
  // if(!company){
  //   throw new Error('Company not found')
  // }
  //  const allEmployees = await employeeRepo.findBy({company:company})
  //  return allEmployees;
};

export { createNewEmp, viewAllEmployees };

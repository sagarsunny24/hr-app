import type { EmployeeDetails, ViewAllFilter } from "@hr-app/shared";
import { AppDataSource } from "@/config/db.js";
import { Employee } from "@/entities/Employee.js";
import { Companies } from "@/entities/Companies.js";

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
  let company = await companyRepo.findOneBy({ company_id: company_id });

  if (!company) {
    throw new Error(`Company with id: ${company_id} not found`);
  }
  if (emp_manager_id) {
    manager = await employeeRepo.findOneBy({ emp_id: emp_manager_id });
  }
  if (!manager) {
    throw new Error(`Manager with id: ${emp_manager_id} not found`);
  }

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
    return { message: "Employee created successfully" };
  } catch (err) {
    throw new Error(`Failed to create employee: ${(err as Error).message}`);
  }
};

const viewAllEmployees = async(company_id:string,{filter}:ViewAllFilter)=>{
  const employeeRepo = AppDataSource.getRepository(Employee)

  const qb = employeeRepo.createQueryBuilder('employee');

  qb.where('employee.company_id = :company_id',{company_id})

  if(filter?.emp_dept) {
    qb.andWhere('employee.emp_dept = :dept',{dept:filter.emp_dept})
  }
  if(filter?.emp_role){
    qb.andWhere('employee.emp_role = :role',{role:filter.emp_role})
  }
  if(filter?.emp_designation){
    qb.andWhere('employee.emp_designation = :designation',{designation:filter.emp_designation})
  }

  if(filter?.emp_status){
    qb.andWhere('employee.emp_status = :status',{status:filter.emp_status})
  }
  if(filter?.emp_joining_date){
    qb.andWhere(
    "employee.emp_joining_date > :date",
    {
        date: "2024-01-01",
    }
);
  }
  qb.skip(filter?.offset ?? 0)
  qb.take(filter?.limit ?? 10)

  return qb.getMany()

  // const company = await companyRepo.findOneBy({company_id:company_id})
  // if(!company){
  //   throw new Error('Company not found')
  // }
//  const allEmployees = await employeeRepo.findBy({company:company})
//  return allEmployees;
}


export { createNewEmp,viewAllEmployees };

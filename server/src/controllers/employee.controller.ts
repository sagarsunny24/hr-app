import type { EmployeeDetails } from "@hr-app/shared";
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
    profile_image_path,
    emp_manager_id,
  } = args.input;
  const {company_id} = args
  const employeeRepo = AppDataSource.getRepository(Employee)
  let manager:Employee | null = null
  const companyRepo = AppDataSource.getRepository(Companies)
  let company = await companyRepo.findOneBy({company_id:company_id})

  if(!company){
    throw new Error(`Company with id: ${company_id} not found`)
  }
  if(emp_manager_id) {
    manager = await employeeRepo.findOneBy({emp_id:emp_manager_id})
  }
  if(!manager){
    throw new Error(`Manager with id: ${emp_manager_id} not found`)
  }

  try{
    const newEmployee = employeeRepo.create({
      emp_name,
      emp_address,
      emp_dept,
      emp_email,
      emp_joining_date,
      emp_manager:manager,
      emp_phone,
      emp_role,
      emp_status,
      company:company,

    })

await employeeRepo.save(newEmployee);
return {message: "Employee created successfully"};
  }
catch(err){
  throw new Error(`Failed to create employee: ${(err as Error).message}`);


}
}

export { createNewEmp };

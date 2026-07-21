export const typeDefs = `
enum EmpStatus {
ACTIVE
PROBATION
INACTIVE
}
type EmployeeResponse{
emp_id: String!
emp_name: String!
  emp_email: String!
  emp_phone: String!
  emp_dept: String!
  emp_role: String!
  emp_joining_date: String!
  emp_status: String!
  }

  input EmployeeFilter {
    emp_dept: String
    emp_role:String
    emp_joining_date:String!
    emp_status:String!
  
  }
type Query {
viewAll(filter: EmployeeFilter): [EmployeeResponse]
}



input LoginCredentials {
  email: String!
  password:String!
}

type LoginResponse {
  accessToken:String
  role:String
}
type RegisterResponse {
  message: String!
}
input RegisterDetails {
  emp_name: String!
  emp_email: String!
  emp_phone: String!
  emp_dept: String!
  emp_role: String!
  emp_designation:String!
  emp_joining_date: String!
  emp_status: EmpStatus!

  company_name: String!
  registration_no: String!
  ceo_name: String!
  company_loc: String!
  created_date: String!
  company_address: String!

  password: String!
}
type Mutation {
  login(input:LoginCredentials!): LoginResponse!
  register(input:RegisterDetails!):RegisterResponse!
  addEmployee(input:EmployeeDetails!):Response
}
type Response {
message:String!
}

input EmployeeDetails {
  emp_name: String!
  emp_email: String!
  emp_phone: String!
  emp_dept: String!
  emp_role: String!
  emp_designation: String!
  emp_joining_date: String!
  emp_status: String!
  emp_address: String!
  emp_manager_id:String
  profile_image_path:String
  company_id:String!
}




`;

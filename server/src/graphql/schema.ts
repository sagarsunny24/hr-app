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
  emp_designation: String!
  profile_image_path: String
  }
type EmployeeListResponse {
  data: [EmployeeResponse!]!
  total: Int!
  totalPages: Int!
  limit: Int!
  page:Int!
}

  input EmployeeFilter {
  limit:Int = 10
  offset:Int = 0
  emp_name:String
    emp_dept: String
    emp_role:String
    emp_designation:String
    emp_joining_date:String
    emp_status:String
  
  }

  input AttendanceFilter {
  limit:Int = 30
  offset:Int = 0
  emp_dept:String
  emp_id:String
  }
  type AttendanceLogResponse {
  attendance_id: Int
attendance_date:String
check_in:String
check_out:String
total_hours:Float
status:String!
  }
type Query {
viewAll(filter: EmployeeFilter): EmployeeListResponse!
attendanceLog(filter:AttendanceFilter) : [AttendanceLogResponse]!
refreshEndpoint:LoginResponse
}



input LoginCredentials {
  email: String!
  password:String!
}

type LoginResponse {
  accessToken:String
  role:String
  profile_image_path:String
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
type AttendanceResponse {
isLoggedIn:Boolean!
loggedTimestamp:String!
checkIn:String
checkOut:String
totalHours:Float
status:String!

}

type Mutation {
  login(input:LoginCredentials!): LoginResponse!
  register(input:RegisterDetails!):RegisterResponse!
  addEmployee(input:EmployeeDetails!):Response
  webClockIn(timestamp:String!):AttendanceResponse!
}
type Response {
message:String!
email:String!
temp_pswrd:String!
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
}




`;

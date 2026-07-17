import { types } from "node:ffi"

export const typeDefs = `
type Query {
_empty:String
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
  emp_joining_date: String!
  emp_status: String!

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
}
  `
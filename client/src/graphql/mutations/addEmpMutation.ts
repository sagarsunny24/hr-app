import { gql } from "@apollo/client";
import type { TypedDocumentNode } from "@apollo/client";
import type { EmployeeDetails,AddEmpRes } from "@hr-app/shared";

export const ADDEMP_MUTATION:TypedDocumentNode<AddEmpRes,{input:EmployeeDetails}>= gql`
mutation Mutation($input: EmployeeDetails!) {
  addEmployee(input: $input) {
    message
    email
    temp_pswrd
  }
}
`
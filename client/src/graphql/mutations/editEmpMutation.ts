import { gql } from "@apollo/client";
import type { TypedDocumentNode } from "@apollo/client";
import type { EmployeeDetails,AddEmpRes } from "@hr-app/shared";

export const EDITEMP_MUTATION:TypedDocumentNode<AddEmpRes,{input:EmployeeDetails}>= gql`
mutation EditEmployee($input: EditEmployeeInput!) {
  editEmployee(input: $input) {
    message
  }
}
`
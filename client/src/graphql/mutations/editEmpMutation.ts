import { gql } from "@apollo/client";
import type { TypedDocumentNode } from "@apollo/client";
import type {EditEmpRes,EditEmpVars  } from "@hr-app/shared";

export const EDITEMP_MUTATION:TypedDocumentNode<EditEmpRes,EditEmpVars>= gql`
mutation EditEmployee($input: EditEmployeeInput!) {
  editEmployee(input: $input) {
    message
  }
}
`
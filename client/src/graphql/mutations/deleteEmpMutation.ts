import { gql,type TypedDocumentNode } from "@apollo/client";


export const DELETE_EMP_MUTATION:TypedDocumentNode<{message:string},{empId:string}> = gql`mutation Mutation($empId: String!) {
  deleteEmployee(emp_id: $empId) {
    message
  }
}`
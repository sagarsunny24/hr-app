import { gql, type TypedDocumentNode } from "@apollo/client";
import { type MngrDetailsRes, type ViewAllFilter } from "@hr-app/shared";

export const FETCH_MNGR_QUERY:TypedDocumentNode<MngrDetailsRes,ViewAllFilter> = gql`query Query($filter: EmployeeFilter) {
  viewAll(filter: $filter) {
    emp_id
    emp_name
    profile_image_path
  }
}`
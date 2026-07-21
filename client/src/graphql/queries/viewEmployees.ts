import { gql,type TypedDocumentNode } from "@apollo/client";
import type { ViewAllFilter,ViewAllResponse } from "@hr-app/shared";


export const VIEWALL_QUERY:TypedDocumentNode<ViewAllResponse,ViewAllFilter> = gql`query Query($filter: EmployeeFilter) {
  viewAll(filter: $filter) {
    emp_dept
    emp_email
    emp_id
    emp_joining_date
    emp_name
    emp_role
    emp_designation
    emp_status
    emp_phone
    profile_image_path
  }
}`
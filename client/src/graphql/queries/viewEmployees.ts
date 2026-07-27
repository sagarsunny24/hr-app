import { gql,type TypedDocumentNode } from "@apollo/client";
import type { ViewAllFilter,ViewAllResponse } from "@hr-app/shared";


export const VIEWALL_QUERY:TypedDocumentNode<ViewAllResponse,ViewAllFilter> = gql`query Query($filter: EmployeeFilter) {
  viewAll(filter: $filter) {
    data {
      emp_dept
      emp_designation
      emp_email
      emp_joining_date
      emp_name
      emp_phone
      emp_role
      emp_status
      profile_image_path
      emp_id
    }
    limit
    page
    total
    totalPages
  }
}`
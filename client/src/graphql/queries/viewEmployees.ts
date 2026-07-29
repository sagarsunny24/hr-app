import { gql,type TypedDocumentNode } from "@apollo/client";
import type { ViewAllFilter,ViewAllResponse } from "@hr-app/shared";


export const VIEWALL_QUERY:TypedDocumentNode<ViewAllResponse,ViewAllFilter> = gql`query ViewAll($viewAllFilter2: EmployeeFilter) {
  viewAll(filter: $viewAllFilter2) {
    data {
      emp_address
      emp_dept
      emp_designation
      emp_email
      emp_id
      emp_joining_date
      emp_name
      emp_phone
      emp_role
      emp_status
      emp_manager {
        emp_id
        emp_name
        profile_image_path
      }
      profile_image_path
    }
    limit
    page
    total
    totalPages
  }
}`
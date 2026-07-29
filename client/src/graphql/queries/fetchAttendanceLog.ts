import { gql,type TypedDocumentNode } from "@apollo/client";
import type { AttendanceFilter, AttendanceResponse } from "@hr-app/shared";


export const FETCH_ATT_LOG_QUERY:TypedDocumentNode<AttendanceResponse,AttendanceFilter> = gql`query AttendanceLog($filter: AttendanceFilter) {
  attendanceLog(filter: $filter) {
    attendance_id
    check_in
    emp_id
    emp_name
    check_out
    attendance_date
    status
    total_hours
  }
}`
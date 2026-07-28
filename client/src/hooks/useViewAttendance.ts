import { useQuery } from "@tanstack/react-query";
import { apolloClient } from "../graphql/apolloClient";
import { FETCH_ATT_LOG_QUERY } from "../graphql/queries/fetchAttendanceLog";
import type { AttendanceFilter} from "@hr-app/shared";


export default function useViewAttendance(filter:AttendanceFilter){
  return useQuery({
    queryKey:["attendance"],
    queryFn:async()=> {
     const{data,error} = await apolloClient.query({
      query:FETCH_ATT_LOG_QUERY,
      variables:filter,
      fetchPolicy:'network-only'
    })
    if(error)
      throw new Error(error.message)

    return data?.attendanceLog
  }
  })
  
}

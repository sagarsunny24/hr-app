import { useQueryClient } from "@tanstack/react-query";
import type {  ViewAllFilter } from "@hr-app/shared";
import { apolloClient } from "../graphql/apolloClient";
import { FETCH_MNGR_QUERY } from "../graphql/queries/fetchManagerQuery";


export default function useManagerDetails(){
  const queryClient = useQueryClient();
  const fetchManagers = (filter:ViewAllFilter)=>queryClient.fetchQuery({
    queryKey:["manager-list",filter],
    queryFn:async()=>{
      const {data,error} = await apolloClient.query({
        query:FETCH_MNGR_QUERY,
        variables: filter
      })
      if(error){
        throw new Error(error.message)
      }
      return data?.viewAll
    }
  });
  return {fetchManagers}
}
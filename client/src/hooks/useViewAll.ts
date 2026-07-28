import { useQuery } from '@tanstack/react-query';
import { VIEWALL_QUERY } from '../graphql/queries/viewEmployees';
import { apolloClient } from '../graphql/apolloClient';
import {  type ViewAllFilter} from '@hr-app/shared';


export default function useViewAll(filter:ViewAllFilter){
  return useQuery({
    queryKey:["viewAll",filter],
    queryFn:async()=>{
      const {data,error}= await apolloClient.query({
        query:VIEWALL_QUERY,
        variables:filter,
        fetchPolicy:'network-only'
      })
      if (error) {
        throw new Error(error.message);
      }
      return data?.viewAll
    }
  })
}
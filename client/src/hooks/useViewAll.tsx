import { useQuery } from '@tanstack/react-query';
import { VIEWALL_QUERY } from '../graphql/queries/viewEmployees';
import { apolloClient } from '../graphql/apolloClient';
import { type ViewAllResponse, type ViewAllFilter } from '@hr-app/shared';


export function useViewAll(filter:ViewAllFilter){
  return useQuery({
    queryKey:["viewAll",filter],
    queryFn:async()=>{
      const {data,errors}= await apolloClient.query<ViewAllResponse,ViewAllFilter>({
        query:VIEWALL_QUERY,
        variables:filter,
      })
      if (errors?.length) {
        throw new Error(errors[0].message);
      }
      return data?.viewAll
    }
  })
}

import { apolloClient } from "../graphql/apolloClient";
import { WEB_CLOCK_MUTATION } from "../graphql/mutations/webClockIn";
import { useQueryClient ,useMutation } from "@tanstack/react-query";
import type {  ClockInResponse } from "@hr-app/shared";

export  function useWebClockIn() {
  const queryClient = useQueryClient()
  const {mutateAsync:webClockIn} = useMutation<ClockInResponse,Error,{timestamp:string}>({
    mutationFn: async(timestamp)=>{
      const {data} = await apolloClient.mutate({
        mutation:WEB_CLOCK_MUTATION,
        variables:timestamp,
        fetchPolicy:'network-only'
      });
      if(!data) {
        throw new Error("No response from server")
      }
      return data
    },
    onSuccess:()=>{queryClient.invalidateQueries({
      queryKey:["attendance"]
    })}
  })
  return webClockIn;
}
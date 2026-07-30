
import { apolloClient } from "../graphql/apolloClient";
import { EDITEMP_MUTATION } from "../graphql/mutations/editEmpMutation";
import { useQueryClient ,useMutation } from "@tanstack/react-query";
import type { EditEmpRes,EditEmpVars } from "@hr-app/shared";

export default function useEditEmployee() {
  const queryClient = useQueryClient()
  const {mutateAsync:editEmployee} = useMutation<EditEmpRes,Error,EditEmpVars>({
    mutationFn: async(input)=>{
      const {data} = await apolloClient.mutate({
        mutation:EDITEMP_MUTATION,
        variables:input,
        fetchPolicy:'network-only'
      });
      if(!data) {
        throw new Error("No response from server")
      }
      return data 
    },
    onSuccess:()=>{queryClient.invalidateQueries({
      queryKey:["viewAll"]
    })}
  })
  return editEmployee;
  
}
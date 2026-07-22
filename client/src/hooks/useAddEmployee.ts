
import { apolloClient } from "../graphql/apolloClient";
import { ADDEMP_MUTATION } from "../graphql/mutations/addEmpMutation";
import { useQueryClient ,useMutation } from "@tanstack/react-query";
import type { EmployeeDetails } from "@hr-app/shared";

export default function useAddEmployee() {
  const queryClient = useQueryClient()
  const {mutateAsync:addNewEmployee} = useMutation<{message:string},Error,{input:EmployeeDetails}>({
    mutationFn: async(input)=>{
      const {data} = await apolloClient.mutate({
        mutation:ADDEMP_MUTATION,
        variables:input
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
  return addNewEmployee;
  
}
import { apolloClient } from "../graphql/apolloClient";

import { DELETE_EMP_MUTATION } from "../graphql/mutations/deleteEmpMutation";

import { useQueryClient ,useMutation } from "@tanstack/react-query";


export default function useDeleteEmp(){
  const queryClient = useQueryClient()
  const {mutateAsync:deleteEmployee} = useMutation({
    mutationFn: async(emp_id:string)=>{
      const {data} = await apolloClient.mutate({
        mutation:DELETE_EMP_MUTATION,
        variables:{empId:emp_id},
        fetchPolicy:'network-only'
      })
      if(!data){
        throw new Error("No response from server")
      }
      return data
    },
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:["viewAll"]})}
  })
  return deleteEmployee
}
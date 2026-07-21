
import { VIEWALL_QUERY } from "../../graphql/queries/viewEmployees";

export default function EmployeeForm() {

  function handleSubmit(e:){
    e.preventDefault();
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

  }
  return (
    
  )
}

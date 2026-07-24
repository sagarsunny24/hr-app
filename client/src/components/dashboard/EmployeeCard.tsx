import { Avatar } from "@mui/material"
import useViewAll from "../../hooks/useViewAll"

export default function EmployeeCard() {
  const {data:employees}= useViewAll({filter:{}}) 
  if(employees?.length!==0)return (
    <>
   {employees?.map((emp)=> <Avatar alt={emp.emp_name} src={emp.profile_image_path}/>)}
   </>
  )
}

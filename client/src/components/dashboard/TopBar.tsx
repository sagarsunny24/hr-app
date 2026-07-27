import { Button,Typography,Box,Stack, Dialog } from "@mui/material"
import { useAppDispatch } from "../../store/hooks"
import { openForm } from "../../store/slices/formSlice"
import EmployeeForm from "./EmployeeForm"
import { hasPermission } from "../../permissions/auth"
import { useAppSelector } from "../../store/hooks"
export default function TopBar() {

  const user = useAppSelector((state)=>state.auth.user)
  const isOpen = useAppSelector((state)=>state.form.isOpen)
  
  const dispatch = useAppDispatch()
    function handleOpen(){
      dispatch(openForm(true))
    }
  return (
   <Box sx={{flexGrow:1,display:'flex',justifyContent:'space-between',paddingBottom:5}}>
    <Box>
    <Stack><Typography>1206 Employees</Typography></Stack>
    <Stack direction={"row"}><Typography>Dashboard</Typography><Typography>Employee</Typography></Stack>
    </Box>
    <Box>
      {hasPermission(user,"create:employee") &&<Button variant="contained" onClick={handleOpen}> + Add Employee</Button>}
    
   <Dialog open={isOpen}><EmployeeForm /></Dialog>
    </Box>
   </Box>
  )
}

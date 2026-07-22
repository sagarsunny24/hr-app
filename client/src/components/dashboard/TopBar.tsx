import { Button,Typography,Box,Stack, Dialog } from "@mui/material"
import { useAppDispatch } from "../../store/hooks"
import { openForm } from "../../store/slices/formSlice"
import EmployeeForm from "./EmployeeForm"
import { useAppSelector } from "../../store/hooks"
export default function TopBar() {
  const isOpen = useAppSelector((state)=>state.form.isOpen)
    const dispatch = useAppDispatch()
    function handleOpen(){
      dispatch(openForm(true))
    }
  
  return (
   <Box>
    <Box>
    <Stack><Typography>1206</Typography><Typography>Employees</Typography></Stack>
    <Stack><Typography>Dashboard</Typography><Typography>Employee</Typography></Stack>
    </Box>
    <Box>
    <Button variant="contained" onClick={handleOpen}> + Add Employee</Button>
   <Dialog open={isOpen}><EmployeeForm /></Dialog>
    </Box>
   </Box>
  )
}

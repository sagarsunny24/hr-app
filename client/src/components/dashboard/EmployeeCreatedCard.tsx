import { Dialog,Typography ,Button} from "@mui/material"
import { useAppDispatch,useAppSelector } from "../../store/hooks"
import { empCredentials } from "../../store/slices/formSlice"
export default function EmployeeCreatedCard() {
  const isOpen = useAppSelector((state)=>state.form.empCreated)
  const emp_email= useAppSelector((state)=>state.form.emp_email)
  const emp_password = useAppSelector((state)=>state.form.emp_password)
  const dispatch = useAppDispatch()
  function handleClose(){
    dispatch(empCredentials(false))
  }
  return (
    <Dialog open={isOpen}>
      <Button onClick={handleClose}>Close This</Button>
      <Typography>Email: {emp_email}</Typography>
      <Typography>Password: {emp_password}</Typography>
    </Dialog>
  )
}

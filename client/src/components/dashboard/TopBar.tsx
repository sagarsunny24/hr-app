import { Button,Typography,Box,Stack } from "@mui/material"
export default function TopBar() {

  
  return (
   <Box>
    <Box>
    <Stack><Typography>1206</Typography><Typography>Employees</Typography></Stack>
    <Stack><Typography>Dashboard</Typography><Typography>Employee</Typography></Stack>
    </Box>
    <Box>
    <Button variant="contained"> + Add Employee</Button>
    </Box>
   </Box>
  )
}

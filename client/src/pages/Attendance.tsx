import AttendanceTable from "../components/attendance/AttendanceTable";

import {Button, Paper } from "@mui/material";
import useViewAttendance from "../hooks/useViewAttendance";

import {useTheme} from "@mui/material";
import {useWebClockIn} from "../hooks/useWebClockIn";

export default function Attendance() {
  const today = new Date().toLocaleDateString("en-CA")
const webClockIn = useWebClockIn()
  const {data} = useViewAttendance({filter:{}})

  const todayAttendance = data?.find((item)=>item.attendance_date === today)
  const theme = useTheme()
  async function handleClockIn(){
    const timestamp = new Date().toISOString()
    await webClockIn({timestamp})
  }
  const buttonText = !todayAttendance ? 'Web Clock In' :todayAttendance.check_out ? 'Completed' :'Web Clock Out';
  return (
    <Paper elevation={0} sx={{
      border:'1px solid',
      borderColor:theme.palette.background.paper,
      px:2,
      py:1,
    }}>
      <Button color={
        todayAttendance?.check_in && !todayAttendance?.check_out ? 'error' : 'primary'
      }  variant="contained" disabled={!!todayAttendance?.check_out} onClick={handleClockIn}>{buttonText}</Button>
      {data && <AttendanceTable data={data} /> }
     
    </Paper>
  )
}

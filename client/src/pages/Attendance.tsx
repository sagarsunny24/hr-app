import AttendanceTable from "../components/attendance/AttendanceTable";

import {Button, Paper } from "@mui/material";
import useViewAttendance from "../hooks/useViewAttendance";

import {useTheme} from "@mui/material";
import {useWebClockIn} from "../hooks/useWebClockIn";

export default function Attendance() {
  const today = new Date().toISOString().split("T")[0]
const webClockIn = useWebClockIn()
  const {data} = useViewAttendance({filter:{}})

  const todayAttendance = data?.find((item)=>item.attendance_date === today)
  const theme = useTheme()
  async function handleClockIn(){
    const timestamp = new Date().toISOString()
    await webClockIn({timestamp})
  }
  return (
    <Paper elevation={0} sx={{
      border:'1px solid',
      borderColor:theme.palette.background.paper,
      px:2,
      py:1,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between'
    }}>
      <Button variant="contained" onClick={handleClockIn}>{todayAttendance?.check_out? 'Web Clock Out':'Web Clock In'}</Button>
      {data && <AttendanceTable data={data} /> }
     
    </Paper>
  )
}

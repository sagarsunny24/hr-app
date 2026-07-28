import AttendanceTable from "../components/attendance/AttendanceTable";

import { Button, Paper } from "@mui/material";
import useViewAttendance from "../hooks/useViewAttendance";

import { useTheme } from "@mui/material";
import { useWebClockIn } from "../hooks/useWebClockIn";

export default function Attendance() {
  const webClockIn = useWebClockIn();
  const { data } = useViewAttendance({ filter: {} });
  const today = new Date().toLocaleDateString("en-CA");
  const todayAttendance = data?.find((item) => item.attendance_date === today);
  const theme = useTheme();
  async function handleClockIn() {
    const timestamp = new Date().toISOString();
    await webClockIn({ timestamp });
  }
  const isCheckedIn =
  !!todayAttendance?.check_in && !todayAttendance?.check_out;

const isCompleted =
  !!todayAttendance?.check_out;
  const buttonText = !todayAttendance
    ? "Web Clock In"
    : todayAttendance.check_out
      ? "Completed"
      : "Web Clock Out";
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: theme.palette.background.paper,
        px: 2,
        py: 1,
      }}
    >
      <Button
        color={isCheckedIn ? "error" : "primary"}
  variant="contained"
  disabled={isCompleted}
  onClick={handleClockIn}
      >
        {buttonText}
      </Button>
      {data && <AttendanceTable data={data} />}
    </Paper>
  );
}

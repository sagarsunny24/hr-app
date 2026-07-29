import AttendanceTable from "../components/attendance/AttendanceTable";
import useMonthlySummary from "../hooks/useMonthlySummary";
import { PieChart } from '@mui/x-charts/PieChart';
import {
  Box,
  Button,
  Grid,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import useViewAttendance from "../hooks/useViewAttendance";
import { BarChart } from '@mui/x-charts/BarChart';
import { useWebClockIn } from "../hooks/useWebClockIn";

export default function Attendance() {
  const webClockIn = useWebClockIn();

  const { data } = useViewAttendance({
    filter: {},
  });
 
const summary = useMonthlySummary(data)
console.log(summary)
  const today = new Date().toLocaleDateString("en-CA");

  const todayAttendance = data?.find(
    (item) => item.attendance_date === today
  );

const isCheckedIn = todayAttendance?.check_in && !todayAttendance?.check_out;
const isCompleted = todayAttendance?.check_out;

  async function handleClockIn() {
    const timestamp = new Date().toISOString();
    await webClockIn({ timestamp });
  }

  const buttonText = !todayAttendance
    ? "Web Clock In"
    : todayAttendance.check_out
      ? "Completed"
      : "Web Clock Out";

  const checkInTime = todayAttendance?.check_in
    ? new Date(Number(todayAttendance.check_in)).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "--";

  const checkOutTime = todayAttendance?.check_out
    ? new Date(Number(todayAttendance.check_out)).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "--";
const latest = summary?.[summary.length - 1];

const pieData = [
  { id: 0, value: latest?.present ?? 0, label: "Present" },
  { id: 1, value: latest?.absent ?? 0, label: "Absent" },
  { id: 2, value: latest?.late ?? 0, label: "Late" },
  { id: 3, value: latest?.half_day ?? 0, label: "Half Day" },
];
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
          p: 3,
          mb: 3,
        }}
      >
        <Stack
        direction="row"
        sx={{
          pacing:3,
          
          justifyContent:"space-between",
          alignItems:"flex-start",
           md: "center" }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              Attendance
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                mt: 0.5,
              }}
            >
              Track your daily attendance and working hours
            </Typography>
          </Box>

          <Button
            variant="contained"
            color={isCheckedIn ? "error" : "primary"}
            disabled={Boolean(isCompleted)}
            onClick={handleClockIn}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 2,
            }}
          >
            {buttonText}
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3,1fr)",
            },
            gap: 2,
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 13,
              }}
            >
              Check In
            </Typography>

            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 700,
                mt: 1,
              }}
            >
              {checkInTime}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 13,
              }}
            >
              Check Out
            </Typography>

            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 700,
                mt: 1,
              }}
            >
              {checkOutTime}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 13,
              }}
            >
              Today's Status
            </Typography>

            <Box sx={{mt:1}}>
              <Chip
                label={todayAttendance?.status ?? "Not Checked In"}
                color={
                  todayAttendance?.status === "present"
                    ? "success"
                    : todayAttendance?.status === "late"
                      ? "warning"
                      : todayAttendance?.status === "half_day"
                        ? "info"
                        : "default"
                }
                sx={{
                  fontWeight: 600,
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Paper>
       <Typography
        sx={{
          fontSize: 14,
          fontWeight: 700,
          lineHeight: 1.2,
          mb:2
        }}
      >
        Attendance Log
      </Typography>
      <Divider />   
         <Paper
        elevation={0}
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
          p: 3,
          mb: 3,
        }}
      >
      <Typography> Previous Month Attendance details</Typography> 
       <Grid container spacing={3}>
         <Grid>
                <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PieChart
          series={[
            {
              data: pieData,
              innerRadius: 50,
              outerRadius: 100,
            },
          ]}
          width={300}
          height={300}
        />
</Box>
         </Grid>
         <Grid>
                <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
         <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: summary?.map(item => item.month.slice(5)) ?? [],
          },
        ]}
        series={[
          {
            data: summary?.map(item => item.present) ?? [],
            label: "Present",
          },
          {
            data: summary?.map(item => item.absent) ?? [],
            label: "Absent",
          },
          {
            data: summary?.map(item => item.late) ?? [],
            label: "Late",
          },
        ]}
        height={300}
      />

      </Box>
</Grid>
       </Grid>

   
     
</Paper>   
      {data && <AttendanceTable data={data} />}
    </Box>
  );
}
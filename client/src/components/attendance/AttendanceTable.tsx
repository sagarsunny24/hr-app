import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';

import type { AttendanceLog } from '@hr-app/shared';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
interface AttTableProps {
  data:AttendanceLog[]
}



export default function AttendanceTable({data}:AttTableProps) {
  return (
    <TableContainer component={Paper} sx={{maxWidth:1000}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Check-in Time</StyledTableCell>
            <StyledTableCell align="right">Check-out Time</StyledTableCell>
            <StyledTableCell align="right">Total Hours</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.attendance_id}>
              <StyledTableCell component="th" scope="row">
                {row.attendance_date}
              </StyledTableCell>
              
  <StyledTableCell align="right">
   {new Date(Number(row.check_in)).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}

</StyledTableCell>
              <StyledTableCell align="right">{new Date(Number(row.check_out)).toLocaleTimeString("en-US",{
                hour:"2-digit",minute:"2-digit",hour12:true,
              })}</StyledTableCell>
              <StyledTableCell align="right">
  {Math.floor(row.total_hours)}h{" "}
  {Math.round((row.total_hours - Math.floor(row.total_hours)) * 60)}m
</StyledTableCell>
              <StyledTableCell align="right"> <Chip
                label={row?.status ?? "Not Checked In"}
                color={
                  row?.status === "present"
                    ? "success"
                    : row?.status === "late"
                      ? "warning"
                      : row?.status === "half_day"
                        ? "info"
                        : "default"
                }
                sx={{
                  fontWeight: 600,
                }}
              /></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
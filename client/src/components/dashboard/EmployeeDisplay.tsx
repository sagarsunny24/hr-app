
import useViewAll from "../../hooks/useViewAll";
import { useAppSelector,useAppDispatch } from "../../store/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import PaginationBar from "../../components/dashboard/PaginationBar";
import EmployeeCard from "../../components/dashboard/EmployeeCard";
import { countEmps } from "../../store/slices/dashboardSlice";

import { Box } from "@mui/material";
export default function EmployeeDisplay() {
  const query = useAppSelector((state) => state.dashboard.searchQuery);
  const page = useAppSelector((state) => state.dashboard.page);
  const dispatch = useAppDispatch()
  const { data, isLoading} = useViewAll({
    filter: {
      offset: (page - 1) * 8,
      limit: 8,
      emp_name: query,
    },
  });
  const employees = data?.data;
  console.log(employees);
  dispatch(countEmps(employees?.length))
  const count = data?.totalPages ?? 5;
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress color="inherit" aria-label="Loading…" />
      </Box>
    );
  }
  return (
    <>
     <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          overflow: "auto",
          gap: 5,
          mt: 5,
        }}
      >
         {employees?.map((employee) => (
          <EmployeeCard key={employee.emp_id} employee={employee} />
        ))}
       
      </Box>
        <Box sx={{mt:5}}>
<PaginationBar count={count} />
        </Box>
         
         </>
  )
}

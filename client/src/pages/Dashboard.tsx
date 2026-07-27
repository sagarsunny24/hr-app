// import React from 'react'
import useViewAll  from "../hooks/useViewAll"
import TopBar from "../components/dashboard/TopBar"
import { Box } from "@mui/material"
import EmployeeCard from "../components/dashboard/EmployeeCard"
import MiddleBar from "../components/dashboard/MiddleBar"
import PaginationBar from "../components/dashboard/PaginationBar"
import { useAppSelector } from "../store/hooks"
export default function Dashboard() {
  const query = useAppSelector((state)=>state.dashboard.searchQuery)
  const page = useAppSelector((state)=>state.dashboard.page)
  const {data:employees} = useViewAll({filter:{offset:(page - 1) * 8,limit:8,emp_name:query}}) 
  console.log(employees)
  const count = employees? Math.floor(employees?.length / 8) : 5
  return (
    <Box> 
      <TopBar />
      <MiddleBar />
      <Box sx={{display:'flex', flexWrap:'wrap',overflow:'auto',gap:5,mt:5}}>
{employees?.map((employee)=><EmployeeCard key={employee.emp_email} employee={employee} />)}
      
      </Box>
      
      {/* {employees} */}
      <PaginationBar count={count} />
    </Box>
  )
}

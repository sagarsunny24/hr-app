// import React from 'react'
import useViewAll  from "../hooks/useViewAll"
import TopBar from "../components/dashboard/TopBar"
import { Box } from "@mui/material"
import EmployeeCard from "../components/dashboard/EmployeeCard"
export default function Dashboard() {
  const {data:employees} = useViewAll({filter:{}}) 
  console.log(employees)
  return (
    <Box> 
      <TopBar />
      <EmployeeCard />
      {/* {employees} */}
    </Box>
  )
}

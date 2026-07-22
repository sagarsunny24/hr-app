// import React from 'react'
import useViewAll  from "../hooks/useViewAll"
import TopBar from "../components/dashboard/TopBar"
import { Box } from "@mui/material"
export default function Dashboard() {
  const {data:employees} = useViewAll({filter:{}}) 
  console.log(employees)
  return (
    <Box> 
      <TopBar />
      {/* {employees} */}
    </Box>
  )
}

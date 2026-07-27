// import React from 'react'

import TopBar from "../components/dashboard/TopBar";
import { Box } from "@mui/material";
import EmployeeDisplay from "../components/dashboard/EmployeeDisplay";
import MiddleBar from "../components/dashboard/MiddleBar";


export default function Dashboard() {
  
  return (
    <Box>
      <TopBar />
      <MiddleBar />
     <EmployeeDisplay />
    </Box>
  );
}

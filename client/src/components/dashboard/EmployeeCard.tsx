import { Avatar, useTheme, Paper,Divider, Stack, Chip,IconButton, Box, Typography,Menu,MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import type { EmployeeDetails } from "@hr-app/shared";
import { green, red, yellow } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import CallOutlined from "@mui/icons-material/CallOutlined";
import useDeleteEmp from "../../hooks/useDeleteEmp";
import { useState } from "react";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
interface CardProps {
  employee: Omit<EmployeeDetails,"emp_address"|"emp_manager_id">;
}
export default function EmployeeCard({ employee }: CardProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const deleteEmployee = useDeleteEmp();
    const open = Boolean(anchorEl)
  const theme = useTheme();
  const statusClr =
    employee.emp_status === "active"
      ? green
      : employee.emp_status === "probation"
        ? yellow
        : red;
 const handleClose = () => {
    setAnchorEl(null);
  };
 const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null: event.currentTarget );
  };
  const handleDelete = async()=>{
    await deleteEmployee(employee.emp_id)
    setAnchorEl(null)
  }
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: theme.palette.primary.light,
        px: 2,
        py: 1,
       borderRadius:4,
       width:320,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
      }}
    >
   
     
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Chip
          label={employee.emp_status}
          sx={{
            bgcolor: statusClr[100],
            color: statusClr[700],
            fontWeight: 600,
            px: 1,
          }}
        />
         <IconButton onClick={handleClick}>
           <Menu
  sx={{
    "& .MuiPaper-root": {
      borderRadius: 2,
      minWidth: 120,
    },
  }}
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
>
  <MenuItem onClick={handleClose} disableRipple>
    <EditIcon sx={{ mr: 1 }} />
    Edit
  </MenuItem>

  <MenuItem
    onClick={handleDelete}
    disableRipple
  >
    <DeleteForeverIcon
      sx={{
        mr: 1,
        color: "error.main",
      }}
    />
    Delete
  </MenuItem>
</Menu>
          <MoreHorizIcon />
        </IconButton>
      </Stack>

      <Stack spacing={2} sx={{alignItems:'center', mt:2}}>
        <Avatar src={`${employee.profile_image_path}`} alt={employee.emp_name}  sx={{ width: 130,
            height: 130,
            borderRadius: 4,}}/>

            <Box sx={{textAlign:'center'}}>
              <Typography sx={{fontWeight:700,fontSize:24}}>{employee.emp_name}</Typography>

          <Typography
          sx={{
             color:"primary",
            fontWeight:500,
            fontSize:14
          }}
            
          >{employee.emp_designation}</Typography>
            </Box>
             <Box
        sx={{
        width:300,
      
          p: 2,
          borderRadius: 4,
          bgcolor: theme.palette.background.default,
        }}
      >
       
        <Stack  sx={{justifyContent:'space-between'}}
          direction="row"
         
        >
          <Box>
            <Typography color="primary">
              Department
            </Typography>

            <Typography color="primary" sx={{fontWeight:700,
              fontSize:14}}
              
            >
              {employee.emp_dept}
            </Typography>
          </Box>

          <Box>
            <Typography color="primary">
              Hired Date
            </Typography>

            <Typography
            color="primary"
              sx={{fontWeight:700,
              fontSize:14}}
            >
              {employee.emp_joining_date}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

      
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} sx={{alignItems:"center"}}>
            <EmailOutlined color="primary" />
            <Typography color="primary" sx={{fontSize:14}} >
              {employee.emp_email}
            </Typography>
          </Stack>

           <Stack direction="row" spacing={2} sx={{alignItems:"center"}}>
            <CallOutlined color="primary" />
           <Typography color = "primary"  sx={{fontSize:14}} >
            {employee.emp_phone}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      </Stack>
    </Paper>
  );
}

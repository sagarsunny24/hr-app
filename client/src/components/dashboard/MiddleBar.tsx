import { Stack, Divider,Paper,Tabs,Tab,  IconButton, TextField, } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import { useAppSelector,useAppDispatch } from "../../store/hooks";
import { changeView,changeTab,searchQ,changePage } from "../../store/slices/dashboardSlice";
import { useEffect, useState } from "react";
export default function MiddleBar() {
  const [search,setSearch] = useState<string>("")
  const tab = useAppSelector((state)=>state.dashboard.currentTab)
  const view = useAppSelector((state)=>state.dashboard.viewType)
  const dispatch = useAppDispatch()

  const theme = useTheme();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.target.value)
    // dispatch(searchQ(e.target.value))
  }
  useEffect(()=>{
    const timer = setTimeout(()=>{
      dispatch(searchQ(search))
    dispatch(changePage(1));},1000)
    return ()=>clearTimeout(timer);
  },[search,dispatch])
  console.log(theme)
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
      <Tabs value={tab}
      onChange={(_e,value)=>dispatch(changeTab(value))}
      textColor="primary"
      indicatorColor="primary"
      >
        <Tab label="Employees" />
        <Tab label="Leave Request" />

      </Tabs>
<Stack direction="row" spacing={2}>
        <IconButton  color={view === "card" ? "primary" : "default"}
        onClick={()=>dispatch(changeView('card'))}>
          <GridViewOutlinedIcon />
        </IconButton>

        <IconButton  color={view === "list" ? "primary" : "default"} onClick={()=>dispatch(changeView('list'))}>
          <ViewListOutlinedIcon  />
        </IconButton>

        <Divider orientation="vertical" flexItem />
        <TextField size="small" value={search}
        onChange={handleSearch}
        placeholder="Search Employee"  sx={{ width: 280 }} />
        </Stack>
    </Paper>
    // <Box sx={{bgcolor:'theme.primary.background.paper',width:100}}>
    //   <Typography>Hi</Typography> </Box>
  )
}

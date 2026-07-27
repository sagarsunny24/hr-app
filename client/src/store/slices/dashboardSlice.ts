import { createSlice } from "@reduxjs/toolkit";

interface DashboardProps {
  viewType:'card' | 'list',
  searchQuery:string,
  currentTab: 0 | 1
}

const initialState:DashboardProps = {
  viewType:'card',
  searchQuery:'',
  currentTab:0,
}

const dashboardSlice= createSlice({
  name:'dashboard',
  initialState,
  reducers:{
    changeView(state,action){
      state.viewType=action.payload;
    },
    searchQ(state,action){
      state.searchQuery=action.payload
    },
    changeTab(state,action){
      state.currentTab=action.payload
    }
  }
})

export const  {changeView,searchQ,changeTab} = dashboardSlice.actions;
export default dashboardSlice.reducer;
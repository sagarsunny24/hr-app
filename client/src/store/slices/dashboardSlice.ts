import { createSlice } from "@reduxjs/toolkit";

interface DashboardProps {
  viewType:'card' | 'list',
  searchQuery:string,
  currentTab: 0 | 1,
  page:number,
  totalEmps:number
}

const initialState:DashboardProps = {
  viewType:'card',
  searchQuery:'',
  currentTab:0,
  page:1,
  totalEmps:0
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
    },
    changePage(state,action){
      state.page =action.payload
    },
    countEmps(state,action){
      state.totalEmps =action.payload
    }
  }
})

export const  {changeView,searchQ,changeTab,changePage,countEmps} = dashboardSlice.actions;
export default dashboardSlice.reducer;
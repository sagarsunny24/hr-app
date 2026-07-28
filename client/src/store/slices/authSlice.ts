import  {EmpRole, type ErrorResponse} from '@hr-app/shared'
import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from '../thunks/loginThunk';
import type{ AuthInitialState } from '@hr-app/shared';

const initialState:AuthInitialState = {
  status:'idle',
  user:{
accessToken:null,
  role:EmpRole.EMPLOYEE,
  isAuthenticated:false,
  profile_image_path:null,
  },
  error:null 
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    logout(state){
      state.user.accessToken = '';
      state.user.role =EmpRole.EMPLOYEE;
      state.user.profile_image_path =null
    },
    refreshUser(state,action){
      state.status='succeeded';
      state.user = action.payload
    }
  },
  extraReducers:(builder)=>{
    builder.
    addCase(loginThunk.pending,(state)=>{
      state.status='loading'
      state.error=null
    })
    .addCase(loginThunk.fulfilled,(state,action)=>{
      state.user =action.payload
      state.status = 'succeeded'
    })
    .addCase(loginThunk.rejected,(state,action)=>{
      state.error= action.payload as ErrorResponse ?? null
    })
  }
})
export const {logout,refreshUser} = authSlice.actions
export default authSlice.reducer
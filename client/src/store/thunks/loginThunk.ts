import type { LoginResponse } from "@hr-app/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginThunk = createAsyncThunk(
  'auth/login',
  async(loginResponse:LoginResponse,{rejectWithValue}) => {
    try{
      const {accessToken,role} = loginResponse;
      const user = {
        accessToken,
        role,
        isAuthenticated:true
      } 
      return user;
    }catch(err){
      
      return rejectWithValue({
         message: err instanceof Error ? err.message : "Login failed",
         }
      )

    }
  }
)
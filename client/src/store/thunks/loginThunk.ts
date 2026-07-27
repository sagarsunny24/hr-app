import type { LoginResponse } from "@hr-app/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginThunk = createAsyncThunk(
  'auth/login',
  async(loginResponse:LoginResponse,{rejectWithValue}) => {
    try{
      const {accessToken,role,profile_image_path} = loginResponse;
      const user = {
        accessToken,
        role,
        isAuthenticated:true,
        profile_image_path
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
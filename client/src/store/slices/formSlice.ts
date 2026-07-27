
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen:false,
  empCreated:false,
  emp_email:'',
  emp_password:''
}
const formSlice = createSlice({
  name:"form",
  initialState,
  reducers:{
    openForm(state,action){state.isOpen=action.payload},
    empCredentials(state,action){state.empCreated= action.payload},
    storeInfo(state,action){
      const {email,pswrd} = action.payload
      state.emp_email = email;
      state.emp_password =pswrd;
      console.log(state)
    }
    
  }
})
export const {openForm,empCredentials,storeInfo} = formSlice.actions

export default formSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen:false,
}
const formSlice = createSlice({
  name:"form",
  initialState,
  reducers:{
    openForm(state,action){state.isOpen=action.payload},
    
  }
})
export const {openForm} = formSlice.actions

export default formSlice.reducer;
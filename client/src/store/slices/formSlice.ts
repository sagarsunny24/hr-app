import type { EmployeeDetails } from "@hr-app/shared";
import { createSlice } from "@reduxjs/toolkit";

type FormState = {
  isOpen: boolean;
  mode: "add" | "edit";
  empCreated: boolean;
  emp_email: string;
  emp_password: string;
  employee: EmployeeDetails | null;
};
const initialState: FormState = {
  isOpen: false,
  mode: "add",
  empCreated: false,
  emp_email: "",
  emp_password: "",
  employee: null,
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    openForm(state, action) {
    const {mode,employee,isOpen} = action.payload
    state.isOpen = isOpen
    state.mode = mode
    state.employee = employee
    },
    empCredentials(state, action) {
      state.empCreated = action.payload;
    },
    storeInfo(state, action) {
      const { email, pswrd } = action.payload;
      state.emp_email = email;
      state.emp_password = pswrd;
      console.log(state);
    },
  },
});
export const { openForm, empCredentials, storeInfo } = formSlice.actions;

export default formSlice.reducer;

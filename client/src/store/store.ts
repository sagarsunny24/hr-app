import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import formReducer from './slices/formSlice'
import ddReducer from './slices/dashboardSlice'
const store = configureStore({
  reducer: { auth: authReducer, theme: themeReducer,form:formReducer,dashboard:ddReducer },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;

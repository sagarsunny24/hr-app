import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'
const store = configureStore({
  reducer:{auth:authReducer,theme:themeReducer
  },

})



export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
export default store;
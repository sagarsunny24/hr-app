import { darkTheme,lightTheme } from "./theme/theme"
import { ThemeProvider } from "@mui/material"

// import LoginPage from "./pages/LoginPage"
import { RouterProvider } from "react-router"
import router from "./router"
import { useEffect} from "react"
import { useAppSelector } from "./store/hooks"
import {ToastContainer} from 'react-toastify'
export default function App() {
  const mode = useAppSelector((state) => state.theme.theme)
  const theme = mode === 'light'? lightTheme : darkTheme
  useEffect(()=>{
    localStorage.setItem("theme",mode)
  },[mode])
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <RouterProvider router={router}/>
    </ThemeProvider>
  
  )
}

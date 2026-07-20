import { darkTheme,lightTheme } from "./theme/theme"
import { ThemeProvider } from "@mui/material"

// import LoginPage from "./pages/LoginPage"
import { RouterProvider } from "react-router"
import router from "./router"
import { useEffect, useState } from "react"
import {ToastContainer} from 'react-toastify'
export default function App() {
  const [mode, setMode] = useState<"light" | "dark">(() => {
  return localStorage.getItem("theme") === "dark" ? "dark" : "light";
});

useEffect(() => {
  localStorage.setItem("theme", mode);
}, [mode]);

const theme = mode === "light" ? lightTheme : darkTheme;

function toggleTheme() {
  setMode((prev) => (prev === "light" ? "dark" : "light"));
}

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <RouterProvider router={router}/>
    </ThemeProvider>
  
  )
}

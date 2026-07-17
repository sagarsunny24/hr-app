import { darkTheme,lightTheme } from "./theme/theme"
import { ThemeProvider, type Theme } from "@mui/material"

import LoginPage from "./pages/LoginPage"
import { useEffect, useState } from "react"

export default function App() {
  const [windowTheme, setWindowTheme] = useState(()=>{
    const savedTheme = localStorage.getItem('theme')
    return savedTheme? JSON.parse(savedTheme) : lightTheme
  })
  useEffect(()=>{
    localStorage.setItem('theme',JSON.stringify(windowTheme))
  },[windowTheme])

  function toggleTheme (){
   setWindowTheme((prev:Theme) => {
    return prev === lightTheme ? darkTheme : lightTheme;
  });
  }
  return (
    <ThemeProvider theme={windowTheme}>
  <LoginPage />
    </ThemeProvider>
  
  )
}

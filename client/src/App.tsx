import { darkTheme,lightTheme } from "./theme/theme"
import { ThemeProvider } from "@mui/material"

import LoginPage from "./pages/LoginPage"

export default function App() {

  return (
    <ThemeProvider theme={lightTheme}>
  <LoginPage />
    </ThemeProvider>
  
  )
}

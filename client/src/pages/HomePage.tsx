import { Button } from "@mui/material"
import { useNavigate } from "react-router"


const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div><Button variant="contained" onClick={()=>navigate('auth/login')}>Go to Login</Button></div>
  )
}
export default HomePage;
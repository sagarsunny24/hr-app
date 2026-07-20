import { Button } from "@mui/material"
import { useNavigate } from "react-router"


const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div><Button variant="outlined" onClick={()=>navigate('auth/login')}></Button></div>
  )
}
export default HomePage;
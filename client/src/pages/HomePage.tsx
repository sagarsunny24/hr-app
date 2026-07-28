import { Button } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router"


const HomePage = () => {
  useEffect(()=>{
    
  })
  const navigate = useNavigate()
  return (
    <div><Button variant="contained" onClick={()=>navigate('auth/login')}>Go to Login</Button></div>
  )
}
export default HomePage;
// import { useAppSelector } from "../store/hooks"
import { Outlet } from "react-router"
// import { useNavigate } from "react-router"
import SideBar from "./SideBar"
export default function AuthLayout() {
  // const navigate = useNavigate()
  // const user = useAppSelector((state)=> state.auth.user)

  // if(user.isAuthenticated){
return (
  <SideBar>
    <Outlet />
    </SideBar>
  )
  // }
  // else{
  // navigate(-1);
  // }
  
}

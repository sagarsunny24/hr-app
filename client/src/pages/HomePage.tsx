import { Button ,Box,Card,Typography} from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import MyLogo from "../assets/HR-logo.webp";
import { useAppDispatch } from "../store/hooks";
import { apolloClient } from "../graphql/apolloClient";
import { refreshUser } from "../store/slices/authSlice";
import { REFRESH_QUERY } from "../graphql/queries/refreshQuery";
const HomePage = () => {
  const dispatch = useAppDispatch()
 useEffect(() => {
  async function refreshToken() {
    try {
      const response = await apolloClient.query({
        query: REFRESH_QUERY,
      });

      console.log(response.data);

      dispatch(refreshUser(response.data));
    } catch (error) {
      console.error("Refresh failed:", error);
    }
  }

  refreshToken();
}, [dispatch]);
  const navigate = useNavigate()
  return (
<Box sx={{display:'flex',alignItems:'center',justifyContent:'center',mt:'25%',bgcolor:''}}>
    <Card
        elevation={0}
        sx={{
          width: 450,
          borderRadius: 4,
          p: 4,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          boxShadow:'0px 2px 6px '
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            component="img"
            src={MyLogo}
            alt="Company Logo"
            sx={{
              width: 120,
              objectFit: "contain",
            }}
          />
           <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
            >
              Welcome to Humanly
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "text.secondary",
                fontSize: 15,
              }}
            >
              An HR Management System
            </Typography>
          </Box>
          <Button variant="contained" onClick={()=>navigate('auth/login')}>Go to Login</Button>
</Box>
</Card>
</Box>
  )
}
export default HomePage;
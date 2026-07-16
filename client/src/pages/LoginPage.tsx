import { Card, Box, Typography, TextField ,Button} from "@mui/material";
import auth from "../assets/auth.webp";
import MyLogo from "../assets/HR-logo.webp";
import { useState } from "react";
export default function LoginPage() {
  console.log(auth);
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  return (
    <Box
      sx={{
        backgroundImage: `url(${auth})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "448px",
          height: "727px",
          borderRadius: 5,
        }}
      >
        <Box>
          <Box
            sx={{ width: "102px", height: "30px" }}
            component="img"
            alt="Company Logo"
            src={MyLogo}
          />

          <Box>
            <Typography>Welcome to Humanly</Typography>
            <Typography>Sign in to access your employee profile</Typography>
          </Box>
          <Box sx={{display:'flex',flexDirection:'column',gap:2}}>
          <TextField
          label='Enter your email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}></TextField>
           <TextField
           label='Enter your password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}></TextField>
          </Box>
          <Button>Login</Button>
          <Button>Register</Button>
        </Box>
      </Card>
    </Box>
  );
}

import { Card, Box, Typography, TextField, Button } from "@mui/material";
import auth from "../assets/auth.webp";
import MyLogo from "../assets/HR-logo.webp";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "../graphql/mutations/authMutations";
import { useAppDispatch } from "../store/hooks";
import { loginThunk } from "../store/thunks/loginThunk";
import { toast } from "react-toastify";
export default function LoginPage() {
  console.log(auth);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      dispatch(loginThunk(data?.login));
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err.message);
    },
  });

  const handleLogin = async () => {
    await loginMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <TextField
              label="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </Box>
          {!loading && (
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          )}

          {/* <Button variant="contained">Register</Button> */}
        </Box>
      </Card>
    </Box>
  );
}

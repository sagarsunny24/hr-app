import { Card, Box, Typography, TextField, Button } from "@mui/material";
import auth from "../assets/auth.webp";
import MyLogo from "../assets/HR-logo.webp";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "../graphql/mutations/authMutations";
import { useAppDispatch } from "../store/hooks";
import { loginThunk } from "../store/thunks/loginThunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
export default function LoginPage() {
  console.log(auth);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      dispatch(loginThunk(data?.login));
      navigate("/home");
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
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: 450,
          borderRadius: 4,
          p: 4,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
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
              Welcome Back
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "text.secondary",
                fontSize: 15,
              }}
            >
              Sign in to access your employee profile
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              mt: 1,
              py: 1.2,
              borderRadius: 2,
              
            }}
          >
            {loading ? "Signing In..." : "Login"}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              py: 1.2,
              borderRadius: 2,
              borderColor: "divider",
            }}
          >
            Register
          </Button>
        </Box>
        <Typography
          sx={{
            mt: 1,
            fontSize: 13,
          }}
        >
          Humanly HR Management System
        </Typography>
      </Card>
    </Box>
  );
}

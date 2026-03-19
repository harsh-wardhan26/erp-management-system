import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from "@mui/material";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await API.post("/login",{email,password});

      localStorage.setItem("token",res.data.token);

      toast.success("Login successful");

      navigate("/dashboard");

    } catch(err) {

      toast.error("Login failed");

    }

  };

  return (

    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f6fa"
      }}
    >

      <Paper sx={{ padding: 4, width: 350 }}>

        <Typography variant="h5" mb={2} align="center">
          ERP Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

      </Paper>

    </Box>

  );

}

export default Login;
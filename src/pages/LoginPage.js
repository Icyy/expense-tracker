import React, { useState } from "react";
import { Button, TextField, Box, Grid, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import { login } from "../api/api"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/"); // Redirect to the dashboard after successful login
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); // Redirect to signup page
  };

  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Grid container maxWidth="md" spacing={4}>
        {/* Login Content */}
        <Grid item xs={12} md={6}>
          {error && <Typography color="error">{error}</Typography>}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <h1>Login</h1>
            <TextField
              label="Email"
              variant="outlined"
              placeholder="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                marginBottom: 2,
                maxWidth: "400px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#00ff7f",
                  },
                  "&:hover fieldset": {
                    borderColor: "#00ff7f",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00ff7f",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#fff",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#00ff7f",
                },
              }}
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginBottom: 2,
                maxWidth: "400px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#00ff7f",
                  },
                  "&:hover fieldset": {
                    borderColor: "#00ff7f",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00ff7f",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#fff",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#00ff7f",
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              sx={{ maxWidth: "400px", fontWeight: "bold" }}
            >
              Login
            </Button>
          </Box>
        </Grid>

        {/* <Grid item xs={0} md={1} display="flex" justifyContent="center" alignItems="center">
          <Divider orientation="vertical" />
        </Grid> */}

        {/* Signup Content */}
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bgcolor=""
          borderRadius={2}
        >
          <Typography variant="h6" gutterBottom>
            New here? Come Sign Up
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignupRedirect}
            sx={{ fontWeight: "bold" }}
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;

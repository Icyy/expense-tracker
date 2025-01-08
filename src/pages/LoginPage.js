import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { login } from '../api/api'; // Ensure this import path is correct

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      navigate("/"); // Redirect to the dashboard after successful login
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <h1>Login</h1>
        
        <TextField
          label="Email"
          variant="outlined"
          placeholder="Email"
          fullWidth
          value={email} // Bind the value of email input to state
          onChange={(e) => setEmail(e.target.value)} // Update state when user types
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
          value={password} // Bind the value of password input to state
          onChange={(e) => setPassword(e.target.value)} // Update state when user types
          sx={{
            marginBottom: 2,
            color: "white",
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
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { register } from '../api/api'; // Import the register API function

const SignupPage = () => {
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form default submission
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages

    try {
      const response = await register(userData.username, userData.email, userData.password);
      setSuccess("Registration successful! Redirecting to dashboard...");
      setUserData({ username: "", email: "", password: "" }); // Reset form

      // Redirect to dashboard after a short delay (optional)
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#121212"
      color="#fff" // Dark background and white text for contrast
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleRegister} style={{ width: '300px' }}>
        <TextField
          name="username"
          fullWidth
          label="Username"
          margin="normal"
          variant="outlined"
          required
          value={userData.username}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#00ff7f", // Green border for inactive state
              },
              "&:hover fieldset": {
                borderColor: "#00ff7f", // Green border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00ff7f", // Green border when active/focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "#fff", // White label when inactive
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#00ff7f", // Green label when focused
            },
          }}
        />
        <TextField
          name="email"
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          required
          value={userData.email}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#00ff7f", // Green border for inactive state
              },
              "&:hover fieldset": {
                borderColor: "#00ff7f", // Green border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00ff7f", // Green border when active/focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "#fff", // White label when inactive
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#00ff7f", // Green label when focused
            },
          }}
        />
        <TextField
          name="password"
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          required
          value={userData.password}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#00ff7f", // Green border for inactive state
              },
              "&:hover fieldset": {
                borderColor: "#00ff7f", // Green border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00ff7f", // Green border when active/focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "#fff", // White label when inactive
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#00ff7f", // Green label when focused
            },
          }}
        />
        {error && <Typography color="error" variant="body2">{error}</Typography>}
        {success && <Typography color="success" variant="body2">{success}</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            marginTop: 2,
            fontWeight: 'bold',
            backgroundColor: "#00ff7f", // Green background
            "&:hover": {
              backgroundColor: "#00e05d", // Darker green on hover
            },
          }}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignupPage;

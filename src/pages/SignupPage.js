import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const SignupPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#121212"
      color="#fff"  // Dark background and white text for contrast
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          variant="outlined"
          required
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
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          required
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
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          required
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            marginTop: 2,
            fontWeight:'bold',
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

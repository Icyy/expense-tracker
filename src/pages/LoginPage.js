import React from "react";
import { Button, TextField, Box } from "@mui/material";

const LoginPage = () => {
  return (
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
        sx={{
          marginBottom: 2,
          maxWidth: "400px",
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
            color: "#fff", // Make the label visible when input is inactive
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#00ff7f", // Green label when input is focused
          },
        }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        sx={{
          marginBottom: 2,
          color: "white",
          maxWidth: "400px",
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
            color: "#fff", // Make the label visible when input is inactive
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#00ff7f", // Green label when input is focused
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ maxWidth: "400px", fontWeight: "bold" }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;

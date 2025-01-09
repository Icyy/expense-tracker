import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Avatar, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isLoggedIn = Boolean(localStorage.getItem('token')); // Check if user is logged in

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token to log out
    navigate('/login'); // Redirect to signup page
    handleMenuClose();
  };

  const handleLoginSignup = () => {
    navigate('/login'); // Redirect to signup/login page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>
        {isLoggedIn ? (
          <>
            <IconButton onClick={handleMenuOpen} color="black">
              <Avatar alt="User Icon" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout} sx={{color:'black'}}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            color="black"
            onClick={handleLoginSignup}
            sx={{ fontWeight: 'bold' }}
          >
            Signup / Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

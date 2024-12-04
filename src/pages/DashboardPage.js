import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const DashboardPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={4}
      minHeight="100vh"
    >
      <Typography variant="h3" gutterBottom>
        Expense Dashboard
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        View and manage your expenses easily.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/register"
        sx={{ marginTop: 2, fontWeight:'bold' }}
      >
        Sign up
      </Button>
    </Box>
  );
};

export default DashboardPage;

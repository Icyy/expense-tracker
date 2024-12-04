import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddExpensePage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense submitted");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Typography variant="h4" gutterBottom>
        Add/Edit Expense
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <TextField
          fullWidth
          label="Amount"
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Category"
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Description"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Date"
          type="date"
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default AddExpensePage;

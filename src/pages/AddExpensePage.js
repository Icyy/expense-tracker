import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddExpensePage = () => {
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense submitted");
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#121212"  // Dark background for consistency
      color="#fff"  // White text for contrast
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

        {/* Category Dropdown with same styling as TextField */}
        <FormControl fullWidth margin="normal" variant="outlined" required>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            sx={{
                fontWeight:'bold',
                borderColor:'#00ff7f',
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
              // Styles for the dropdown's collapsed state
              "& .MuiSelect-select": {
                // backgroundColor: "#00ff7f", // Green background when collapsed
                borderColor:'#00ff7f',
                color: "#000",
                fontWeight:'bold' // Black text when collapsed
              },
              "& .MuiMenuItem-root": {
                backgroundColor: "#00ff7f", // Green background for each item
                borderColor:'#00ff7f',
                color: "#000", // Black text for each item
                fontWeight:'bold',
                "&:hover": {
                  backgroundColor: "#00e05d", // Darker green on hover
                },
              },
            }}
          >
            <MenuItem value="food" sx={{color:'black'}}>Food</MenuItem>
            <MenuItem value="transport" sx={{color:'black'}}>Transport</MenuItem>
            <MenuItem value="utilities" sx={{color:'black'}}>Utilities</MenuItem>
            <MenuItem value="entertainment" sx={{color:'black'}}>Entertainment</MenuItem>
            <MenuItem value="others" sx={{color:'black'}}>Others</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Description"
          margin="normal"
          variant="outlined"
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
          label="Date"
          type="date"
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
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
            backgroundColor: "#00ff7f", // Green background
            "&:hover": {
              backgroundColor: "#00e05d", // Darker green on hover
            },
          }}
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default AddExpensePage;

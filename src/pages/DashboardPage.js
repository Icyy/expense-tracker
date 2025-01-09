import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { getExpenses, addExpense } from '../api/api'; // Ensure the import paths are correct

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch expenses when the page loads
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (err) {
        setError("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };
    
    fetchExpenses();
  }, []);

  const handleAddExpense = () => {
    // Logic to handle expense addition (e.g., opening a modal or navigating to an add expense page)
    alert("Redirecting to add new expense page.");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

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
      <Typography variant="h6" color="white" gutterBottom>
        View and manage your expenses easily.
      </Typography>
      
      {/* Show error message if any */}
      {/* {error && <Typography color="error">{error}</Typography>} */}

      {/* Show message if no expenses are found */}
      {!error && expenses.length === 0 && (
        <Box>
          <Typography variant="h6" color="white" gutterBottom>
            No expenses found. Start adding your expenses.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddExpense}
            sx={{ fontWeight: 'bold', alignItems: 'center' }}
          >
            Add Expense
          </Button>
        </Box>
      )}

      {/* Display expenses if available */}
      {!error && expenses.length > 0 && (
        <Grid container spacing={3} justifyContent="center">
          {expenses.map((expense) => (
            <Grid item xs={12} sm={6} md={4} key={expense._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Amount: ${expense.amount}</Typography>
                  <Typography variant="body1">Category: {expense.category}</Typography>
                  <Typography variant="body2">Description: {expense.description}</Typography>
                  <Typography variant="body2">Date: {new Date(expense.date).toLocaleDateString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Show Sign up button if not logged in */}
      {!localStorage.getItem('token') && (
        <Button
          variant="contained"
          color="primary"
          href="/register"
          sx={{ marginTop: 2, fontWeight: 'bold' }}
        >
          Sign up
        </Button>
      )}
    </Box>
  );
};

export default DashboardPage;

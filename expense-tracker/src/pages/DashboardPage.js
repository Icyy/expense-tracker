import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { getExpenses, addExpense, deleteExpense } from "../api/api"; // Ensure the import paths are correct

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

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
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseForm({
      ...expenseForm,
      [name]: value,
    });
  };
  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

  const handleSubmit = async () => {
    try {
      const newExpense = await addExpense(expenseForm);
      setExpenses((prevExpenses) => [newExpense, ...prevExpenses]); // Adds the new expense at the start
      setOpenModal(false); // Close the modal
      setExpenseForm({
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (err) {
      setError("Failed to add expense");
    }
  };

  const handleDeleteExpense = async (id) => {
    // Logic to delete an expense
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        console.log(id)
        await deleteExpense(id);
        const updatedExpenses = expenses.filter(
          (expense) => expense._id !== id
        );
        setExpenses(updatedExpenses);
        console.log(updatedExpenses)
      } catch (error) {
        setError("Failed to delete expense");
      }
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
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

      {/* Add Expense Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddExpense}
        sx={{ fontWeight: "bold", marginBottom: 3 }}
      >
        Add Expense
      </Button>

      {/* Show message if no expenses are found */}
      {!error && expenses.length === 0 && (
        <Box
          sx={{
            marginTop: "20vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="white" gutterBottom>
            No expenses found. Start adding your expenses.
          </Typography>
        </Box>
      )}

      {/* Display the most recent expense in a table-like structure */}
      {!error && expenses.length > 0 && (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ color: "black" }}
        >
          {/* Most recent expense card */}
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent sx={{ color: "black" }}>
                <Typography variant="h6">Most Recent Expense</Typography>
                <Box
                  component="table"
                  sx={{
                    width: "100%",
                    marginTop: 2,
                    borderCollapse: "collapse",
                  }}
                >
                  <Box component="thead">
                    <Box component="tr">
                      <Box
                        component="th"
                        sx={{ padding: "8px", border: "1px solid black" }}
                      >
                        Description
                      </Box>
                      <Box
                        component="th"
                        sx={{ padding: "8px", border: "1px solid black" }}
                      >
                        Amount
                      </Box>
                      <Box
                        component="th"
                        sx={{ padding: "8px", border: "1px solid black" }}
                      ></Box>
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {expenses.map((expense, id) => {
                      return (
                        <>
                          <Box component="tr" key={id}>
                            <Box
                              component="td"
                              sx={{ padding: "8px", border: "1px solid black" }}
                            >
                              {expense.description}
                            </Box>
                            <Box
                              component="td"
                              sx={{ padding: "8px", border: "1px solid black" }}
                            >
                              ₹{expense.amount}
                            </Box>
                            <Box
                              component="td"
                              sx={{ padding: "8px", border: "1px solid black" }}
                            >
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDeleteExpense(expense._id)}
                              >
                                Delete
                              </Button>
                            </Box>
                          </Box>
                        </>
                      );
                    })}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Analysis chart card */}
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ color: "black" }}>
                <Typography variant="h6">Expense Analysis</Typography>
                {/* Chart content will be here */}
                <Box sx={{ height: "100%", backgroundColor: "#f0f0f0" }}>
                  {/* Insert your chart here */}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Add Expense Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            name="amount"
            value={expenseForm.amount}
            onChange={handleChange}
            sx={{ marginBottom: 2, input: { color: "black" } }}
          />

          {/* Category Dropdown */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={expenseForm.category}
              onChange={handleChange}
              label="Category"
              sx={{ color: "black !important" }}
            >
              <MenuItem value="food" sx={{ color: "black" }}>
                Food
              </MenuItem>
              <MenuItem value="transport" sx={{ color: "black" }}>
                Transport
              </MenuItem>
              <MenuItem value="utilities" sx={{ color: "black" }}>
                Utilities
              </MenuItem>
              <MenuItem value="entertainment" sx={{ color: "black" }}>
                Entertainment
              </MenuItem>
              <MenuItem value="others" sx={{ color: "black" }}>
                Others
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Description"
            fullWidth
            name="description"
            value={expenseForm.description}
            onChange={handleChange}
            sx={{ marginBottom: 2, input: { color: "black" } }}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            name="date"
            value={expenseForm.date}
            onChange={handleChange}
            sx={{ marginBottom: 2, input: { color: "black" } }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Expense
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;

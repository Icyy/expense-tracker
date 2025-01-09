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
import { getExpenses, addExpense } from "../api/api"; // Ensure the import paths are correct

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

  const handleSubmit = async () => {
    try {
      const newExpense = await addExpense(expenseForm);
      setExpenses([...expenses, newExpense]); // Update local expenses list
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

      {/* Show error message if any */}
      {/* {error && <Typography color="error">{error}</Typography>} */}

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
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddExpense}
            sx={{ fontWeight: "bold", alignItems: "center" }}
          >
            Add Expense
          </Button>
        </Box>
      )}

      {/* Display expenses if available */}
      {!error && expenses.length > 0 && (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ color: "black" }}
        >
          {expenses.map((expense) => (
            <Grid item xs={12} sm={6} md={4} key={expense._id}>
              <Card>
                <CardContent sx={{ color: "black" }}>
                  <Typography variant="h6">
                    Amount: ₹{expense.amount}
                  </Typography>
                  <Typography variant="body1">
                    Category: {expense.category}
                  </Typography>
                  <Typography variant="body2">
                    Description: {expense.description}
                  </Typography>
                  <Typography variant="body2">
                    Date: {new Date(expense.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
                sx={{ marginBottom: 2, color: "black !important" }}
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
                sx={{ marginBottom: 2, color: "black !important" }}
              />
              <TextField
                label="Date"
                type="date"
                fullWidth
                name="date"
                value={expenseForm.date}
                onChange={handleChange}
                sx={{ marginBottom: 2, color: "black !important" }}
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
        </Grid>
      )}

      {/* Show Sign up button if not logged in */}
      {!localStorage.getItem("token") && (
        <Button
          variant="contained"
          color="primary"
          href="/register"
          sx={{ marginTop: 2, fontWeight: "bold" }}
        >
          Sign up
        </Button>
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
            sx={{ marginBottom: 2, color: "black !important" }}
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
            sx={{ marginBottom: 2, color: "black !important" }}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            name="date"
            value={expenseForm.date}
            onChange={handleChange}
            sx={{ marginBottom: 2, color: "black !important" }}
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

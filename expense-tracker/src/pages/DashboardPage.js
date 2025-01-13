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
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getExpenses, addExpense, deleteExpense } from "../api/api"; 

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

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
      setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
      setOpenModal(false);
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
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
      } catch (err) {
        setError("Failed to delete expense");
      }
    }
  };

  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.category;
    const amount = parseFloat(expense.amount);
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

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
      <Typography variant="h6" gutterBottom>
        View and manage your expenses easily.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddExpense}
        sx={{ fontWeight: "bold", marginBottom: 3 }}
      >
        Add Expense
      </Button>

      {!error && expenses.length === 0 && (
        <Box
          sx={{
            marginTop: "20vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{color:'black'}} variant="h6" gutterBottom>
            No expenses found. Start adding your expenses.
          </Typography>
        </Box>
      )}

      {!error && expenses.length > 0 && (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "black" }}>
                  Most Recent Expense
                </Typography>
                <Box component="table" sx={{ width: "100%", marginTop: 2, borderCollapse: "collapse" }}>
                  <Box component="thead">
                    <Box component="tr">
                      <Box component="th" sx={{ padding: "8px", border: "1px solid black", color:'black' }}>
                        Description
                      </Box>
                      <Box component="th" sx={{ padding: "8px", border: "1px solid black", color:'black' }}>
                        Amount
                      </Box>
                      <Box component="th" sx={{ padding: "8px", border: "1px solid black", color:'black' }}>Delete</Box>
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {expenses.map((expense, id) => (
                      <Box component="tr" key={id}>
                        <Box component="td" sx={{ padding: "8px", border: "1px solid black",color:'black' }}>
                          {expense.description}
                        </Box>
                        <Box component="td" sx={{ padding: "8px", border: "1px solid black",color:'black' }}>
                          ₹{expense.amount}
                        </Box>
                        <Box component="td" sx={{ padding: "8px", border: "1px solid black",color:'black' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDeleteExpense(expense._id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "black" }}>
                  Expense Analysis
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle sx={{color:'black'}}>Add New Expense</DialogTitle>
        <DialogContent sx={{color:'black'}}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            name="amount"
            value={expenseForm.amount}
            onChange={handleChange}
            sx={{ marginBottom: 2, }}
            InputProps={{
              style:{color:'black'}
            }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={expenseForm.category}
              onChange={handleChange}
              label="Category"
              sx={{color:'black'}}
            >
              <MenuItem sx={{color:'black'}} value="food">Food</MenuItem>
              <MenuItem sx={{color:'black'}} value="transport">Transport</MenuItem>
              <MenuItem sx={{color:'black'}} value="utilities">Utilities</MenuItem>
              <MenuItem sx={{color:'black'}} value="entertainment">Entertainment</MenuItem>
              <MenuItem sx={{color:'black'}} value="others">Others</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Description"
            fullWidth
            name="description"
            value={expenseForm.description}
            onChange={handleChange}
            sx={{ marginBottom: 2,}}
            InputProps={{
              style:{color:'black'}
            }}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            name="date"
            value={expenseForm.date}
            onChange={handleChange}
            sx={{ marginBottom: 2, color:'black' }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              style:{color:'black'}
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{border:'1px solid'}}>
            Add Expense
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;

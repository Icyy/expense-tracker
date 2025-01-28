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
  InputAdornment,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../api/api";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
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
        setFilteredExpenses(data); // Initialize filteredExpenses with all data
      } catch (err) {
        setError("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = () => {
    setEditMode(false);
    setExpenseForm({
      amount: "",
      category: "",
      description: "",
      date: "",
    });
    setOpenModal(true);
  };

  const handleEditExpense = (expense) => {
    setEditMode(true);
    setSelectedExpenseId(expense._id);
    setExpenseForm({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date.split("T")[0],
    });
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
      if (editMode) {
        const updatedExpense = await updateExpense(
          selectedExpenseId,
          expenseForm
        );
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense._id === selectedExpenseId ? updatedExpense : expense
          )
        );
        setFilteredExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense._id === selectedExpenseId ? updatedExpense : expense
          )
        );
      } else {
        const newExpense = await addExpense(expenseForm);
        setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
        setFilteredExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
      }
      setOpenModal(false);
      setExpenseForm({
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (err) {
      setError(editMode ? "Failed to update expense" : "Failed to add expense");
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== id)
        );
        setFilteredExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== id)
        );
      } catch (err) {
        setError("Failed to delete expense");
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter expenses based on the search query
    const filtered = expenses.filter((expense) =>
      expense.description.toLowerCase().includes(query)
    );
    setFilteredExpenses(filtered);
  };

  const categoryData = filteredExpenses.reduce((acc, expense) => {
    const category = expense.category;
    const amount = parseFloat(expense.amount);
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

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

      <TextField
        label="Search Expenses"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#00ff7f" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          marginBottom: "20px",
          backgroundColor: "black",
          borderRadius: "4px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#00ff7f", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#1976d2", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2", // Border color when focused
            },
          },
          "& .MuiInputLabel-root": {
            color: "#00ff7f", // Custom label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#00ff7f", // Ensure label stays green when focused
          },
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddExpense}
        sx={{ fontWeight: "bold", marginBottom: 3 }}
      >
        Add Expense
      </Button>

      {!error && filteredExpenses.length === 0 && (
        <Box
          sx={{
            marginTop: "20vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            No expenses found. Start adding your expenses.
          </Typography>
        </Box>
      )}

      {!error && filteredExpenses.length > 0 && (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "black" }}>
                  Most Recent Expense
                </Typography>
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
                        sx={{
                          padding: "8px",
                          border: "1px solid black",
                          color: "black",
                        }}
                      >
                        Description
                      </Box>
                      <Box
                        component="th"
                        sx={{
                          padding: "8px",
                          border: "1px solid black",
                          color: "black",
                        }}
                      >
                        Amount
                      </Box>
                      <Box
                        component="th"
                        sx={{
                          padding: "8px",
                          border: "1px solid black",
                          color: "black",
                        }}
                      >
                        Actions
                      </Box>
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {filteredExpenses.map((expense, id) => (
                      <Box component="tr" key={id}>
                        <Box
                          component="td"
                          sx={{
                            padding: "8px",
                            border: "1px solid black",
                            color: "black",
                          }}
                        >
                          {expense.description}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            padding: "8px",
                            border: "1px solid black",
                            color: "black",
                          }}
                        >
                          ₹{expense.amount}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            padding: "8px",
                            border: "1px solid black",
                            color: "black",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleEditExpense(expense)}
                            sx={{ marginRight: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDeleteExpense(expense._id)}
                          >
                            <DeleteIcon />
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
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
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
        <DialogTitle sx={{ color: "black" }}>
          {editMode ? "Edit Expense" : "Add New Expense"}
        </DialogTitle>
        <DialogContent sx={{ color: "black" }}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            name="amount"
            value={expenseForm.amount}
            onChange={handleChange}
            margin="dense"
            InputProps={{
              style: { color: "black" }, // Text color
            }}
            InputLabelProps={{
              style: { color: "black" }, // Label color
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#1976d2",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />
          <TextField
            label="Description"
            fullWidth
            name="description"
            value={expenseForm.description}
            onChange={handleChange}
            margin="dense"
            InputProps={{
              style: { color: "black" }, // Text color
            }}
            InputLabelProps={{
              style: { color: "black" }, // Label color
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#1976d2",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel
              sx={{
                color: "black",
              }}
            >
              Category
            </InputLabel>
            <Select
              name="category"
              value={expenseForm.category}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "black",
                },
              }}
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Travel">Travel</MenuItem>
              <MenuItem value="Bills">Bills</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Date"
            type="date"
            fullWidth
            name="date"
            value={expenseForm.date}
            onChange={handleChange}
            margin="dense"
            InputProps={{
              style: { color: "black" }, // Text color
            }}
            InputLabelProps={{
              style: { color: "black" }, // Label color
              shrink: true, // Ensures the label doesn't overlap the date value
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#1976d2",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="black" sx={{backgroundColor:'#00ff7f', color:'black'}}>
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;

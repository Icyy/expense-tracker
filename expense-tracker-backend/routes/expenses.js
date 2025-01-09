const express = require('express');
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/auth'); // This middleware checks if the user is authenticated
const router = express.Router();

// Create an expense
router.post('/', authMiddleware, async (req, res) => {
  const { amount, category, description, date } = req.body;
  try {
    const expense = new Expense({
      user: req.user.id, // Store the user ID from the token
      amount,
      category,
      description,
      date,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all expenses for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an expense
router.put('/:id', authMiddleware, async (req, res) => {
  const { amount, category, description, date } = req.body;

  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense || expense.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = description || expense.description;
    expense.date = date || expense.date;

    await expense.save();
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an expense
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense || expense.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.remove();
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

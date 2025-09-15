const Expense = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  try {
    const { userId, title, amount, category } = req.body;
    const expense = new Expense({ userId, title, amount, category });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.find({ userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

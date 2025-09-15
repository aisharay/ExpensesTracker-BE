const Income = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
  try {
    const { userId, source, amount } = req.body;
    const income = new Income({ userId, source, amount });
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const { userId } = req.params;
    const incomes = await Income.find({ userId });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

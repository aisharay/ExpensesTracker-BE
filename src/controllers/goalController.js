const Goal = require("../models/goalModel");

exports.addGoal = async (req, res) => {
  try {
    const { userId, goalName, targetAmount, years } = req.body;
    const goal = new Goal({ userId, goalName, targetAmount, years });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const { userId } = req.params;
    const goals = await Goal.find({ userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

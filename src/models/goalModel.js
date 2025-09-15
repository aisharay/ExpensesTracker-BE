const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goalName: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  years: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Goal", goalSchema);

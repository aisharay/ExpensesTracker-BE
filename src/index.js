const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/config");
const swaggerDocs = require("./config/swagger");

const userRoutes = require("./routes/userRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const goalRoutes = require("./routes/goalRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation
swaggerDocs(app);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/goals", goalRoutes);

app.get("/", (req, res) => {
  res.send("Expense Tracker API with MongoDB 🚀");
});

// Connect DB and start server
connectDB()
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

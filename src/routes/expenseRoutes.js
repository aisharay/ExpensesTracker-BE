/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - amount
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated expense ID
 *         userId:
 *           type: string
 *           description: ID of the user who owns this expense
 *         title:
 *           type: string
 *           description: Title of the expense
 *         amount:
 *           type: number
 *           description: Amount of the expense
 *         category:
 *           type: string
 *           description: Category of the expense
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the expense
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         userId: 60d0fe4f5311236168a109cb
 *         title: "Grocery Shopping"
 *         amount: 150.50
 *         category: "Food"
 *         date: "2023-06-21T10:30:00.000Z"
 */

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - title
 *               - amount
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109cb"
 *               title:
 *                 type: string
 *                 example: "Grocery Shopping"
 *               amount:
 *                 type: number
 *                 example: 150.50
 *               category:
 *                 type: string
 *                 example: "Food"
 *     responses:
 *       201:
 *         description: Expense added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /expenses/{userId}:
 *   get:
 *     summary: Get all expenses for a user
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *         example: "60d0fe4f5311236168a109cb"
 *     responses:
 *       200:
 *         description: List of expenses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

const express = require("express");
const { addExpense, getExpenses } = require("../controllers/expenseController");

const router = express.Router();

router.post("/", addExpense);
router.get("/:userId", getExpenses);

module.exports = router;

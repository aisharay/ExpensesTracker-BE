/**
 * @swagger
 * tags:
 *   name: Incomes
 *   description: Income management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Income:
 *       type: object
 *       required:
 *         - userId
 *         - source
 *         - amount
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated income ID
 *         userId:
 *           type: string
 *           description: ID of the user who owns this income
 *         source:
 *           type: string
 *           description: Source of the income
 *         amount:
 *           type: number
 *           description: Amount of the income
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the income
 *       example:
 *         _id: 60d0fe4f5311236168a109cc
 *         userId: 60d0fe4f5311236168a109cb
 *         source: "Salary"
 *         amount: 5000.00
 *         date: "2023-06-21T10:30:00.000Z"
 */

/**
 * @swagger
 * /incomes:
 *   post:
 *     summary: Add a new income
 *     tags: [Incomes]
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
 *               - source
 *               - amount
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109cb"
 *               source:
 *                 type: string
 *                 example: "Salary"
 *               amount:
 *                 type: number
 *                 example: 5000.00
 *     responses:
 *       201:
 *         description: Income added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Income'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /incomes/{userId}:
 *   get:
 *     summary: Get all incomes for a user
 *     tags: [Incomes]
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
 *         description: List of incomes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Income'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

const express = require("express");
const { addIncome, getIncomes } = require("../controllers/incomeController");

const router = express.Router();

router.post("/", addIncome);
router.get("/:userId", getIncomes);

module.exports = router;

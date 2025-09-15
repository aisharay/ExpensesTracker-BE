/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: Financial goals management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Goal:
 *       type: object
 *       required:
 *         - userId
 *         - goalName
 *         - targetAmount
 *         - years
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated goal ID
 *         userId:
 *           type: string
 *           description: ID of the user who owns this goal
 *         goalName:
 *           type: string
 *           description: Name of the financial goal
 *         targetAmount:
 *           type: number
 *           description: Target amount for the goal
 *         years:
 *           type: number
 *           description: Number of years to achieve the goal
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the goal was created
 *       example:
 *         _id: 60d0fe4f5311236168a109cd
 *         userId: 60d0fe4f5311236168a109cb
 *         goalName: "Emergency Fund"
 *         targetAmount: 10000.00
 *         years: 2
 *         createdAt: "2023-06-21T10:30:00.000Z"
 */

/**
 * @swagger
 * /goals:
 *   post:
 *     summary: Add a new financial goal
 *     tags: [Goals]
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
 *               - goalName
 *               - targetAmount
 *               - years
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109cb"
 *               goalName:
 *                 type: string
 *                 example: "Emergency Fund"
 *               targetAmount:
 *                 type: number
 *                 example: 10000.00
 *               years:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Goal added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /goals/{userId}:
 *   get:
 *     summary: Get all goals for a user
 *     tags: [Goals]
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
 *         description: List of goals retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

const express = require("express");
const { addGoal, getGoals } = require("../controllers/goalController");

const router = express.Router();

router.post("/", addGoal);
router.get("/:userId", getGoals);

module.exports = router;

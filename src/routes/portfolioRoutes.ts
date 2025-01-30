import express from "express";
import { validatePortfolio } from "../validations/portfolioValidation";
import { portfolioController } from "../controllers/portfolioControllers";
import { isLoggedIn } from "../middleware/authentication";

export const portfolioRouter = express.Router();

portfolioRouter.post(
  "/createPortfolio",
  validatePortfolio,
  isLoggedIn,
  portfolioController.createPortfolio
);
portfolioRouter.patch(
  "/updatePortfolio/:portfolioId/:userId",
  validatePortfolio,
  portfolioController.updatePortfolio
);
portfolioRouter.delete(
  "/deletePortfolio/:portfolioId/:userId",
  portfolioController.deletePortfolio
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Portfolio:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - description
 *         - date
 *         - images
 *       properties:
 *         userId:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the user who owns the portfolio
 *         title:
 *           type: string
 *           description: The title of the portfolio
 *         description:
 *           type: string
 *           description: A detailed description of the portfolio
 *         date:
 *           type: string
 *           format: date
 *           description: The creation date of the portfolio
 *         likes:
 *           type: number
 *           description: Number of likes on the portfolio
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *           description: Array of comment IDs related to the portfolio
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: List of image URLs
 *         linkToRepo:
 *           type: string
 *           description: URL to the repository (if available)
 *         linkToSite:
 *           type: string
 *           description: URL to the live site (if available)
 */

/**
 * @swagger
 * tags:
 *   name: Portfolio
 *   description: Portfolio management endpoints
 */

/**
 * @swagger
 * /portfolio/createPortfolio:
 *   post:
 *     summary: Create a new portfolio
 *     security:
 *       - bearerAuth: []
 *     tags: [Portfolio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Portfolio'
 *     responses:
 *       201:
 *         description: Portfolio successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Portfolio'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /portfolio/updatePortfolio/{portfolioId}/{userId}:
 *   patch:
 *     summary: Update an existing portfolio
 *     tags: [Portfolio]
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: The ID of the portfolio to update
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: The ID of the user making the update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Portfolio'
 *     responses:
 *       200:
 *         description: Portfolio updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Portfolio not found
 */

/**
 * @swagger
 * /portfolio/deletePortfolio/{portfolioId}/{userId}:
 *   delete:
 *     summary: Delete a portfolio
 *     tags: [Portfolio]
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: The ID of the portfolio to delete
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: The ID of the user requesting deletion
 *     responses:
 *       200:
 *         description: Portfolio deleted successfully
 *       403:
 *         description: Not authorized to delete this portfolio
 *       404:
 *         description: Portfolio not found
 */

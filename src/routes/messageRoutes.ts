import express from "express";
import { messageController } from "../controllers/messageControllers";
import { isLoggedIn } from "../middleware/authentication";

export const messageRouter = express.Router();

messageRouter.post(
  "/createMessage/:receiverId",
  isLoggedIn,
  messageController.createMessage
);
messageRouter.patch(
  "/updateMessage/:messageId",
  isLoggedIn,
  messageController.updateMessage
);
messageRouter.patch(
  "readMessage/:messageId",
  isLoggedIn,
  messageController.readMessage
);
messageRouter.delete(
  "/deleteMessage/:messageId",
  isLoggedIn,
  messageController.deleteMessage
);
messageRouter.get("/messages", isLoggedIn, messageController.getAllMessage);

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - sender
 *         - receiver
 *         - content
 *       properties:
 *         sender:
 *           type: string
 *           description: ID of the sender
 *         receiver:
 *           type: string
 *           description: ID of the receiver
 *         content:
 *           type: string
 *           description: The message content
 *         timeStamp:
 *           type: string
 *           format: date-time
 *           description: Message sent timestamp
 *         read:
 *           type: boolean
 *           default: false
 *           description: Message read status
 */

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API endpoints for messaging system
 */

/**
 * @swagger
 * /message/createMessage/{receiverId}:
 *   post:
 *     summary: Send a message to a receiver
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: receiverId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the receiver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The message content
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /message/updateMessage/{messageId}:
 *   patch:
 *     summary: Update an existing message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated message content
 *     responses:
 *       200:
 *         description: Message updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /message/readMessage/{messageId}:
 *   patch:
 *     summary: Mark a message as read
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to mark as read
 *     responses:
 *       200:
 *         description: Message marked as read
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /message/deleteMessage/{messageId}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to delete
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /message/messages:
 *   get:
 *     summary: Get all messages for the logged-in user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of messages retrieved successfully
 *       401:
 *         description: Unauthorized
 */

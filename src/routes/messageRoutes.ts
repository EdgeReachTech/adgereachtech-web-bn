import express from 'express';
import { messageController } from '../controllers/messageControllers';
import { isLoggedIn } from '../middleware/authentication';

export const messageRouter = express.Router();

messageRouter.post("/createMessage/:receiverId", isLoggedIn, messageController.createMessage);
messageRouter.patch("/updateMessage/:messageId", isLoggedIn, messageController.updateMessage);
messageRouter.patch("readMessage/:messageId", isLoggedIn, messageController.readMessage);
messageRouter.delete("/deleteMessage/:messageId", isLoggedIn, messageController.deleteMessage);
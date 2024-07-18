import express from 'express';
import { messageController } from '../controllers/messageControllers';

export const messageRouter = express.Router();

messageRouter.post("/createMessage/:receiverId", messageController.createMessage);
messageRouter.patch("/updateMessage/:messageId", messageController.updateMessage);
messageRouter.patch("readMessage/:messageId", messageController.readMessage);
messageRouter.delete("/deleteMessage/:messageId", messageController.deleteMessage);
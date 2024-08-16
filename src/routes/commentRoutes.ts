import express from 'express';
import { isLoggedIn } from '../middleware/authentication';
import { commentController } from '../controllers/commentController';

export const commentRouter = express.Router();

commentRouter.post("/createComment/:portfolioId", isLoggedIn, commentController.createComment)
commentRouter.patch("/updateComment/:commentId", isLoggedIn, commentController.updateComment)
commentRouter.delete("/deleteComment/:commentId", isLoggedIn, commentController.deleteComment)
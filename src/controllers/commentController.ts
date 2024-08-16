import { Request, Response } from "express";
import { commentService } from "../services/commentService";

export class commentController {
    static createComment = async (req: Request, res: Response) => {
        try {
            const data = req.body;

            const userId = (req as any).user._id;
            const portfolioId = req.params.portfolioId;

            const bothIds = { userId, portfolioId };
            const comment = await commentService.createComment(data, bothIds);
            if (!comment) {
                res.status(404).json({ message: "Comment" });
            }

            res.status(comment.status).json({ message: comment.message });
        } catch (error: any) {
            res.status(500).json({ error: `Error ${error.message} happened` });
        }
    }

    static updateComment = async (req: Request, res: Response) => {
        try {
            const data = req.body;

            const userId = (req as any).user._id;
            const commentId = req.params.commentId;

            const bothIds = { userId, commentId };
            const comment = await commentService.updateComment(data, bothIds);
            if (!comment) {
                res.status(404).json({ message: "Comment" });
            }

            res.status(comment.status).json({ message: comment.message });
        } catch (error: any) {
            res.status(500).json({ error: `Error ${error.message} happened` });
        }
    }

    static deleteComment = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user._id;
            const commentId = req.params.commentId;

            const bothIds = { userId, commentId };
            const comment = await commentService.deleteComment(bothIds);
            if (!comment) {
                res.status(404).json({ message: "Comment" });
            }

            res.status(comment.status).json({ message: comment.message });
        } catch (error: any) {
            res.status(500).json({ error: `Error ${error.message} happened` });
        }
    }
}
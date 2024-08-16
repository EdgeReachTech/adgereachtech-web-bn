import Comment from "../models/comment";
import Portfolio from "../models/Portfolio"

export class commentService {
    static createComment = async (data: any, bothIds: any) => {

        try {
            // Check portfolio
            const portfolio = await Portfolio.findById(bothIds.portfolioId);
            if (!portfolio) {
                return { status: 400, message: "Portfolio not found" };
            }

            // Create a new comment
            const comment = new Comment({
                userId: bothIds.userId,
                portfolioId: bothIds.portfolioId,
                content: data.content,
                date: new Date()
            })
            await comment.save()

            portfolio.comments?.push(comment._id as any);
            await portfolio.save();

            return { status: 200, message: "Comment created" };
        } catch (error: any) {
            return { status: 500, message: `Error creating comment: ${error.message}` };
        }
    }

    static updateComment = async (data: any, bothIds: any) => {

        try {
            // Check portfolio
            const comment = await Comment.findById(bothIds.commentId);
            if (!comment || !comment.userId !== bothIds.userId) {
                return { status: 400, message: "Comment not found" };
            }

            // Update a new comment
            await Comment.findByIdAndUpdate(bothIds.commentId, { content: data.content }, { new: true });

            return { status: 200, message: "Comment updated" };
        } catch (error: any) {
            return { status: 500, message: `Error creating comment: ${error.message}` };
        }
    }

    static deleteComment = async (bothIds: any) => {

        try {
            // Check portfolio
            const comment = await Comment.findById(bothIds.commentId);
            if (!comment || !comment.userId !== bothIds.userId) {
                return { status: 400, message: "Comment not found" };
            }

            // Delete a new comment
            await Comment.findOneAndDelete(bothIds.commentId);

            return { status: 200, message: "Comment deleted" };
        } catch (error: any) {
            return { status: 500, message: `Error creating comment: ${error.message}` };
        }
    }
}
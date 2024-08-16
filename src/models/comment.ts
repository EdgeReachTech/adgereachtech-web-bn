import { Document, model, Schema, Types } from "mongoose";

export interface interComment extends Document {
    userId: Types.ObjectId;
    portfolioId: Types.ObjectId;
    content: string;
    date: Date;
    likes?: number;
}

const commentSchema = new Schema<interComment>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    portfolioId: { type: Schema.Types.ObjectId, ref: 'Portfolio', required: true },
    content: { type: String, required: false },
    date: { type: Date, required: true },
    likes: { type: Number, default: 0 },
});

const Comment = model<interComment>("Comment", commentSchema);

export default Comment;

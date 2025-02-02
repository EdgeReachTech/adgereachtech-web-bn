import { Document, model, Schema, Types } from "mongoose";

// Interface for Blog
export interface interBlog extends Document {
    title: string;
    description: string;
    image: string;
    userId: Types.ObjectId;
    comments: Types.ObjectId[];
    likes: number;
}

// Schema for Blog
const blogSchema = new Schema<interBlog>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    comments: { type: [Schema.Types.ObjectId], ref: 'Comment', default: [] },
    likes: { type: Number, default: 0 },
});

const Blog = model<interBlog>("Blog", blogSchema);

export default Blog;

import { Document, model, Schema, Types } from "mongoose";

export interface interPortfolio extends Document {
    userId: Types.ObjectId;
    title: string;
    description: string;
    date: Date;
    likes?: number;
    comments?: Types.ObjectId[]; // Array of comment IDs
    images: string[];
    linkToRepo?: string;
    linkToSite?: string;
}

const portfolioSchema = new Schema<interPortfolio>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    likes: { type: Number, required: false },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Accept array of comment
    images: { type: [String], required: true },
    linkToRepo: { type: String, required: false },
    linkToSite: { type: String, required: false },
});

const Portfolio = model<interPortfolio>("Portfolio", portfolioSchema);

export default Portfolio;

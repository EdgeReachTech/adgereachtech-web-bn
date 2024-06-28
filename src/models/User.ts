import { Document, model, Schema } from "mongoose";

export interface interUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  dateOfBirth: Date;
  status: string;
  role: string;
  gender: string;
  isVerified: boolean;
  verifiedAt: Date;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<interUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: false },
  password: { type: String, required: true },
  location: { type: String, required: false, default: "Unknown" },
  status: {
    type: String,
    required: true,
    enum: ["pending", "active", "blocked"],
    default: "pending",
  },
  role: {
    type: String,
    required: true,
    enum: [
      "developer",
      "President",
      "Project Manager",
      "Quality Assurence",
      "Vice President",
    ],
    default: "developer",
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
    default: "other",
  },
  isVerified: { type: Boolean, required: true, default: false },
  verifiedAt: { type: Date, required: false },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const User = model<interUser>("User", userSchema);
export default User;



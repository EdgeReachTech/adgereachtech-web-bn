import mongoose from "mongoose";
import { env } from "./env";

const connection = async () => {
  try {
    await mongoose.connect(env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("database connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

export default connection;

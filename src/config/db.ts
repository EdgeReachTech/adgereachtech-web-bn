import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("database connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

export default connection;

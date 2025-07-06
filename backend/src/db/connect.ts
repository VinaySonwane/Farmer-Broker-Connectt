import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URL;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected Successfully 🚀");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};

export default connectDB;

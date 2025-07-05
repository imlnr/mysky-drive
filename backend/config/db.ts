import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";

configDotenv(); // Load .env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
};

export default connectDB;

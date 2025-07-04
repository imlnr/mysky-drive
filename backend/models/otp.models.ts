import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    encodedOtp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 }, // 10 minutes TTL
}, { versionKey: false });

const otpModel = mongoose.model("Otp", otpSchema);

export default otpModel; 
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    encodedOtp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 }, // 10 minutes TTL
}, { versionKey: false });
const otpModel = mongoose_1.default.model("Otp", otpSchema);
exports.default = otpModel;

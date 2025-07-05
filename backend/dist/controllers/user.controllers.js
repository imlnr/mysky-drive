"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.sendOtp = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const otp_models_1 = __importDefault(require("../models/otp.models"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Load .env
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, loginType = "email" } = req.body;
    if (!email) {
        return res.status(400).json({ msg: "Email is required" });
    }
    try {
        // Check if user exists
        let user = yield user_models_1.default.findOne({ email });
        if (!user) {
            // Create user if not exists
            if (!name) {
                return res.status(400).json({ msg: "Name is required for new user" });
            }
            user = new user_models_1.default({ name, email, loginType });
            yield user.save();
        }
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Encode OTP (hashing for security)
        const encodedOtp = crypto_1.default.createHash("sha256").update(otp).digest("hex");
        // Store encoded OTP in DB with email
        yield otp_models_1.default.create({ email, encodedOtp });
        // Set up nodemailer transporter (replace with your SMTP credentials)
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER || "your_email@example.com",
                pass: process.env.SMTP_PASS || "your_email_password",
            },
        });
        // Email options
        const mailOptions = {
            from: process.env.SMTP_FROM || '"Your App" <your_email@example.com>',
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}`,
            html: `<p>Your OTP code is: <b>${otp}</b></p>`,
        };
        // Send email
        yield transporter.sendMail(mailOptions);
        // Optionally, you can store the OTP in DB or cache with expiry for verification
        res.status(200).json({ msg: "OTP sent successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: "Error sending OTP", error });
    }
});
exports.sendOtp = sendOtp;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ msg: "Email and OTP are required" });
    }
    try {
        const encodedOtp = crypto_1.default.createHash("sha256").update(otp).digest("hex");
        const otpDoc = yield otp_models_1.default.findOne({ email, encodedOtp });
        if (!otpDoc) {
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        }
        // Optionally, delete OTP after successful verification
        yield otp_models_1.default.deleteOne({ _id: otpDoc._id });
        const userData = yield user_models_1.default.findOne({ email });
        const accessToken = jsonwebtoken_1.default.sign({ userID: userData === null || userData === void 0 ? void 0 : userData._id }, process.env.JWT_SECRET || "DRIVE_FOLDER_SECRET", { expiresIn: "7d" });
        const refreshToken = jsonwebtoken_1.default.sign({ userID: userData === null || userData === void 0 ? void 0 : userData._id }, process.env.JWT_SECRET || "DRIVE_FOLDER_SECRET", { expiresIn: "1y" });
        return res.status(200).json({ msg: "OTP verified successfully", accessToken, refreshToken });
    }
    catch (error) {
        return res.status(500).json({ msg: "Error verifying OTP", error });
    }
});
exports.verifyOtp = verifyOtp;

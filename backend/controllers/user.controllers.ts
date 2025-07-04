import { Request, Response } from "express";
import userModel from "../models/user.models";
import nodemailer from "nodemailer";
import otpModel from "../models/otp.models";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { config as configDotenv } from "dotenv";

configDotenv(); // Load .env


export const sendOtp = async (req: Request, res: Response) => {
    const { name, email, loginType = "email" } = req.body;

    if (!email) {
        return res.status(400).json({ msg: "Email is required" });
    }

    try {
        // Check if user exists
        let user = await userModel.findOne({ email });

        if (!user) {
            // Create user if not exists
            if (!name) {
                return res.status(400).json({ msg: "Name is required for new user" });
            }
            user = new userModel({ name, email, loginType });
            await user.save();
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Encode OTP (hashing for security)
        const encodedOtp = crypto.createHash("sha256").update(otp).digest("hex");

        // Store encoded OTP in DB with email
        await otpModel.create({ email, encodedOtp });

        // Set up nodemailer transporter (replace with your SMTP credentials)
        const transporter = nodemailer.createTransport({
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
        await transporter.sendMail(mailOptions);

        // Optionally, you can store the OTP in DB or cache with expiry for verification

        res.status(200).json({ msg: "OTP sent successfully" });

    } catch (error) {
        res.status(500).json({ msg: "Error sending OTP", error });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ msg: "Email and OTP are required" });
    }
    try {
        const encodedOtp = crypto.createHash("sha256").update(otp).digest("hex");
        const otpDoc = await otpModel.findOne({ email, encodedOtp });
        if (!otpDoc) {
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        }
        // Optionally, delete OTP after successful verification
        await otpModel.deleteOne({ _id: otpDoc._id });

        const userData = await userModel.findOne({ email });
        const accessToken = jwt.sign({ userID: userData?._id }, process.env.JWT_SECRET || "DRIVE_FOLDER_SECRET", { expiresIn: "7d" });
        const refreshToken = jwt.sign({ userID: userData?._id }, process.env.JWT_SECRET || "DRIVE_FOLDER_SECRET", { expiresIn: "1y" })
        return res.status(200).json({ msg: "OTP verified successfully", accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json({ msg: "Error verifying OTP", error });
    }
};


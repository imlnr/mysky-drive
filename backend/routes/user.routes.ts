import express from "express";
import { googleLogin, sendOtp, verifyOtp } from "../controllers/user.controllers";

const userRouter = express.Router();


userRouter.post("/send-otp", sendOtp as any);

userRouter.post("/verify-otp", verifyOtp as any);
userRouter.post("/google-login", googleLogin as any);

export default userRouter;

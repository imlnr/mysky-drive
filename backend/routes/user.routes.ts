import express from "express";
import { getUser, googleLogin, sendOtp, verifyOtp } from "../controllers/user.controllers";
import { auth } from "../middlewares/auth.middleware";

const userRouter = express.Router();


userRouter.post("/send-otp", sendOtp as any);

userRouter.post("/verify-otp", verifyOtp as any);
userRouter.post("/google-login", googleLogin as any);
userRouter.get("/get-user", auth as any, getUser as any);

export default userRouter;

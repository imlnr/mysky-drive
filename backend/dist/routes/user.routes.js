"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const userRouter = express_1.default.Router();
userRouter.post("/send-otp", user_controllers_1.sendOtp);
userRouter.post("/verify-otp", user_controllers_1.verifyOtp);
exports.default = userRouter;

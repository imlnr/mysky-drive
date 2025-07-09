import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { config as configDotenv } from "dotenv";

configDotenv(); // Load .env

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;
        // console.log("Auth Header:", authHeader);

        if (!authHeader) {
            return res.status(401).json({ message: "No authorization header provided" });
        }

        // Check if the header starts with 'Bearer '
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Invalid token format. Use 'Bearer <token>'" });
        }

        // Extract the token
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify the token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
        if (!decoded || !decoded.userID) {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        // Initialize req.body if it doesn't exist
        if (!req.body) {
            req.body = {};
        }

        // Add userID to request body
        req.body.userID = decoded.userID;
        // console.log("Decoded userID:", decoded.userID);
        next();
    } catch (error: any) {
        console.error('Auth Error:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
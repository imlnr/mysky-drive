import express from "express";
import {
    shareItem,
    createPublicLink,
    getSharedWithMe,
    getSharedByMe,
    accessPublicLink,
    updateSharePermissions,
    removeShare,
    getShareDetails
} from "../controllers/share.controllers";
import { auth } from "../middlewares/auth.middleware";

const shareRouter = express.Router();

// Share a file or folder with a specific user
shareRouter.post("/share", auth as any, shareItem as any);

// Create a public link for sharing
shareRouter.post("/public-link", auth as any, createPublicLink as any);

// Get items shared with the current user
shareRouter.get("/shared-with-me", auth as any, getSharedWithMe as any);

// Get items shared by the current user
shareRouter.get("/shared-by-me", auth as any, getSharedByMe as any);

// Access shared item via public link (no auth required for this route)
shareRouter.post("/access/:publicLink", accessPublicLink as any);

// Update share permissions
shareRouter.put("/permissions/:shareId", auth as any, updateSharePermissions as any);

// Remove share (revoke access)
shareRouter.delete("/remove/:shareId", auth as any, removeShare as any);

// Get share details
shareRouter.get("/details/:shareId", auth as any, getShareDetails as any);

export default shareRouter; 
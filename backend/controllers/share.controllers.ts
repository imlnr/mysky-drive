import { Request, Response } from "express";
import shareModel from "../models/share.models";
import fileModel from "../models/file.models";
import folderModel from "../models/folder.models";
import userModel from "../models/user.models";
import mongoose from "mongoose";

// Share a file or folder with a specific user
export const shareItem = async (req: Request, res: Response) => {
    try {
        const { itemId, itemType, sharedWithEmail, permissions } = req.body;
        const sharedBy = req.body.userID;

        if (!itemId || !itemType || !sharedWithEmail) {
            return res.status(400).json({
                msg: "itemId, itemType, and sharedWithEmail are required"
            });
        }

        // Validate item type
        if (!["file", "folder"].includes(itemType)) {
            return res.status(400).json({
                msg: "itemType must be either 'file' or 'folder'"
            });
        }

        // Check if the item exists and belongs to the user
        let item;
        if (itemType === "file") {
            item = await fileModel.findOne({ _id: itemId, owner: sharedBy });
        } else {
            item = await folderModel.findOne({ _id: itemId, owner: sharedBy });
        }

        if (!item) {
            return res.status(404).json({
                msg: `${itemType} not found or you don't have permission to share it`
            });
        }

        // Find the user to share with
        const sharedWithUser = await userModel.findOne({ email: sharedWithEmail });
        if (!sharedWithUser) {
            return res.status(404).json({
                msg: "User not found with the provided email"
            });
        }

        // Check if already shared
        const existingShare = await shareModel.findOne({
            itemId,
            itemType,
            sharedWith: sharedWithUser._id,
            isActive: true
        });

        if (existingShare) {
            return res.status(400).json({
                msg: "Item is already shared with this user"
            });
        }

        // Create share record
        const shareData = {
            itemId,
            itemType,
            sharedBy,
            sharedWith: sharedWithUser._id,
            permissions: {
                read: permissions?.read ?? true,
                write: permissions?.write ?? false,
                delete: permissions?.delete ?? false,
                share: permissions?.share ?? false
            }
        };

        const share = new shareModel(shareData);
        await share.save();

        res.status(201).json({
            msg: `${itemType} shared successfully`,
            share
        });

    } catch (error: any) {
        console.error("Error sharing item:", error);
        res.status(500).json({
            msg: "Error sharing item",
            error: error.message
        });
    }
};

// Create a public link for sharing
export const createPublicLink = async (req: Request, res: Response) => {
    try {
        const { itemId, itemType, password, expiresAt } = req.body;
        const sharedBy = req.body.userID;

        if (!itemId || !itemType) {
            return res.status(400).json({
                msg: "itemId and itemType are required"
            });
        }

        // Check if the item exists and belongs to the user
        let item;
        if (itemType === "file") {
            item = await fileModel.findOne({ _id: itemId, owner: sharedBy });
        } else {
            item = await folderModel.findOne({ _id: itemId, owner: sharedBy });
        }

        if (!item) {
            return res.status(404).json({
                msg: `${itemType} not found or you don't have permission to share it`
            });
        }

        // Generate unique public link
        const publicLink = `${itemType}-${itemId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Create or update share record
        const shareData = {
            itemId,
            itemType,
            sharedBy,
            sharedWith: null, // Public link, no specific user
            permissions: {
                read: true,
                write: false,
                delete: false,
                share: false
            },
            isPublic: true,
            publicLink,
            linkPassword: password || null,
            expiresAt: expiresAt ? new Date(expiresAt) : null
        };

        // Check if public link already exists
        let share = await shareModel.findOne({
            itemId,
            itemType,
            sharedBy,
            isPublic: true,
            isActive: true
        });

        if (share) {
            // Update existing public link
            share.publicLink = publicLink;
            share.linkPassword = password || null;
            share.expiresAt = expiresAt ? new Date(expiresAt) : null;
            await share.save();
        } else {
            // Create new public link
            share = new shareModel(shareData);
            await share.save();
        }

        res.status(201).json({
            msg: "Public link created successfully",
            share,
            publicLink: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/shared/${publicLink}`
        });

    } catch (error: any) {
        console.error("Error creating public link:", error);
        res.status(500).json({
            msg: "Error creating public link",
            error: error.message
        });
    }
};

// Get items shared with the current user
export const getSharedWithMe = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userID;

        const shares = await shareModel.find({
            sharedWith: userId,
            isActive: true
        }).populate('sharedBy', 'name email avatar')
            .populate('itemId')
            .sort({ createdAt: -1 });

        // Group by item type
        const sharedFiles = shares.filter(share => share.itemType === "file");
        const sharedFolders = shares.filter(share => share.itemType === "folder");

        res.status(200).json({
            msg: "Shared items fetched successfully",
            sharedFiles,
            sharedFolders
        });

    } catch (error: any) {
        console.error("Error fetching shared items:", error);
        res.status(500).json({
            msg: "Error fetching shared items",
            error: error.message
        });
    }
};

// Get items shared by the current user
export const getSharedByMe = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userID;

        const shares = await shareModel.find({
            sharedBy: userId,
            isActive: true
        }).populate('sharedWith', 'name email avatar')
            .populate('itemId')
            .sort({ createdAt: -1 });

        // Group by item type
        const sharedFiles = shares.filter(share => share.itemType === "file");
        const sharedFolders = shares.filter(share => share.itemType === "folder");

        res.status(200).json({
            msg: "Shared items fetched successfully",
            sharedFiles,
            sharedFolders
        });

    } catch (error: any) {
        console.error("Error fetching shared items:", error);
        res.status(500).json({
            msg: "Error fetching shared items",
            error: error.message
        });
    }
};

// Access shared item via public link
export const accessPublicLink = async (req: Request, res: Response) => {
    try {
        const { publicLink } = req.params;
        const { password } = req.body;

        const share = await shareModel.findOne({
            publicLink,
            isPublic: true,
            isActive: true
        }).populate('itemId')
            .populate('sharedBy', 'name email avatar');

        if (!share) {
            return res.status(404).json({
                msg: "Public link not found or expired"
            });
        }

        // Check if link has expired
        if (share.expiresAt && new Date() > share.expiresAt) {
            return res.status(410).json({
                msg: "Public link has expired"
            });
        }

        // Check password if required
        if (share.linkPassword && share.linkPassword !== password) {
            return res.status(401).json({
                msg: "Incorrect password"
            });
        }

        res.status(200).json({
            msg: "Public link accessed successfully",
            share
        });

    } catch (error: any) {
        console.error("Error accessing public link:", error);
        res.status(500).json({
            msg: "Error accessing public link",
            error: error.message
        });
    }
};

// Update share permissions
export const updateSharePermissions = async (req: Request, res: Response) => {
    try {
        const { shareId } = req.params;
        const { permissions, expiresAt } = req.body;
        const userId = req.body.userID;

        const share = await shareModel.findOne({
            _id: shareId,
            sharedBy: userId,
            isActive: true
        });

        if (!share) {
            return res.status(404).json({
                msg: "Share not found or you don't have permission to modify it"
            });
        }

        // Update permissions
        if (permissions) {
            share.permissions = { ...share.permissions, ...permissions };
        }

        // Update expiration
        if (expiresAt !== undefined) {
            share.expiresAt = expiresAt ? new Date(expiresAt) : null;
        }

        await share.save();

        res.status(200).json({
            msg: "Share permissions updated successfully",
            share
        });

    } catch (error: any) {
        console.error("Error updating share permissions:", error);
        res.status(500).json({
            msg: "Error updating share permissions",
            error: error.message
        });
    }
};

// Remove share (revoke access)
export const removeShare = async (req: Request, res: Response) => {
    try {
        const { shareId } = req.params;
        const userId = req.body.userID;

        const share = await shareModel.findOne({
            _id: shareId,
            sharedBy: userId,
            isActive: true
        });

        if (!share) {
            return res.status(404).json({
                msg: "Share not found or you don't have permission to remove it"
            });
        }

        share.isActive = false;
        await share.save();

        res.status(200).json({
            msg: "Share removed successfully"
        });

    } catch (error: any) {
        console.error("Error removing share:", error);
        res.status(500).json({
            msg: "Error removing share",
            error: error.message
        });
    }
};

// Get share details
export const getShareDetails = async (req: Request, res: Response) => {
    try {
        const { shareId } = req.params;
        const userId = req.body.userID;

        const share = await shareModel.findOne({
            _id: shareId,
            $or: [
                { sharedBy: userId },
                { sharedWith: userId }
            ],
            isActive: true
        }).populate('sharedBy', 'name email avatar')
            .populate('sharedWith', 'name email avatar')
            .populate('itemId');

        if (!share) {
            return res.status(404).json({
                msg: "Share not found"
            });
        }

        res.status(200).json({
            msg: "Share details fetched successfully",
            share
        });

    } catch (error: any) {
        console.error("Error fetching share details:", error);
        res.status(500).json({
            msg: "Error fetching share details",
            error: error.message
        });
    }
}; 
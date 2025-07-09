import { Request, Response } from "express";
import fileModel from "../models/file.models";

export const addFilesToFolder = async (req: Request, res: Response) => {
    try {
        const files = req.body; // Array of file objects from JSON
        const folderId = req.params.folderId;
        const userId = req.body.userID; // From auth middleware

        if (!Array.isArray(files)) {
            return res.status(400).json({ msg: "Files must be an array" });
        }

        if (!folderId) {
            return res.status(400).json({ msg: "Folder ID is required" });
        }

        if (!userId) {
            return res.status(401).json({ msg: "User not authenticated" });
        }

        // Transform the files data to match the file model schema
        const filesToInsert = files.map(file => ({
            name: file.fileName,
            owner: userId, // This will be converted to ObjectId by Mongoose
            folderId: folderId, // This will be converted to ObjectId by Mongoose
            size: file.fileSize,
            type: file.fileType,
            url: file.url,
            imagekitFileId: file.imagekitFileId,
            isPublic: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        // Use insertMany to create multiple files
        const createdFiles = await fileModel.insertMany(filesToInsert);

        res.status(201).json({
            msg: "Files added to folder successfully",
            files: createdFiles,
            count: createdFiles.length
        });

    } catch (error: any) {
        console.error("Error adding files to folder:", error);
        res.status(500).json({ msg: "Error adding files to folder", error: error.message });
    }
}

export const getFiles = async (req: Request, res: Response) => {
    const userId = req.body.userID;
    try {
        const folderId = req.params.folderId;
        const files = await fileModel.find({ folderId: folderId, owner: userId });
        res.status(200).json({ files });
    } catch (error: any) {
        console.error("Error getting files:", error);
        res.status(500).json({ msg: "Error getting files", error: error.message });
    }
}
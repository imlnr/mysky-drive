import { getAccessibleFiles } from "../utils/permission.utils";
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
        const files = await getAccessibleFiles(userId, folderId);
        res.status(200).json({ files });
    } catch (error: any) {
        console.error("Error getting files:", error);
        res.status(500).json({ msg: "Error getting files", error: error.message });
    }
}
import { checkFileAccess } from "../utils/permission.utils";

export const deleteFile = async (req: Request, res: Response) => {
    const { fileIds } = req.body; // Expecting an array of file IDs in the request body
    const userId = req.body.userID;

    if (!Array.isArray(fileIds) || fileIds.length === 0) {
        return res.status(400).json({ msg: "fileIds array is required in the request body" });
    }

    try {
        let deletedCount = 0;

        for (const fileId of fileIds) {
            const access = await checkFileAccess(fileId, userId, 'delete');
            if (access.hasAccess) {
                await fileModel.findByIdAndDelete(fileId);
                deletedCount++;
            }
        }

        res.status(200).json({
            msg: "Files deleted successfully",
            deletedCount
        });
    } catch (error: any) {
        console.error("Error deleting files:", error);
        res.status(500).json({ msg: "Error deleting files", error: error.message });
    }
}

export const updateFile = async (req: Request, res: Response) => {
    try {
        const fileId = req.params.fileId;
        const { name, description, isPublic } = req.body;
        const userId = req.body.userID;

        const access = await checkFileAccess(fileId, userId, 'write');
        if (!access.hasAccess) {
            return res.status(403).json({ msg: "You don't have permission to update this file" });
        }

        const file = await fileModel.findByIdAndUpdate(fileId, { name, description, isPublic }, { new: true });
        res.status(200).json({ file });
    } catch (error: any) {
        console.error("Error updating file:", error);
        res.status(500).json({ msg: "Error updating file", error: error.message });
    }
}
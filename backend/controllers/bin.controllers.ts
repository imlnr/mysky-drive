import { Request, Response } from "express";
import fileModel from "../models/file.models";
import folderModel from "../models/folder.models"; // Assuming you have a folder model

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const folders: string[] = req.body;
        const files: string[] = req.body;

        if (!Array.isArray(folders) || !Array.isArray(files)) {
            return res.status(400).json({ message: "Invalid input format. Expected an array." });
        }

        const fileUpdatePromise = files.length
            ? fileModel.updateMany(
                { _id: { $in: files } },
                { $set: { isDeleted: true, deletedAt: new Date() } }
            )
            : Promise.resolve();

        const folderUpdatePromise = folders.length && folderModel
            ? folderModel.updateMany(
                { _id: { $in: folders } },
                { $set: { isDeleted: true, deletedAt: new Date() } }
            )
            : Promise.resolve();

        await Promise.all([fileUpdatePromise, folderUpdatePromise]);

        return res.status(200).json({ message: "Items soft deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}


export const restoreItem = async (req: Request, res: Response) => {
    try {
        const folders: string[] = req.body;
        const files: string[] = req.body;

        if (!Array.isArray(folders) || !Array.isArray(files)) {
            return res.status(400).json({ message: "Invalid input format. Expected an array." });
        }


        const fileUpdatePromise = files.length
            ? fileModel.updateMany(
                { _id: { $in: files } },
                { $set: { isDeleted: false, deletedAt: null } }
            )
            : Promise.resolve();

        const folderUpdatePromise = folders.length && folderModel
            ? folderModel.updateMany(
                { _id: { $in: folders } },
                { $set: { isDeleted: false, deletedAt: null } }
            )
            : Promise.resolve();

        await Promise.all([fileUpdatePromise, folderUpdatePromise]);

        return res.status(200).json({ message: "Items restored successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const getTrashedItems = async (req: Request, res: Response) => {
    const userId = req.body.userID;

    try {
        const [trashedFiles, trashedFolders] = await Promise.all([
            fileModel.find({ owner: userId, isDeleted: true }),
            folderModel.find({ owner: userId, isDeleted: true }),
        ]);

        res.status(200).json({
            trashedFiles: [...trashedFiles, trashedFolders]
        });
    } catch (err) {
        console.error("Error fetching trash:", err);
        res.status(500).json({ error: "Failed to fetch trash items" });
    }
};
import { Request, Response } from "express";
import folderModel from "../models/folder.models";

export const createFolder = async (req: Request, res: Response) => {
    const { name, userID } = req.body;
    try {
        const folder = new folderModel({ name, owner: userID });
        await folder.save();
        res.status(200).json({ msg: "Folder created successfully", folder });
    } catch (error) {
        res.status(500).json({ msg: "Error creating folder", error });
    }
}

export const getAllFolders = async (req: Request, res: Response) => {
    const { userID } = req.body;
    try {
        // Find all folders where the user ID equals the owner
        const folders = await folderModel.find({ owner: userID });
        res.status(200).json({ msg: "Folders fetched successfully", folders });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching folders", error });
    }
}
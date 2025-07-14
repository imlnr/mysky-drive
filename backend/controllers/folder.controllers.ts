import { getAccessibleFolders } from "../utils/permission.utils";
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
        // Get all accessible folders (owned + shared)
        const folders = await getAccessibleFolders(userID);
        res.status(200).json({ msg: "Folders fetched successfully", folders });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching folders", error });
    }
}

export const updateFolder = async (req: Request, res: Response) => {
    const updateData = req.body;
    const { folderID } = req.params;
    const userId = req.body.userID;

    try {
        const access = await checkFolderAccess(folderID, userId, 'write');
        if (!access.hasAccess) {
            return res.status(403).json({ msg: "You don't have permission to update this folder" });
        }

        const folder = await folderModel.findByIdAndUpdate(folderID, updateData, { new: true });
        res.status(200).json({ msg: "Folder updated successfully", folder });
    } catch (error) {
        res.status(500).json({ msg: "Error updating folder", error });
    }
}

import { checkFolderAccess } from "../utils/permission.utils";

export const deleteFolder = async (req: Request, res: Response) => {
    const { folderID } = req.params;
    const userId = req.body.userID;

    try {
        const access = await checkFolderAccess(folderID, userId, 'delete');
        if (!access.hasAccess) {
            return res.status(403).json({ msg: "You don't have permission to delete this folder" });
        }

        await folderModel.findByIdAndDelete(folderID);
        res.status(200).json({ msg: "Folder deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting folder", error });
    }
}
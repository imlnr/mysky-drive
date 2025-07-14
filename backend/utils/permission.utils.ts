import fileModel from "../models/file.models";
import folderModel from "../models/folder.models";
import shareModel from "../models/share.models";
import mongoose from "mongoose";

// Check if user has access to a file (owner or shared)
export const checkFileAccess = async (fileId: string, userId: string, permission: 'read' | 'write' | 'delete' = 'read') => {
    try {
        // Check if user is the owner
        const file = await fileModel.findOne({ _id: fileId, owner: userId });
        if (file) {
            return { hasAccess: true, isOwner: true, file };
        }

        // Check if file is shared with user
        const share = await shareModel.findOne({
            itemId: fileId,
            itemType: 'file',
            sharedWith: userId,
            isActive: true,
            [`permissions.${permission}`]: true
        });

        if (share) {
            const file = await fileModel.findById(fileId);
            return { hasAccess: true, isOwner: false, file, share };
        }

        return { hasAccess: false, isOwner: false };
    } catch (error) {
        console.error('Error checking file access:', error);
        return { hasAccess: false, isOwner: false };
    }
};

// Check if user has access to a folder (owner or shared)
export const checkFolderAccess = async (folderId: string, userId: string, permission: 'read' | 'write' | 'delete' = 'read') => {
    try {
        // Check if user is the owner
        const folder = await folderModel.findOne({ _id: folderId, owner: userId });
        if (folder) {
            return { hasAccess: true, isOwner: true, folder };
        }

        // Check if folder is shared with user
        const share = await shareModel.findOne({
            itemId: folderId,
            itemType: 'folder',
            sharedWith: userId,
            isActive: true,
            [`permissions.${permission}`]: true
        });

        if (share) {
            const folder = await folderModel.findById(folderId);
            return { hasAccess: true, isOwner: false, folder, share };
        }

        return { hasAccess: false, isOwner: false };
    } catch (error) {
        console.error('Error checking folder access:', error);
        return { hasAccess: false, isOwner: false };
    }
};

// Get all files accessible to user (owned + shared)
export const getAccessibleFiles = async (userId: string, folderId?: string) => {
    try {
        const query: any = {};

        if (folderId) {
            query.folderId = folderId;
        }

        // Get owned files
        const ownedFiles = await fileModel.find({ ...query, owner: userId, isDeleted: false });

        // Get shared files
        const sharedShares = await shareModel.find({
            itemType: 'file',
            sharedWith: userId,
            isActive: true,
            'permissions.read': true
        });

        // Get the actual file objects
        const sharedFileIds = sharedShares.map(share => share.itemId);
        const sharedFiles = await fileModel.find({
            _id: { $in: sharedFileIds }
        });

        const filteredSharedFiles = sharedFiles.filter(file =>
            !folderId || file.folderId?.toString() === folderId
        );

        return [...ownedFiles, ...filteredSharedFiles];
    } catch (error) {
        console.error('Error getting accessible files:', error);
        return [];
    }
};

// Get all folders accessible to user (owned + shared)
export const getAccessibleFolders = async (userId: string, parentFolder?: string) => {
    try {
        const query: any = {};

        if (parentFolder) {
            query.parentFolder = parentFolder;
        } else {
            query.parentFolder = null; // Root folders
        }

        // Get owned folders
        const ownedFolders = await folderModel.find({ ...query, owner: userId, isDeleted: false });

        // Get shared folders
        const sharedShares = await shareModel.find({
            itemType: 'folder',
            sharedWith: userId,
            isActive: true,
            'permissions.read': true
        });

        // Get the actual folder objects
        const sharedFolderIds = sharedShares.map(share => share.itemId);
        const sharedFolders = await folderModel.find({
            _id: { $in: sharedFolderIds }
        });

        const filteredSharedFolders = sharedFolders.filter(folder =>
            !parentFolder || folder.parentFolder?.toString() === parentFolder
        );

        return [...ownedFolders, ...filteredSharedFolders];
    } catch (error) {
        console.error('Error getting accessible folders:', error);
        return [];
    }
}; 
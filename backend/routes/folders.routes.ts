import express from "express"
import { createFolder, deleteFolder, getAllFolders, updateFolder } from "../controllers/folder.controllers";
import { auth } from "../middlewares/auth.middleware";

export const folderRouter = express.Router();

folderRouter.post("/create-folder", auth as any, createFolder as any);
folderRouter.get("/get-all-folders", auth as any, getAllFolders as any);
folderRouter.put("/update-folder/:folderID", auth as any, updateFolder as any);
folderRouter.delete("/delete-folder/:folderID", auth as any, deleteFolder as any);

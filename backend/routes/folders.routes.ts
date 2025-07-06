import express from "express"
import { createFolder, getAllFolders } from "../controllers/folder.controllers";
import { auth } from "../middlewares/auth.middleware";

export const folderRouter = express.Router();

folderRouter.post("/create-folder", auth as any, createFolder as any);
folderRouter.get("/get-all-folders", auth as any, getAllFolders as any);

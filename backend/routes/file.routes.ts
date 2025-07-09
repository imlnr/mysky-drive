import { auth } from "../middlewares/auth.middleware";
import express from "express";
import { addFilesToFolder, getFiles } from "../controllers/file.controllers";

const fileRouter = express.Router();

fileRouter.post("/add-files/:folderId", auth as any, addFilesToFolder as any);
fileRouter.get("/get-files/:folderId", auth as any, getFiles as any);

export default fileRouter;

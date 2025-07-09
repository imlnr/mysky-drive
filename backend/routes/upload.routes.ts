import express from "express";
import { config as configDotenv } from "dotenv";
import multer from "multer";
import { uploadFilesController } from "../controllers/upload.controllers";
import { auth } from "../middlewares/auth.middleware";
configDotenv();

const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Accept multiple files, field name: 'files'
// Add auth middleware to protect the upload route
uploadRouter.post('/upload-files', auth as any, upload.array('files', 10), uploadFilesController);

export default uploadRouter;
import ImageKit from "imagekit";
import { Request, Response } from "express";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || ""
});

// Allowed mime types: images and pdfs
const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "application/pdf"
];

export const uploadFilesController = async (req: Request, res: Response): Promise<void> => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
        res.status(400).json({ error: "No files uploaded." });
        return;
    }

    // Filter files by allowed mime types
    const filteredFiles = files.filter(file => allowedMimeTypes.includes(file.mimetype));
    if (filteredFiles.length === 0) {
        res.status(400).json({ error: "No valid files uploaded. Only images and PDFs are allowed." });
        return;
    }

    try {
        const uploadResults = await Promise.all(
            filteredFiles.map(file =>
                imagekit.upload({
                    file: file.buffer,
                    fileName: file.originalname
                })
            )
        );

        // Return array of uploaded file information including metadata
        const fileResults = uploadResults.map((result, index) => ({
            url: result.url,
            fileName: filteredFiles[index].originalname,
            fileType: filteredFiles[index].mimetype,
            fileSize: filteredFiles[index].size,
            imagekitFileId: result.fileId
        }));

        res.status(200).json({ files: fileResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to upload files." });
    }
};

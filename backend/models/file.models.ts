import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { versionKey: false });

const fileModel = mongoose.model("File", fileSchema);

export default fileModel;
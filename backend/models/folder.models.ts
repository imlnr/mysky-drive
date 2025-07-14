import mongoose from "mongoose";

const folerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    updatedAt: { type: Date, default: Date.now },
    parentFolder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
    folderColor: { type: String, default: "muted-foreground" },
},
    { versionKey: false }
);
const folderModel = mongoose.model("Folder", folerSchema);

export default folderModel;
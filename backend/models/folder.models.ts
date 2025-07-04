import mongoose from "mongoose";

const folerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    createdAt: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
    { versionKey: false }
);
const folderModel = mongoose.model("Folder", folerSchema);

export default folderModel;
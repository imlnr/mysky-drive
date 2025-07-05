"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const folerSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    createdAt: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { versionKey: false });
const folderModel = mongoose_1.default.model("Folder", folerSchema);
exports.default = folderModel;

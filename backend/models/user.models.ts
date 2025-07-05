import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    oAuthId: { type: String, default: null },
    loginType: { type: String, enum: ["email", "google"], required: true },
},
    { versionKey: false }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
    // The item being shared (file or folder)
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    itemType: { type: String, enum: ["file", "folder"], required: true },

    // Who is sharing the item
    sharedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Who the item is shared with
    sharedWith: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Permissions for the shared item
    permissions: {
        read: { type: Boolean, default: true },
        write: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        share: { type: Boolean, default: false }
    },

    // Share settings
    isPublic: { type: Boolean, default: false },
    publicLink: { type: String, default: null },
    linkPassword: { type: String, default: null },

    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: null, required: false },

    // Status
    isActive: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: true
});

// Indexes for better query performance
shareSchema.index({ itemId: 1, itemType: 1 });
shareSchema.index({ sharedWith: 1 });
shareSchema.index({ sharedBy: 1 });
shareSchema.index({ publicLink: 1 });

const shareModel = mongoose.model("Share", shareSchema);

export default shareModel; 
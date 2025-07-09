import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar";
import { Folder, Plus, Upload } from "lucide-react";
import { AddFolder } from "./AddFolder";
import { Dialog } from "@/components/ui/dialog"
import { uploadFiles } from "@/redux/AppReducer/action";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

export const UploadDropdown = () => {
    const { state } = useSidebar();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { id: folderId } = useParams<{ id: string }>();

    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
    };

    const handleUploadClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // If we're not in a specific folder, show error
        if (!folderId) {
            toast.error("Please navigate to a folder first to upload files");
            return;
        }

        // Trigger file input
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        if (!folderId) {
            toast.error("Please navigate to a folder first to upload files");
            return;
        }

        // Validate file sizes (10MB limit per file)
        const maxSize = 10 * 1024 * 1024; // 10MB
        const oversizedFiles = Array.from(files).filter(file => file.size > maxSize);

        if (oversizedFiles.length > 0) {
            toast.error(`Files larger than 10MB are not allowed: ${oversizedFiles.map(f => f.name).join(', ')}`);
            return;
        }

        setIsUploading(true);
        try {
            const fileArray = Array.from(files);
            await dispatch(uploadFiles(fileArray, folderId) as any);
            toast.success(`Successfully uploaded ${fileArray.length} file(s)`);

            // Clear the input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error: any) {
            console.error("Upload failed:", error);
            toast.error(error?.error || "Failed to upload files");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {state === "expanded" ? (
                        <Button className="w-fit m-2 flex">
                            <Plus /> New
                        </Button>
                    ) : (
                        <Button size="icon" className="w-fit m-2 aspect-square grid place-items-center">
                            <Plus />
                        </Button>
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuLabel> Upload Files</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="flex items-center" onClick={handleOpen}>
                            <Folder />
                            New Folder
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleUploadClick}
                            disabled={isUploading}
                            className="flex items-center"
                        >
                            <Upload />
                            {isUploading ? "Uploading..." : "Upload File"}
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            More...
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept="*/*"
                aria-label="Upload files"
            />

            <Dialog open={open} onOpenChange={setOpen}>
                {open && <AddFolder onClose={() => setOpen(false)} />}
            </Dialog>
        </>
    )
}

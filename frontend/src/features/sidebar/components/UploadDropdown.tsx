import React, { useState } from "react"
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
import { FileIcon, Folder, Plus } from "lucide-react";
import { AddFolder } from "./AddFolder";
import { Dialog } from "@/components/ui/dialog"

export const UploadDropdown = () => {
    const { state } = useSidebar();
    const [open, setOpen] = useState(false);

    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
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
                        <DropdownMenuItem>
                            <FileIcon />
                            Upload File
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            More...
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={open} onOpenChange={setOpen}>
                {open && <AddFolder onClose={() => setOpen(false)} />}
            </Dialog>
        </>
    )
}

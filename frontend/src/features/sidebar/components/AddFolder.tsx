import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createFolder } from "@/redux/AppReducer/action"
import { useState } from "react"
import { useDispatch } from "react-redux"

export const AddFolder = ({ onClose }: { onClose: () => void }) => {
    const dispatch = useDispatch();
    const [folderName, setFolderName] = useState("");
    const handleCreateFolder = async () => {
        await dispatch(createFolder(folderName) as any);
        onClose();
    }
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create a Folder</DialogTitle>
                {/* <DialogDescription>
                    Make changes to your pr ofile here. Click save when you&apos;re done.
                </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                    <Label htmlFor="name-1">New Folder</Label>
                    <Input id="name-1" name="name" defaultValue="New Folder" value={folderName} onChange={(e) => setFolderName(e.target.value)} />
                </div>
            </div>
            <DialogFooter>
                <DialogClose >
                    <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={handleCreateFolder}>Create</Button>
            </DialogFooter>
        </DialogContent>
    )
}

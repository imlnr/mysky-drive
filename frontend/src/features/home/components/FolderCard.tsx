import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuLabel,
    ContextMenuSub,
    ContextMenuSubTrigger,
    ContextMenuSubContent,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
} from '@/components/ui/context-menu';
import { useNavigate } from 'react-router-dom';
import { FolderIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteFolder, updateFolder } from '@/redux/AppReducer/action';
import type { Folder } from '@/lib/types';
import { useState } from 'react';

const FOLDER_COLORS = [
    { name: 'Indigo', class: 'bg-indigo-500' },
    { name: 'Orange', class: 'bg-orange-500' },
    { name: 'Green', class: 'bg-green-500' },
    { name: 'Red', class: 'bg-red-500' },
    { name: 'Yellow', class: 'bg-yellow-400' },
    { name: 'Blue', class: 'bg-blue-500' },
    { name: 'Purple', class: 'bg-purple-500' },
    { name: 'Gray', class: 'bg-gray-500' },
];

// Map to hold full tailwind classes for each color
const COLOR_MAP: Record<string, string> = {
    'bg-indigo-500': 'border-indigo-500 fill-indigo-500 stroke-indigo-500',
    'bg-orange-500': 'border-orange-500 fill-orange-500 stroke-orange-500',
    'bg-green-500': 'border-green-500 fill-green-500 stroke-green-500',
    'bg-red-500': 'border-red-500 fill-red-500 stroke-red-500',
    'bg-yellow-400': 'border-yellow-400 fill-yellow-400 stroke-yellow-400',
    'bg-blue-500': 'border-blue-500 fill-blue-500 stroke-blue-500',
    'bg-purple-500': 'border-purple-500 fill-purple-500 stroke-purple-500',
    'bg-gray-500': 'border-gray-500 fill-gray-500 stroke-gray-500',
};

const FolderCard = ({ folder }: { folder: Folder }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(folder.name);
    const [selectedColor, setSelectedColor] = useState(folder.folderColor || 'indigo-500');

    const colorClasses = COLOR_MAP[selectedColor] || COLOR_MAP['indigo-500'];

    const handleDelete = async () => {
        await dispatch(deleteFolder(folder._id) as any);
    };

    const handleUpdate = async (updatedFields: Partial<Folder>) => {
        await dispatch(updateFolder({ ...folder, ...updatedFields }) as any);
    };

    const handleRenameClick = () => setIsRenaming(true);

    const handleRenameSave = async () => {
        setIsRenaming(false);
        if (newName.trim() && newName !== folder.name) {
            await handleUpdate({ name: newName });
        }
    };

    const handleRenameCancel = () => {
        setIsRenaming(false);
        setNewName(folder.name);
    };

    const handleColorChange = async (colorClass: string) => {
        setSelectedColor(colorClass);
        await handleUpdate({ folderColor: colorClass });
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div
                    className={`aspect-square w-full flex flex-col items-center justify-center bg-card rounded-lg shadow-sm p-4 cursor-pointer transition hover:shadow-md hover:bg-accent select-none `}
                    tabIndex={0}
                    onClick={() => navigate(`/mydrive/${folder._id}`)}
                >
                    <FolderIcon className={`w-5/5 h-full stroke-1 mb-2 ${colorClasses}`} />
                    {isRenaming ? (
                        <div className="flex items-center w-full gap-2">
                            <input
                                className="text-base font-medium text-center truncate w-full border rounded px-1 py-0.5"
                                value={newName}
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => setNewName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleRenameSave();
                                    if (e.key === 'Escape') handleRenameCancel();
                                }}
                                placeholder="Rename folder"
                                aria-label="Rename folder"
                            />
                            <button
                                className="text-green-600 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRenameSave();
                                }}
                                title="Save"
                            >
                                ✓
                            </button>
                            <button
                                className="text-red-600 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRenameCancel();
                                }}
                                title="Cancel"
                            >
                                ✗
                            </button>
                        </div>
                    ) : (
                        <h1 className="text-base font-medium text-center truncate w-full" title={folder.name}>
                            {folder.name}
                        </h1>
                    )}
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuLabel>Folder Actions</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => navigate(`/mydrive/${folder._id}`)}>Open</ContextMenuItem>
                <ContextMenuItem onClick={handleRenameClick}>Rename</ContextMenuItem>
                <ContextMenuItem onClick={handleDelete} variant="destructive">Delete</ContextMenuItem>
                <ContextMenuItem onClick={() => { }}>Download</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => alert(`Share ${folder.name}`)}>Share</ContextMenuItem>

                <ContextMenuSub>
                    <ContextMenuSubTrigger>Change Color</ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        <ContextMenuRadioGroup value={selectedColor}>
                            {FOLDER_COLORS.map((color) => (
                                <ContextMenuRadioItem
                                    key={color.class}
                                    value={color.class}
                                    onClick={() => handleColorChange(color.class)}
                                >
                                    <span
                                        className={`inline-block w-4 h-4 rounded-full mr-2 align-middle border ${color.class}`}
                                        title={`Select color ${color.name}`}
                                    />
                                    {color.name}
                                </ContextMenuRadioItem>
                            ))}
                        </ContextMenuRadioGroup>
                    </ContextMenuSubContent>
                </ContextMenuSub>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default FolderCard;

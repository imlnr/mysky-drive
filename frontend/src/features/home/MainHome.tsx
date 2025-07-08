import type { AppState } from '@/lib/types'
import { getAllFolders } from '@/redux/AppReducer/action';
import { FolderIcon } from 'lucide-react';
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton } from '@/components/ui/skeleton';
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuLabel,
} from '@/components/ui/context-menu';
import { useNavigate } from 'react-router-dom';

const SKELETON_COUNT = 8;

const FolderCard = ({ folder }: { folder: any }) => {
    const navigate = useNavigate();
    return <ContextMenu>
        <ContextMenuTrigger asChild>
            <div
                className="aspect-square w-full flex flex-col items-center justify-center bg-card rounded-lg shadow-sm p-4 cursor-pointer transition hover:shadow-md hover:bg-accent select-none"
                tabIndex={0}
                onClick={() => navigate(`/mydrive/${folder._id}`)}
            >
                <FolderIcon className="size-32  stroke-1 fill-muted-foreground stroke-muted-foreground mb-2" />
                <h1 className="text-base font-medium text-center truncate w-full" title={folder.name}>{folder.name}</h1>
            </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuLabel>Folder Actions</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => alert(`Open ${folder.name}`)}>Open </ContextMenuItem>
            <ContextMenuItem onClick={() => alert(`Rename ${folder.name}`)}>Rename</ContextMenuItem>
            <ContextMenuItem onClick={() => alert(`Delete ${folder.name}`)} variant="destructive">Delete</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => alert(`Share ${folder.name}`)}>Share</ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>
};

const MainHome = () => {
    const dispatch = useDispatch();
    const folders = useSelector((state: AppState) => state.folders)
    const loading = !folders || folders.length === 0; // Adjust if you have a real loading state

    useEffect(() => {
        dispatch(getAllFolders() as any)
    }, [])

    const folderCards = useMemo(() =>
        folders.map((folder) => <FolderCard key={folder._id} folder={folder} />),
        [folders]
    );

    return (
        <div className="w-full h-full p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {loading ? (
                    Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
                        <div key={idx} className="aspect-square w-full flex flex-col items-center justify-center bg-card rounded-lg shadow-sm p-4">
                            <Skeleton className="w-12 h-12 mb-2" />
                            <Skeleton className="w-24 h-4" />
                        </div>
                    ))
                ) : folders.length === 0 ? (
                    <div className="col-span-full text-center text-muted-foreground py-12">
                        No folders yet. Create your first folder!
                    </div>
                ) : (
                    folderCards
                )}
            </div>
        </div>
    )
}

export default MainHome
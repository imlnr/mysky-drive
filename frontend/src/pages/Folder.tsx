import { Separator } from "@/components/ui/separator"
import SidebarWrapper from "@/features/sidebar/Sidebar"
import type { AppState } from "@/lib/types"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react';
import { FolderHeader } from "@/features/Folder-files/components/FolderHeader";
import { FileGrid } from "@/features/Folder-files/components/FileGrid";
import type { ViewType } from "@/features/Folder-files/components/ViewSwitcher";
import { getFiles } from "@/redux/AppReducer/action";
import { useParams } from "react-router-dom";

const Folder = () => {
    const files = useSelector((e: AppState) => e.files);
    const isLoading = useSelector((e: AppState) => e.isLoading);
    const [view, setView] = useState<ViewType>('grid');
    const dispatch = useDispatch();
    const { id: folderId } = useParams<{ id: string }>();
    useEffect(() => {
        if (folderId) {
            dispatch(getFiles(folderId) as any);
        }
    }, [folderId, dispatch]);
    return (
        <SidebarWrapper>
            <FolderHeader view={view} onViewChange={setView} />
            <Separator />
            <div className="p-6">
                <FileGrid files={files} view={view} isLoading={isLoading} />
            </div>
        </SidebarWrapper>
    )
}

export default Folder
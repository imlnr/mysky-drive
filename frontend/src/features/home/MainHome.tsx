import type { AppState } from '@/lib/types'
import { getAllFolders } from '@/redux/AppReducer/action';
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton } from '@/components/ui/skeleton';
import FolderCard from './components/FolderCard';


const SKELETON_COUNT = 8;



const MainHome = () => {
    const dispatch = useDispatch();
    const folders = useSelector((state: AppState) => state.folders)
    const loading = useSelector((state: AppState) => state.isLoading)// Adjust if you have a real loading state

    useEffect(() => {
        dispatch(getAllFolders() as any)
    }, [])

    const folderCards = useMemo(() =>
        folders.map((folder) => <FolderCard key={folder._id} folder={folder} />),
        [folders]
    );

    return (
        <div className="w-full h-full p-2">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
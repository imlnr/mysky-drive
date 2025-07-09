import React from 'react';
import type { File } from '@/lib/types';
import type { ViewType } from './ViewSwitcher';
import { FileCard } from './FileCard';
import { FileSkeleton } from './FileSkeleton';

interface FileGridProps {
    files: File[];
    view: ViewType;
    isLoading: boolean;
}

export const FileGrid = React.memo(({ files, view, isLoading }: FileGridProps) => {
    const getGridClasses = () => {
        switch (view) {
            case 'list':
                return 'space-y-1';
            case 'compact':
                return 'space-y-1';
            case 'detailed':
                return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
            default:
                return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4';
        }
    };

    return (
        <div className={getGridClasses()}>
            {isLoading ? (
                // Show skeleton loading
                Array.from({ length: 8 }).map((_, index) => (
                    <FileSkeleton key={index} view={view} />
                ))
            ) : (
                // Show actual files
                files.map((file: File) => (
                    <FileCard key={file._id} file={file} view={view} />
                ))
            )}
        </div>
    );
});

FileGrid.displayName = 'FileGrid'; 
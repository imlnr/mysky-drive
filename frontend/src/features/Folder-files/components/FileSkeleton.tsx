import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import type { ViewType } from './ViewSwitcher';

interface FileSkeletonProps {
    view: ViewType;
}

export const FileSkeleton = React.memo(({ view }: FileSkeletonProps) => {
    if (view === 'list') {
        return (
            <div className="flex items-center p-3">
                <Skeleton className="w-12 h-12 mr-4 rounded-md" />
                <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-3 w-20 ml-4" />
            </div>
        );
    }

    if (view === 'compact') {
        return (
            <div className="flex items-center p-2">
                <Skeleton className="w-8 h-8 mr-3 rounded" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        );
    }

    if (view === 'detailed') {
        return (
            <div className="p-4 border rounded-lg">
                <div className="flex items-start space-x-4">
                    <Skeleton className="w-16 h-16 rounded-md" />
                    <div className="flex-1">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-1" />
                        <Skeleton className="h-3 w-1/3 mb-1" />
                        <Skeleton className="h-3 w-1/4" />
                    </div>
                </div>
            </div>
        );
    }

    // Default grid skeleton
    return (
        <div className="aspect-square w-full flex flex-col items-center justify-center bg-card rounded-lg shadow-sm p-4">
            <Skeleton className="w-full h-full mb-2 rounded-md" />
            <Skeleton className="h-4 w-3/4 mt-2" />
        </div>
    );
});

FileSkeleton.displayName = 'FileSkeleton'; 
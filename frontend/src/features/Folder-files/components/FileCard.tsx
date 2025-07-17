import React, { useState } from 'react';
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuLabel,
} from '@/components/ui/context-menu';
import { Download, Share, Trash2, Edit, Eye, Copy } from 'lucide-react';
import type { File } from '@/lib/types';
import type { ViewType } from './ViewSwitcher';
import { UniversalAlert } from '@/features/components/UniversalAlert';
import { useDispatch } from 'react-redux';
import { deleteFile, updateFile } from '@/redux/AppReducer/action';

interface FileCardProps {
    file: File;
    view: ViewType;
}

export const FileCard = React.memo(({ file, view }: FileCardProps) => {
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(file.name);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const dispatch = useDispatch();

    const isImageFile = (fileType: string) => {
        return fileType.startsWith('image/');
    };

    const handleRenameClick = () => setIsRenaming(true);

    const handleRenameSave = async () => {
        setIsRenaming(false);
        if (newName.trim() && newName !== file.name) {
            // TODO: Implement rename functionality
            await dispatch(updateFile(file._id, { name: newName }) as any)
            console.log('Rename to:', newName);
        }
    };

    const handleRenameCancel = () => {
        setIsRenaming(false);
        setNewName(file.name);
    };

    const handleDelete = async () => {
        // TODO: Implement delete functionality
        await dispatch(deleteFile([file._id]) as any)
        console.log('Delete file:', file._id);
    };

    const handleDeleteClick = () => {
        setDeleteAlert(true);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        link.click();
    };

    const handleShare = () => {
        // TODO: Implement share functionality
        console.log('Share file:', file._id);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(file.url);
        // TODO: Add toast notification
    };

    const handlePreview = () => {
        window.open(file.url, '_blank');
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    };

    const renderFileThumbnail = (size: string, className: string = '') => (
        <div className={`${size} overflow-hidden rounded-md flex-shrink-0 ${className}`}>
            {isImageFile(file.type) ? (
                <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.png';
                    }}
                />
            ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">
                        {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                    </span>
                </div>
            )}
        </div>
    );

    const renderContextMenu = () => (
        <>
            <ContextMenuContent>
                <ContextMenuLabel>File Actions</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={handlePreview}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                </ContextMenuItem>
                <ContextMenuItem onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </ContextMenuItem>
                <ContextMenuItem onClick={handleRenameClick}>
                    <Edit className="mr-2 h-4 w-4" />
                    Rename
                </ContextMenuItem>
                <ContextMenuItem onClick={handleCopyLink}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={handleShare}>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                </ContextMenuItem>
                <ContextMenuItem onClick={handleDeleteClick} variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Move to Bin
                </ContextMenuItem>
            </ContextMenuContent>
            <UniversalAlert
                open={deleteAlert}
                onOpenChange={setDeleteAlert}
                title="Delete File"
                continueVariant='destructive'
                description={`Are you sure you want to delete "${file.name}"? This action cannot be undone.`}
                onContinue={handleDelete}
            />
        </>
    );

    if (view === 'list') {
        return (
            <ContextMenu>
                <ContextMenuTrigger asChild>
                    <div className="flex items-center p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors">
                        {renderFileThumbnail('w-12 h-12 mr-4')}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium truncate">{file.name}</h3>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                        <div className="text-xs text-muted-foreground ml-4">
                            {formatDate(file.updatedAt)}
                        </div>
                    </div>
                </ContextMenuTrigger>
                {renderContextMenu()}
            </ContextMenu>
        );
    }

    if (view === 'compact') {
        return (
            <ContextMenu>
                <ContextMenuTrigger asChild>
                    <div className="flex items-center p-2 hover:bg-accent rounded cursor-pointer transition-colors">
                        {renderFileThumbnail('w-8 h-8 mr-3')}
                        <span className="text-sm truncate">{file.name}</span>
                    </div>
                </ContextMenuTrigger>
                {renderContextMenu()}
            </ContextMenu>
        );
    }

    if (view === 'detailed') {
        return (
            <ContextMenu>
                <ContextMenuTrigger asChild>
                    <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                        <div className="flex items-start space-x-4">
                            {renderFileThumbnail('w-16 h-16')}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-medium truncate">{file.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Size: {formatFileSize(file.size)} | Type: {file.type}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Modified: {formatDate(file.updatedAt)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Created: {formatDate(file.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </ContextMenuTrigger>
                {renderContextMenu()}
            </ContextMenu>
        );
    }

    // Default grid view
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div
                    className="aspect-square w-full flex flex-col items-center justify-center bg-card rounded-lg shadow-sm p-4 cursor-pointer transition hover:shadow-md hover:bg-accent select-none"
                    tabIndex={0}
                >
                    <div className="w-full h-full mb-2 overflow-hidden rounded-md">
                        {isImageFile(file.type) ? (
                            <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = '/placeholder-image.png';
                                }}
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-500 text-xs">
                                    {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                                </span>
                            </div>
                        )}
                    </div>
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
                                placeholder="Rename file"
                                aria-label="Rename file"
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
                        <h1 className="text-base font-medium text-center truncate w-full" title={file.name}>
                            {file.name}
                        </h1>
                    )}
                </div>
            </ContextMenuTrigger>
            {renderContextMenu()}
        </ContextMenu>
    );
});

FileCard.displayName = 'FileCard'; 
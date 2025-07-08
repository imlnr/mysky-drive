
interface Folder {
    _id: string;
    name: string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}
interface User {
    _id: string;
    name: string | null;
    email: string;
    avatar: string | null;
    loginType: string;
    oAuthId: string | null;
    createdAt: Date;
}

export interface AppState {
    isLoggedIn: boolean;
    user: User | null;
    isLoading: boolean;
    isError: string | null;
    isLoginLoading: boolean;
    folders: Folder[];
    files: File[];
    currentFolder: Folder | null;
    currentFile: File | null;
    currentFolderId: string | null;
    currentFileId: string | null;
}

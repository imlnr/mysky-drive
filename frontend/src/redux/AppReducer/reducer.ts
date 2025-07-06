import type { AppState } from "@/lib/types";

const initialState: AppState = {
    isLoggedIn: false,
    user: null,
    folders: [],
    files: [],
    currentFolder: null,
    currentFile: null,
    currentFolderId: null,
    currentFileId: null,
}


export const reducer = (state: AppState = initialState, action: any) => {
    switch (action.type) {
        default:
            return state;
    }

}
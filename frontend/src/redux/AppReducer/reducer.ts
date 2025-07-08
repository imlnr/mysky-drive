import type { AppState } from "@/lib/types";
import { CREATE_FOLDER_FAILURE, CREATE_FOLDER_REQUEST, CREATE_FOLDER_SUCCESS, GET_FOLDERS_SUCCESS } from "./action-types";

const initialState: AppState = {
    isLoggedIn: false,
    user: null,
    folders: [],
    files: [],
    isLoading: false,
    isError: null,
    currentFolder: null,
    currentFile: null,
    currentFolderId: null,
    currentFileId: null,
}


export const reducer = (state: AppState = initialState, action: any) => {
    switch (action.type) {
        case CREATE_FOLDER_REQUEST:
            return { ...state, isLoading: true, isError: "" };
        case CREATE_FOLDER_SUCCESS:
            return { ...state, isLoading: false, folders: [...state.folders, action.payload] };
        case CREATE_FOLDER_FAILURE:
            return { ...state, isLoading: false, isError: action.payload };
        case GET_FOLDERS_SUCCESS:
            return { ...state, isLoading: false, folders: action.payload };
        default:
            return state;
    }

}
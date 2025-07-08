import type { AppState } from "@/lib/types";
import { CREATE_FOLDER_FAILURE, CREATE_FOLDER_REQUEST, CREATE_FOLDER_SUCCESS, GET_FOLDERS_SUCCESS, GET_USER_FAILURE, GET_USER_LOGOUT, GET_USER_REQUEST, GET_USER_SUCCESS } from "./action-types";

const initialState: AppState = {
    isLoggedIn: false,
    user: null,
    folders: [],
    files: [],
    isLoading: false,
    isLoginLoading: false,
    isError: null,
    currentFolder: null,
    currentFile: null,
    currentFolderId: null,
    currentFileId: null,
}


export const reducer = (state: AppState = initialState, action: any): AppState => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return { ...state, isLoginLoading: true, isError: "", user: null }
        case GET_USER_SUCCESS:
            return { ...state, isLoginLoading: false, user: action.payload }
        case GET_USER_FAILURE:
            return { ...state, isLoginLoading: false, isError: action.payload };
        case GET_USER_LOGOUT:
            return initialState
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
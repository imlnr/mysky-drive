import type { AppState } from "@/lib/types";
import { CREATE_FOLDER_FAILURE, CREATE_FOLDER_REQUEST, CREATE_FOLDER_SUCCESS, DELETE_FOLDER_SUCCESS, GET_FOLDERS_SUCCESS, GET_USER_FAILURE, GET_USER_LOGOUT, GET_USER_REQUEST, GET_USER_SUCCESS, UPDATE_FOLDER_SUCCESS, UPLOAD_FILES_REQUEST, UPLOAD_FILES_SUCCESS, UPLOAD_FILES_FAILURE, GET_FILES_SUCCESS } from "./action-types";

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
        case UPDATE_FOLDER_SUCCESS:
            return { ...state, isLoading: false, folders: state.folders.map(folder => folder._id === action.payload._id ? action.payload : folder) };
        case DELETE_FOLDER_SUCCESS:
            return { ...state, isLoading: false, folders: state.folders.filter(folder => folder._id !== action.payload) };
        case UPLOAD_FILES_REQUEST:
            return { ...state, isLoading: true, isError: "" };
        case UPLOAD_FILES_SUCCESS:
            return { ...state, isLoading: false, files: [...state.files, ...action.payload] };
        case UPLOAD_FILES_FAILURE:
            return { ...state, isLoading: false, isError: action.payload };
        case GET_FILES_SUCCESS:
            return { ...state, isLoading: false, files: action.payload };

        default:
            return state;
    }

}
import axios from "axios";
import Cookies from "js-cookie";
import type { Dispatch } from "redux";
import { CREATE_FOLDER_FAILURE, CREATE_FOLDER_REQUEST, CREATE_FOLDER_SUCCESS, DELETE_FOLDER_SUCCESS, GET_FOLDERS_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, UPDATE_FOLDER_SUCCESS, UPLOAD_FILES_REQUEST, UPLOAD_FILES_SUCCESS, UPLOAD_FILES_FAILURE, GET_FILES_SUCCESS } from "./action-types";

const url = import.meta.env.VITE_API_URL;

const getHeaders = () => {
    const token = Cookies.get('accessToken');
    if (!token) {
        throw new Error("No login data found in cookies");
    }
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return headers;
}

export const sendOtp = async (email: string) => {
    try {
        const response = await axios.post(`${url}/users/send-otp`, { email });
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const verifyOtp = (email: string, otp: string) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const response = await axios.post(`${url}/users/verify-otp`, { email, otp });
        if (response.data) {
            dispatch({ type: GET_USER_SUCCESS, payload: response.data.user });
            return response.data;
        }
    } catch (error: any) {
        console.log(error);
        dispatch({ type: GET_USER_FAILURE, payload: error.msg });
        throw error;
    }
}

export const googleLogin = (token: string) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const response = await axios.post(`${url}/users/google-login`, { token });
        if (response.data) {
            dispatch({ type: GET_USER_SUCCESS, payload: response.data.user });
            return response.data;
        }
    } catch (error: any) {
        console.log(error);
        dispatch({ type: GET_USER_FAILURE, payload: error.msg });
        throw error;
    }
}

export const createFolder = (name: string) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_FOLDER_REQUEST });
    try {
        const response = await axios.post(`${url}/folders/create-folder`, { name }, { headers: getHeaders() });
        if (response.data) {
            dispatch({ type: CREATE_FOLDER_SUCCESS, payload: response.data.folder });
            return response.data;
        }
    } catch (error: any) {
        console.log(error);
        dispatch({ type: CREATE_FOLDER_FAILURE, payload: error.msg });
        throw error;
    }
}

export const getAllFolders = () => async (dispatch: Dispatch) => {
    console.log('getAllFolders: Starting API call')
    dispatch({ type: CREATE_FOLDER_REQUEST });
    try {
        const headers = getHeaders()
        console.log('getAllFolders: Headers =', headers)
        const response = await axios.get(`${url}/folders/get-all-folders`, { headers });
        console.log('getAllFolders: Response =', response.data)
        if (response.data) {
            dispatch({ type: GET_FOLDERS_SUCCESS, payload: response.data?.folders })
            return response.data;
        }

    } catch (error: any) {
        console.log('getAllFolders: Error =', error)
        dispatch({ type: CREATE_FOLDER_FAILURE, payload: error.msg })
        console.log(error);
        throw error;
    }
}

export const getUser = () => async (dispatch: Dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const response = await axios.get(`${url}/users/get-user`, { headers: getHeaders() });
        if (response.data) {
            dispatch({ type: GET_USER_SUCCESS, payload: response.data.user });
            return response.data;
        }
    } catch (error: any) {
        dispatch({ type: GET_USER_FAILURE, payload: error.msg });
        throw error;
    }
}

export const updateFolder = (updateData: any) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.put(`${url}/folders/update-folder/${updateData._id}`, updateData, { headers: getHeaders() });
        if (response.data) {
            dispatch({ type: UPDATE_FOLDER_SUCCESS, payload: response.data.folder });
            return response.data;
        }
    } catch (error: any) {
        dispatch({ type: CREATE_FOLDER_FAILURE, payload: error.msg });
        throw error;
    }
}

export const deleteFolder = (folderID: string) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.delete(`${url}/folders/delete-folder/${folderID}`, { headers: getHeaders() });
        if (response.data) {
            dispatch({ type: DELETE_FOLDER_SUCCESS, payload: folderID });
            return response.data;
        }
    } catch (error: any) {
        dispatch({ type: CREATE_FOLDER_FAILURE, payload: error.msg });
        throw error;
    }
}

export const addFilesToFolder = (files: File[], folderId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: UPLOAD_FILES_REQUEST });

    try {
        const response = await axios.post(`${url}/files/add-files/${folderId}`, files, { headers: getHeaders() });
        if (response.data) {
            dispatch({ type: UPLOAD_FILES_SUCCESS, payload: response.data.files });
            return response.data;
        }
    } catch (error: any) {
        dispatch({ type: UPLOAD_FILES_FAILURE, payload: error?.response?.data?.message || "Upload failed" });
        throw error;
    }
}

export const uploadFiles = (files: File[], folderId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: UPLOAD_FILES_REQUEST });

    try {
        // First, upload files to get the file data (URLs, etc.)
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        formData.append("folderId", folderId);

        // Upload files to get file information
        const uploadResponse = await axios.post(
            `${url}/upload/upload-files`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    ...(getHeaders() && { Authorization: getHeaders().Authorization }),
                },
            }
        );

        // Then, add the files to the folder using the new endpoint
        const fileData = uploadResponse.data.files;
        const response = await axios.post(
            `${url}/files/add-files/${folderId}`,
            fileData,
            { headers: getHeaders() }
        );

        if (response.data) {
            dispatch({ type: UPLOAD_FILES_SUCCESS, payload: response.data.files });
            return response.data;
        }
    } catch (error: any) {
        console.error("Upload failed:", error);
        dispatch({ type: UPLOAD_FILES_FAILURE, payload: error?.response?.data?.message || "Upload failed" });
        throw error?.response?.data || { error: "Something went wrong" };
    }
};

export const getFiles = (folderId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: UPLOAD_FILES_REQUEST });
    try {
        const response = await axios.get(`${url}/files/get-files/${folderId}`, { headers: getHeaders() });
        if (response.data) {
            dispatch({ type: GET_FILES_SUCCESS, payload: response.data.files });
            return response.data;
        }
    } catch (error: any) {
        dispatch({ type: UPLOAD_FILES_FAILURE, payload: error.msg });
        throw error;
    }
}
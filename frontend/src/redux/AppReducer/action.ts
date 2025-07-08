import axios from "axios";
import Cookies from "js-cookie";
import type { Dispatch } from "redux";
import { CREATE_FOLDER_FAILURE, CREATE_FOLDER_REQUEST, CREATE_FOLDER_SUCCESS, GET_FOLDERS_SUCCESS } from "./action-types";

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

export const verifyOtp = async (email: string, otp: string) => {
    try {
        const response = await axios.post(`${url}/users/verify-otp`, { email, otp });
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        // return error;
        throw error;
    }
}

export const googleLogin = async (token: string) => {
    try {
        const response = await axios.post(`${url}/users/google-login`, { token });
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
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
    dispatch({ type: CREATE_FOLDER_REQUEST });;
    try {
        const response = await axios.get(`${url}/folders/get-all-folders`, { headers: getHeaders() });
        if (response.data) {
            dispatch({ type: GET_FOLDERS_SUCCESS, payload: response.data?.folders })
            return response.data;
        }

    } catch (error: any) {
        dispatch({ type: CREATE_FOLDER_FAILURE, payload: error.msg })
        console.log(error);
        throw error;
    }
}
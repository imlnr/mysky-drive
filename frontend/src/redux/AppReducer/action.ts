import axios from "axios";

const url = import.meta.env.VITE_API_URL;


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
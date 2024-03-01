import axios from 'axios';
import Cookies from 'js-cookie';
import getConfig from "next/config";


const {publicRuntimeConfig} = getConfig();
const BASE_URL = `${publicRuntimeConfig.baseURL}`;
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('auth-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;

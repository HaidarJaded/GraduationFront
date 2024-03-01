import getConfig from "next/config";
import axios from "axios";
import Cookies from 'js-cookie';

import {responseErrorHandlers} from "../../../wrappers";


const {publicRuntimeConfig} = getConfig();

const LOGIN_URL = 'api/login';
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const login = async (login) => {
    try {
        return await axios.post(`${BASE_URL}${LOGIN_URL}`, login).then(async response => {
            console.log(response)
            const result = await response?.data
            const token = result?.body?.token
            const profile = JSON.stringify(result?.body?.auth)
            Cookies.set('auth-token', token);
            localStorage.setItem('profile', profile);
             return {
                 data : result ,
                 status : response?.status
             }
        });
    } catch (error) {
        responseErrorHandlers(error?.response)
    }
};


const logoutHandler = () => {
    Cookies.remove('auth-token');
};

export const authServices = {
    login, logoutHandler,

};
import getConfig from "next/config";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import axiosInstance from "../../../utils/auth/axiosInstance";

import { responseErrorHandlers } from "../../../wrappers";

const { publicRuntimeConfig } = getConfig();
// const router = useRouter();

const LOGIN_URL = "api/login";
const LOGOUT_URL = "api/logout";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const login = async (login) => {
  try {
    return await axios
      .post(`${BASE_URL}${LOGIN_URL}`, login)
      .then(async (response) => {
        const result = await response?.data;
        const token = result?.body?.token;
        const profile = JSON.stringify(result?.body?.auth);
        Cookies.set("auth-token", token);
        localStorage.setItem("profile", profile);
        return {
          data: result,
          status: response?.status,
        };
      });
  } catch (error) {
    responseErrorHandlers(error?.response);
  }
};



const logout = async () => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}${LOGOUT_URL}`);

      if (response.status === 200) {
        Cookies.remove("auth-token");
        localStorage.removeItem("profile");
      }

      return {
        status: response.status,
      };
    } catch (error) {
      responseErrorHandlers(error?.response);
      return {
        status: 422,
        errors: error,
      };
    }
  };

  const refreshAuthToken = async () => {
    try {
      const authToken = Cookies.get('auth-token');
      if (authToken) {
        const REFRESH_TOKEN_URL = `${BASE_URL}api/refresh_token`;
  
        const response = await axiosInstance.post(REFRESH_TOKEN_URL);
  
        if (response.status === 200) {
          const token = response.data.body.token;
  
          Cookies.remove('auth-token');
          Cookies.set('auth-token', token);
          return true;
        }
        Cookies.remove('auth-token');
      }
      return false;
    } catch (error) {
      return false;
    }
  };

export const authServices = {
  login,
  logout,
  refreshAuthToken
};

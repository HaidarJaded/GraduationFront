import * as React from "react";
import getConfig from "next/config";
import axios from "axios";
import Cookies from "js-cookie";

import { responseErrorHandlers } from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const { publicRuntimeConfig } = getConfig();

const USERS_URL = "api/users";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAll = async (params) => {
  try {
    return await axiosInstance
      .get(`${BASE_URL}${USERS_URL}`, { params })
      .then(async (response) => {
        return await response?.data;
      });
  } catch (error) {
    responseErrorHandlers(error?.response);
  }
};
const addUser = async (user) => {
    try {
        return await axiosInstance
            .post(`${BASE_URL}${USERS_URL}`, user)
            .then(async (response) => {
                const result = await response?.data;
                return {
                    data: result,
                    status: response?.status,
                };
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};



const deleteUser = async (id) => {
  try {
     const response= await axiosInstance.delete(`${BASE_URL}${USERS_URL}/${id}`);
      if (response.status==200) {
          return true;
      }
      return false;
  } catch (error) {
      responseErrorHandlers(error?.response);
  }
}

const getAllPermissions = async (id,params) => {
    try {
        return await axiosInstance.get(`${BASE_URL}${USERS_URL}/${id}`, {params}).then(
             response => {
                return response?.data;
            }
        );
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
export const users = {
  getAll,
  addUser,
  deleteUser, getAllPermissions
};

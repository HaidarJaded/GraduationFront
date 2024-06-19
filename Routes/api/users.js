import * as React from "react";
import getConfig from "next/config";

import {responseErrorHandlers} from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const {publicRuntimeConfig} = getConfig();

const USERS_URL = "api/users";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAll = async (params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${USERS_URL}`, {params})
            .then(async (response) => {
                return {
                    data: await response?.data,
                    status: await response?.status,
                };
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
        return {
            data: await error?.response?.data,
            status: await error?.status,
        };
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
        const response = await axiosInstance.delete(`${BASE_URL}${USERS_URL}/${id}`);
        if (response.status == 200) {
            return true;
        }
        return false;
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
}

const getAllPermissions = async (id, params) => {
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
const getUser = async (id, params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${USERS_URL}/${id}`, {params})
            .then(async (response) => {
                return await response?.data?.body;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
const updateUser = async (id, params) => {
    try {
        return await axiosInstance.put(`${BASE_URL}${USERS_URL}/${id}`, params).then(
            async response => {
                return response?.data

            }
        );
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
export const usersServices = {
    getAll,
    getUser,
    addUser,
    updateUser,
    deleteUser, getAllPermissions
};

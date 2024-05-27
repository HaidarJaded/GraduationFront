import * as React from "react";
import getConfig from "next/config";

import {responseErrorHandlers} from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const {publicRuntimeConfig} = getConfig();

const permissions_URL = "api/permissions";
const permissionsClients_URL = "api/permission_clients";
const permissionsUsers_URL = "api/permission_users";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAllPermissions = async () => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${permissions_URL}`)
            .then(async (response) => {
                return await response?.data;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};

const addPermissions = async (permissions) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}${permissionsClients_URL}`, permissions);
        return response?.data;
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
const addPermissionsUser = async (permissions) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}${permissionsUsers_URL}`, permissions);
        return response?.data;
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};


export const permissionsServices = {
    getAllPermissions, addPermissions, addPermissionsUser
};

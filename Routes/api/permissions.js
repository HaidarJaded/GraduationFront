import * as React from "react";
import getConfig from "next/config";

import {responseErrorHandlers} from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const {publicRuntimeConfig} = getConfig();

const permissions_URL = "api/permissions";
const permissionsClients_URL = "api/permission_clients";
const permissionsUsers_URL = "api/permission_users";
const permissionsRules_URL = "api/permission_rules";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAllPermissions = async (params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${permissions_URL}`,{params})
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

const addPermissionsRule = async (permissions) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}${permissionsRules_URL}`, permissions);
        return response?.data;
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};

const deletePermissionFromUser = async (userId, permissionId) => {
    try {
        const response = await axiosInstance.delete(`${BASE_URL}${permissionsUsers_URL}/${userId}/${permissionId}`)
        if (response.status == 200) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
        responseErrorHandlers(error?.response);
    }
}

export const permissionsServices = {
    getAllPermissions, addPermissions, addPermissionsUser,
    addPermissionsRule,
    deletePermissionFromUser
};

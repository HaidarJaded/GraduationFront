import * as React from "react";
import getConfig from "next/config";

import {responseErrorHandlers} from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const {publicRuntimeConfig} = getConfig();

const DEVICES_URL = "api/devices";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAll = async (params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${DEVICES_URL}`, {params})
            .then(async (response) => {
                return await response?.data;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
const getDevice = async (id,params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${DEVICES_URL}/${id}`,{params})
            .then(async (response) => {
                return await response?.data?.body;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};

const updateDevice = async (id,params) => {
    try {
        return await axiosInstance.put(`${BASE_URL}${DEVICES_URL}/${id}`, params).then(
            async response => {
                return response?.data

            }
        );
    } catch (error) {

    }
};

export const deviceServices = {
    getAll, updateDevice,
    getDevice
    // CRUD
    // CREATE
    // READ
    // UPDATE
    // DELETE
};

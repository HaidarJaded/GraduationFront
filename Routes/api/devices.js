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

const updateDevice = async (id, params) => {
    try {
        return await axiosInstance.put(`${BASE_URL}${DEVICES_URL}/${id}`, params).then(
            async response => {
                return response?.data

            }
        );
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};

const deleteDevice = async (id) => {
    try {
       const response= await axiosInstance.delete(`${BASE_URL}${DEVICES_URL}/${id}`);
        return response.status === 200;

    } catch (error) {
        responseErrorHandlers(error?.response);
    }
}
const addDevice = async (device) => {
    try {
        return await axiosInstance
            .post(`${BASE_URL}${DEVICES_URL}`, device)
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
export const deviceServices = {
    getAll,
    updateDevice,
    getDevice,
    deleteDevice,
    addDevice
    // CRUD
    // CREATE
    // READ
    // UPDATE
    // DELETE
};

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
const getDevice = async (id) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${DEVICES_URL}/${id}`)
            .then(async (response) => {
                return await response?.data?.body;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
const updateDevice = async (params) => {
    const {id, ...userName} = params
    try {
        return await axiosInstance.put(`${BASE_URL}${DEVICES_URL}/${id}`, {userName}).then(
            async response => {
                console.log(userName);
                return response?.data

            }
        );
    } catch (error) {

    }
};

export const device = {
    getAll, updateDevice,
    getDevice
    // CRUD
    // CREATE
    // READ
    // UPDATE
    // DELETE
};

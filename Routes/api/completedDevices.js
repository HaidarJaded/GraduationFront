import getConfig from "next/config";

import {responseErrorHandlers} from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";
import {deviceServices} from "./devices";

const {publicRuntimeConfig} = getConfig();

const COMPLETED_DEVICES_URL = 'api/completed_devices';
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAll = async (params) => {
    try {
        return await axiosInstance.get(`${BASE_URL}${COMPLETED_DEVICES_URL}`,{params}).then(async response => {
            return await response?.data
        });
    } catch (error) {
        responseErrorHandlers(error?.response)
    }
};
const updateCompletedDevice = async (id,params) => {
    try {
        return await axiosInstance.put(`${BASE_URL}${COMPLETED_DEVICES_URL}/${id}`, params).then(
            async response => {
                return response?.data
            }
        );
    } catch (error) {

    }
};
const getCompletedDevice = async (id,params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${COMPLETED_DEVICES_URL}/${id}`,{params})
            .then(async (response) => {
                return await response?.data?.body;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};

const deleteCompletedDevice = async (id) => {
    try {
       const response= await axiosInstance.delete(`${BASE_URL}${COMPLETED_DEVICES_URL}/${id}`);
        return response.status === 200;

    } catch (error) {
        responseErrorHandlers(error?.response);
    }
}

export const completedDevicesServices = {
    getAll,
    updateCompletedDevice,
    getCompletedDevice,
    deleteCompletedDevice
};
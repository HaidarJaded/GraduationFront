import * as React from "react";
import getConfig from "next/config";


import { responseErrorHandlers } from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const { publicRuntimeConfig } = getConfig();

const SERVICES_URL = "api/services";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAllServices = async (params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${SERVICES_URL}`, { params })
            .then(async (response) => {
                return await response?.data;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};



export const servicesServices = {
    getAllServices,
};

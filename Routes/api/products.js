import * as React from "react";
import getConfig from "next/config";


import { responseErrorHandlers } from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const { publicRuntimeConfig } = getConfig();

const PRODUCTS_URL = "api/products";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAllProducts = async (params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${PRODUCTS_URL}`, { params })
            .then(async (response) => {
                return await response?.data;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};



export const servicesProducts = {
    getAllProducts,
};

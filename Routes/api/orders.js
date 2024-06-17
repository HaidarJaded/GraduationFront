import * as React from "react";
import getConfig from "next/config";


import {responseErrorHandlers} from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const {publicRuntimeConfig} = getConfig();

const ORDERS_URL = "api/orders";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAllOrders = async (params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${ORDERS_URL}`, {params})
            .then(async (response) => {
                return await response?.data;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};

export const ordersServices = {
    getAllOrders
};

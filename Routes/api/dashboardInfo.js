import * as React from "react";
import getConfig from "next/config";

import {responseErrorHandlers} from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";
import {useState} from "react";

const { publicRuntimeConfig } = getConfig();
const DASHBOARD_INFO_URL = "api/dashboard_info";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;
const getDashboardInfo = async () => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${DASHBOARD_INFO_URL}`)
            .then(async (response) => {
                    return response?.data?.body;
            });
    }
    catch (error) {
        responseErrorHandlers(error?.response);
    }
};
export const DashboardInfo = {
    getDashboardInfo,
};
import * as React from "react";
import getConfig from "next/config";

import {responseErrorHandlers} from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const {publicRuntimeConfig} = getConfig();

const NOTIFICATIONS_URL = "api/notifications/admin";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAll = async (params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${NOTIFICATIONS_URL}`, {params})
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
export const notificationsServices = {
    getAll,

};

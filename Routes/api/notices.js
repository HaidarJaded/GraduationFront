import * as React from "react";
import getConfig from "next/config";

import {responseErrorHandlers} from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const {publicRuntimeConfig} = getConfig();

const NOTIFICATIONS_URL = "api/notifications/admin";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAll = async () => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${NOTIFICATIONS_URL}`)
            .then(async (response) => {
                return await response?.data;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};

export const notificationsServices = {
    getAll,

};

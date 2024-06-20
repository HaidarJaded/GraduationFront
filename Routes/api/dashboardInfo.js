import * as React from "react";
import getConfig from "next/config";

import {responseErrorHandlers} from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";
import {useState} from "react";

const { publicRuntimeConfig } = getConfig();
const DASHBOARD_INFO_URL = "api/dashboard_info";
const CENTER_INFO_URL = "api/centers";
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
const getCenterInfo = async () => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${CENTER_INFO_URL}`)
            .then(async (response) => {
                return response?.data?.body;
            });
    }
    catch (error) {
        responseErrorHandlers(error?.response);
    }
};
const getCenter = async (id) => {
    try {
        return await axiosInstance.get(`${BASE_URL}${CENTER_INFO_URL}/${id}`)
            .then(async (response) =>{
                return await response?.data?.body;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
const updateCenter = async (id, params) => {
    try {
        return await axiosInstance.put(`${BASE_URL}${CENTER_INFO_URL}/${id}`, params).then(
            async response => {
                return response?.data

            }
        );
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
export const DashboardInfo = {
    getDashboardInfo,
    getCenterInfo,getCenter,
    updateCenter
};
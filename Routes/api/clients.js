import * as React from "react";
import getConfig from "next/config";

import {responseErrorHandlers} from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const {publicRuntimeConfig} = getConfig();

const CLIENTS_URL = "api/clients";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAll = async (params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${CLIENTS_URL}`, {params})
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
const getClient = async (id,params) => {
    try {
      return await axiosInstance.get(`${BASE_URL}${CLIENTS_URL}/${id}`, {params})
          .then(async (response) =>{
              return await response?.data?.body;
          });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};

const updateClients = async (id, params) => {
    try {
        return await axiosInstance.put(`${BASE_URL}${CLIENTS_URL}/${id}`, params).then(
            async response => {
                return response?.data

            }
        );
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};

const deleteClient = async (id) => {
    try {
        const response = await axiosInstance.delete(`${BASE_URL}${CLIENTS_URL}/${id}`);
        return response.status === 200;

    } catch (error) {
        responseErrorHandlers(error?.response);
    }
}
const getAllClientPermissions = async (id, params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${CLIENTS_URL}/${id}`, {params})
            .then(async (response) => {
                return await response?.data;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};


export const clientsServices = {
    getAll,
    getAllClientPermissions,
    updateClients,
    deleteClient,
    getClient
};

import * as React from "react";
import getConfig from "next/config";


import {responseErrorHandlers} from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const {publicRuntimeConfig} = getConfig();

const SERVICES_URL = "api/services";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAllServices = async (params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${SERVICES_URL}`, {params})
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
const getService = async (id) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${SERVICES_URL}/${id}`)
            .then(async (response) => {
                return await response?.data?.body;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};

const updateService = async (id, params) => {
    try {
        return await axiosInstance
            .put(`${BASE_URL}${SERVICES_URL}/${id}`, params)
            .then(async response => {
                    return response?.data;
                }
            );
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
const deleteService=async (id)=>{
  try {
      const response= await axiosInstance.delete(`${BASE_URL}${SERVICES_URL}/${id}`);
      return response.status === 200;

  }  catch (error){
      responseErrorHandlers(error?.response)
  }
};
export const servicesServices = {
    getAllServices, getService
    , updateService,
    deleteService
};

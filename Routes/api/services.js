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
                return await response?.data;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
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
      if (response.status==200) {
          return true;
      }
      return false;
  }  catch (error){
      responseErrorHandlers(error?.response)
  }
};
export const servicesServices = {
    getAllServices, getService
    , updateService,
    deleteService
};

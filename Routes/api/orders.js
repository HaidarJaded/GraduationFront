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
const getOrder = async (id, params) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${ORDERS_URL}/${id}`, {params})
            .then(async (response) => {
                return await response?.data?.body;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
const updateOrder = async (id, params) => {
    try {
        return await axiosInstance.put(`${BASE_URL}${ORDERS_URL}/${id}`, params).then(
            async response => {
                return response?.data

            }
        );
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
const deleteOrder=async(id)=>{
  try {
      const response=await axiosInstance.delete(`${BASE_URL}${ORDERS_URL}/${id}`);
      return response.status === 200;
  }
  catch (error)
  {
      responseErrorHandlers(error?.response);
  }
};

export const ordersServices = {
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder
};

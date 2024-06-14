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
const getProduct = async (id) => {
    try {
        return await axiosInstance
            .get(`${BASE_URL}${PRODUCTS_URL}/${id}`)
            .then(async (response) => {
                return await response?.data?.body;
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
const updateProduct = async (id, params) => {
    try {
        return await axiosInstance
            .put(`${BASE_URL}${PRODUCTS_URL}/${id}`, params)
            .then(async response => {
                    return response?.data;
                }
            );
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};
const deleteProduct=async (id)=>{
    try {
        const response= await axiosInstance.delete(`${BASE_URL}${PRODUCTS_URL}/${id}`);
        return response.status === 200;

    }  catch (error){
        responseErrorHandlers(error?.response)
    }
};


export const servicesProducts = {
    getAllProducts,
    deleteProduct,
    getProduct,
    updateProduct,
};

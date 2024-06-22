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
            .get(`${BASE_URL}${PRODUCTS_URL}`, {params})
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
const addProduct = async (product) => {
    try {
        return await axiosInstance
            .post(`${BASE_URL}${PRODUCTS_URL}`, product)
            .then(async (response) => {
                const result = await response?.data;
                return {
                    data: result,
                    status: response?.status,
                };
            });
    } catch (error) {
        responseErrorHandlers(error?.response);
    }
};


export const servicesProducts = {
    getAllProducts,
    deleteProduct,
    getProduct,
    updateProduct,
    addProduct
};

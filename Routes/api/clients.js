import * as React from "react";
import getConfig from "next/config";
import axios from "axios";
import Cookies from "js-cookie";

import { responseErrorHandlers } from "../../wrappers";
import axiosInstance from "../../utils/auth/axiosInstance";

const { publicRuntimeConfig } = getConfig();

const CLIENTS_URL = "api/clients";
const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

const getAll = async (params) => {
  try {
    return await axiosInstance
      .get(`${BASE_URL}${CLIENTS_URL}`, { params })
      .then(async (response) => {
        return await response?.data;
      });
  } catch (error) {
    responseErrorHandlers(error?.response);
  }
};
const updateclients = async (id,params) => {
  try {
    return await axiosInstance.put(`${BASE_URL}${CLIENTS_URL}/${id}`, params).then(
        async response => {
          return response?.data

        }
    );
  } catch (error) {

  }
};

const deleteClient = async (id) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}${CLIENTS_URL}/${id}`);
    if (response.status == 200) {
      return true;
    }
    return false;
  } catch (error) {
    responseErrorHandlers(error?.response);
  }
}

export const clientsServices = {
  getAll,
  updateclients,
  deleteClient
};

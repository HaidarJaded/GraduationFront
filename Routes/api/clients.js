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

export const clientsServices = {
  getAll,updateclients
};

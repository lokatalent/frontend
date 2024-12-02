import axios from "axios";

import { baseUrl } from "./utils";

const options = {
  baseURL: baseUrl,
  headers: {
        Accept: 'application/json,text/plain,*/*',
      'Content-Type': 'application/json',
  }
}

export const getToken = () => {
  return sessionStorage.getItem("lokaToken");
};

export const http = axios.create(options)

http.interceptors.request.use(
(config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error);
}
);
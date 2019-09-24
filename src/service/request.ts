import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

import ENV from "URL";

const request = axios.create({
  baseURL: `${ENV.ONE_API}/primary`,
});

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something
    return config;
  },
  (error: AxiosError) => {
    // do something
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response: AxiosResponse) => {
    // do something
    return response;
  },
  (error: AxiosError) => {
    // do something
    return Promise.reject(error);
  },
);

const anotherRequest = axios.create({
  baseURL: ENV.ANOTHER_API,
  headers: {
    Authorization: "",
  },
});

export { request, anotherRequest };

import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";

axios.interceptors.response.use(function (response) {
  return response;
}, function (error: AxiosError) {
  return Promise.reject(error.response);
});


export const httpRequest = <T = unknown> (
    endpoint: string,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> => axios.get(
    `https://api.yelp.com/v3${endpoint}`, config
    ).catch((err) => err)
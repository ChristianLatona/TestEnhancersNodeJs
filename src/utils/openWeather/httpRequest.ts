import axios, { AxiosPromise } from "axios";

export const httpRequest = <T = unknown> (
    endpoint: string
  ): AxiosPromise<T> => axios.get(
    `http://api.openweathermap.org${endpoint}`
    ).catch((err) => err)
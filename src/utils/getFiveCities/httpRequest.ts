import axios, { AxiosPromise } from "axios";

export const httpRequest = <T = unknown> (
    endpoint: string
  ): AxiosPromise<T> => axios.get(
    `http://localhost:8000/${endpoint}`
    ).catch((err) => err)
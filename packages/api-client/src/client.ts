import axios, { type AxiosInstance } from "axios";

// TODO: move to types
export interface ApiConfig {
  baseURL: string;
  getToken: () => string | null | Promise<string | null>;
  onUnauthorized?: () => void;
}

export const createApiClient = ({
  getToken,
  onUnauthorized,
}: ApiConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: "http://localhost:3001/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        onUnauthorized?.();
      }
      return Promise.reject(err);
    },
  );

  return instance;
};

import axios, { type AxiosError, type AxiosInstance } from "axios";
import type { ApiConfig, FailedRequest } from "@repo/types";

export const createApiClient = ({
  baseURL,
  getAccessToken,
  refreshToken,
  onUnauthorized,
  onTokenRefreshed,
}: ApiConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  instance.interceptors.request.use(async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  let isRefreshing = false;
  let failedQueue: FailedRequest[] = [];

  instance.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
      if (err.response?.status === 401 && err.config?.url !== "/auth/login") {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSuccess: (accessToken: string) => {
                if (!err.config) {
                  reject(err);
                  return;
                }
                err.config.headers.set(
                  "Authorization",
                  `Bearer ${accessToken}`,
                );
                resolve(instance(err.config));
              },
              onFailure: () => {
                reject(err);
              },
            });
          });
        } else {
          isRefreshing = true;

          return refreshToken()
            .then((newAccessToken) => {
              if (!newAccessToken || !err.config) {
                throw new Error("No accessToken received");
              }

              onTokenRefreshed(newAccessToken);

              err.config.headers.set(
                "Authorization",
                `Bearer ${newAccessToken}`,
              );

              if (failedQueue.length > 0) {
                failedQueue.forEach((pendingRequest) =>
                  pendingRequest.onSuccess(newAccessToken),
                );
                failedQueue = [];
              }

              return instance(err.config);
            })
            .catch(() => {
              if (failedQueue.length > 0) {
                failedQueue.forEach((pendingRequest) =>
                  pendingRequest.onFailure(),
                );
                failedQueue = [];
              }

              onUnauthorized();

              return Promise.reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        }
      }

      return Promise.reject(err);
    },
  );

  return instance;
};

export const refreshToken = async () => {
  // TODO: update hardcoded url with dynamic param value

  const response = await axios.get(
    "http://localhost:3001/api/v1/auth/refresh",
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );

  return response.data.accessToken;
};

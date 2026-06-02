import { createApiClient } from "@repo/api-client";
import { type ApiConfig } from "@repo/types";

let config: Omit<ApiConfig, "baseURL"> = {
  getAccessToken: () => null,
  refreshToken: async () => "",
  onUnauthorized: () => {},
  onTokenRefreshed: () => {},
};

export const client = createApiClient({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/",
  getAccessToken: () => config.getAccessToken(),
  refreshToken: () => config.refreshToken(),
  onUnauthorized: config.onUnauthorized,
  onTokenRefreshed: config.onTokenRefreshed,
});

export const initApiClient = (
  externalApiConfig: Omit<ApiConfig, "baseURL">,
) => {
  config = externalApiConfig;
};

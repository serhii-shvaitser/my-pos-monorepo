import { createApiClient, createAuthService } from "@repo/api-client";
import { useSessionStore } from "./model/store";

export const client = createApiClient({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/",
  getAccessToken: () => useSessionStore.getState().accessToken,
  refreshToken: async () => authApi.refreshToken(),
  onUnauthorized: () => {
    useSessionStore.getState().setAccessToken(null);
  },
  onTokenRefreshed: (newAccessToken) =>
    useSessionStore.getState().setAccessToken(newAccessToken),
});

export const authApi = createAuthService(client);

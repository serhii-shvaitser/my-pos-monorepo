// TODO: remove from shared layer
import {
  createApiClient,
  createAuthService,
  createTablesService,
} from "@repo/api-client";

import { useSessionStore } from "@/entities/session";
import { router } from "@/app/router";

const client = createApiClient({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/",
  getAccessToken: () => useSessionStore.getState().accessToken,
  refreshToken: async () => authApi.refreshToken(),
  onUnauthorized: () => {
    console.log("Session expired, redirecting...");
    useSessionStore.getState().setAccessToken(null);

    if (router.state.location.pathname === "/login") {
      return;
    }

    router.navigate({
      to: "/login",
      search: {
        redirect: router.state.location.pathname,
      },
    });
  },
  onTokenRefreshed: (newAccessToken) =>
    useSessionStore.getState().setAccessToken(newAccessToken),
});

export const authApi = createAuthService(client);
export const tablesApi = createTablesService(client);

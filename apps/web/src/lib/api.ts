import { createApiClient, createAuthService } from "@repo/api-client";

const client = createApiClient({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  getToken: () => localStorage.getItem("token"),
  onUnauthorized: () => {
    if (window.location.pathname === "/login") {
      return;
    }
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
});

export const authApi = createAuthService(client);
// Export other services
// export const menuApi = createMenuService(client);

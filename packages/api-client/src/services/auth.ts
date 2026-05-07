import { type AxiosInstance } from "axios";
import { type LoginCredentials, type SessionData } from "@repo/types";

export const createAuthService = (client: AxiosInstance) => ({
  login: async (credentials: LoginCredentials) => {
    const { data } = await client.post<SessionData>("/auth/login", credentials);
    return data;
  },
  refreshToken: async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/refresh",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Refresh failed with status: " + response.status);
      }
      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      console.error("AuthApi.refreshToken error:", error);
      throw error;
    }
  },
  logout: async () => {
    await client.post("/auth/logout");
  },
  test: async () => {
    try {
      const { data } = await client.get("/auth/test-protected", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      throw new Error("test failed");
    }
  },
});

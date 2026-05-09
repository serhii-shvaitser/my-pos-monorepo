import axios, { type AxiosInstance } from "axios";
import { type LoginCredentials, type SessionData } from "@repo/types";

export const createAuthService = (client: AxiosInstance) => ({
  login: async (credentials: LoginCredentials) => {
    const { data } = await client.post<SessionData>("/auth/login", credentials);
    return data;
  },
  refreshToken: async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/auth/refresh",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      const data = response.data;
      return data.accessToken;
    } catch (error) {
      // TODO: handle error
      console.error("AuthApi.refreshToken error:", error);
      throw error;
    }
  },
  logout: async () => {
    await client.post("/auth/logout");
  },
});

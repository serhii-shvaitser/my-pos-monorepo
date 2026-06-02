import { type AxiosInstance } from "axios";
import { type LoginCredentials, type SessionData } from "@repo/types";

export const createAuthService = (client: AxiosInstance) => ({
  login: async (credentials: LoginCredentials) => {
    const { data } = await client.post<SessionData>("/auth/login", credentials);
    return data;
  },
  logout: async () => {
    await client.post("/auth/logout");
  },
});

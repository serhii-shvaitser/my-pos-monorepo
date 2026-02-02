import { type AxiosInstance } from "axios";
import { type PinLoginRequest, type AuthResponse } from "@repo/types";

export const createAuthService = (client: AxiosInstance) => ({
  loginWithPin: async (data: PinLoginRequest) => {
    const response = await client.post<AuthResponse>("/auth/pin", data);
    return response.data;
  },
  // verifyToken: async () => {
  //   const { data } = await client.get("/auth/verify");
  //   return data;
  // },
});

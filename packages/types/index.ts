import { z } from "zod";
import { TableSchema } from "@repo/db";

export type Table = z.infer<typeof TableSchema>;

// User

export type UserRole = "admin" | "waiter" | "manager" | "cook";

export interface User {
  name: string;
  role: UserRole;
}

// API

export interface ApiConfig {
  baseURL: string;
  getAccessToken: () => string | null;
  refreshToken: () => Promise<string>;
  onUnauthorized: () => void;
  onTokenRefreshed: (newToken: string) => void;
}

export const LoginCredentialsSchema = z.object({
  code: z.string(),
  pin: z.string().length(4, "Pin must be 4 digits"),
});

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;

export interface SessionData {
  user: User;
  accessToken: string;
}

export const TablesResponseSchema = z.array(TableSchema);

export type TablesResponse = z.infer<typeof TablesResponseSchema>;

export interface FailedRequest {
  onSuccess: (newAccessToken: string) => void;
  onFailure: () => void;
}

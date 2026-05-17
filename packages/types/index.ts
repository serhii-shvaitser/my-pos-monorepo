import { z } from "zod";
import {
  SelectTableSchema,
  SelectProductSchema,
  SelectCategorySchema,
  SelectOrderSchema,
  SelectOrderItemSchema,
} from "@repo/db";

export type Product = z.infer<typeof SelectProductSchema>;
export type Order = z.infer<typeof SelectOrderSchema>;
export type Table = z.infer<typeof SelectTableSchema>;

// POS system

export const PosMenuSchema = z.object({
  categories: z.array(SelectCategorySchema),
  products: z.array(SelectProductSchema),
});

export type PosMenuResponse = z.infer<typeof PosMenuSchema>;

// Login

export type UserRole = "admin" | "waiter" | "manager" | "cook";

export interface User {
  name: string;
  role: UserRole;
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

// Orders

export const OrderWithItemsSchema = SelectOrderSchema.extend({
  items: z.array(
    SelectOrderItemSchema.extend({
      product: SelectProductSchema,
    }),
  ),
});

export const OrdersResponseSchema = z.array(OrderWithItemsSchema);
export type OrdersResponse = z.infer<typeof OrdersResponseSchema>;
export type OrderResponse = OrdersResponse[0];

// Tables

export const TablesResponseSchema = z.array(SelectTableSchema);
export type TablesResponse = z.infer<typeof TablesResponseSchema>;

// API

export interface ApiConfig {
  baseURL: string;
  getAccessToken: () => string | null;
  refreshToken: () => Promise<string>;
  onUnauthorized: () => void;
  onTokenRefreshed: (newToken: string) => void;
}

export interface FailedRequest {
  onSuccess: (newAccessToken: string) => void;
  onFailure: () => void;
}

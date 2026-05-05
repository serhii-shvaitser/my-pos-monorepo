import { z } from "zod";

// Menu

// export interface MenuItem {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   imageUrl: string;
//   isAvailable: boolean;
// }

// Order

// export type OrderStatus =
//   | "pending"
//   | "preparing"
//   | "ready"
//   | "served"
//   | "paid"
//   | "cancelled";

// export interface Order {
//   id: string;
//   tableId: string;
//   items: OrderItem[];
//   status: OrderStatus;
//   totalPrice: number;
//   createdAt: Date;
// }

// export interface OrderItem extends MenuItem {
//   quantity: number;
//   comment?: string;
// }

// Table

export const TableStatusSchema = z.enum(["free", "occupied", "reserved"]);

export const TableSchema = z.object({
  id: z.string(),
  number: z.number(),
  capacity: z.number(),
  status: TableStatusSchema,
  currentOrderId: z.string().optional(),
});

export type TableStatus = z.infer<typeof TableStatusSchema>;
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
  getToken: () => string | null | Promise<string | null>;
  refreshToken: () => Promise<string | null>;
  onUnauthorized?: () => void;
}

export const LoginRequestSchema = z.object({
  code: z.string(),
  pin: z.string().length(4, "Pin must be 4 digits"),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export const TablesResponseSchema = z.object({
  tables: z.array(TableSchema),
});

export type TablesResponse = z.infer<typeof TablesResponseSchema>;

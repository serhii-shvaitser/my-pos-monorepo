import { z } from "zod";

// Menu

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
}

// Order

export type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "served"
  | "paid"
  | "cancelled";

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalPrice: number;
  createdAt: Date;
}

export interface OrderItem extends MenuItem {
  quantity: number;
  comment?: string;
}

// Table

export const TableStatusSchema = z.enum(["free", "occupied", "reserved"]);

export const TableSchema = z.object({
  id: z.string(),
  number: z.number(),
  capacity: z.number(),
  status: TableStatusSchema,
  currentOrderId: z.string().optional(),
});

export const TablesResponseSchema = z.object({
  tables: z.array(TableSchema),
});

export type TableStatus = z.infer<typeof TableStatusSchema>;
export type Table = z.infer<typeof TableSchema>;

// User

export type UserRole = "admin" | "waiter" | "manager" | "cook";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  permissions: string[];
}

// API
export interface PinLoginRequest {
  pin: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type TablesResponse = z.infer<typeof TablesResponseSchema>;

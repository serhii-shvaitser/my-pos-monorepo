// User, Table, Order, MenuItem,

export type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "served"
  | "paid"
  | "cancelled";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
}

export interface OrderItem extends MenuItem {
  quantity: number;
  comment?: string;
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalPrice: number;
  createdAt: Date;
}

export interface Table {
  id: number;
  number: number;
  capacity: number;
  status: "free" | "occupied" | "reserved";
  currentOrderId?: string;
}

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

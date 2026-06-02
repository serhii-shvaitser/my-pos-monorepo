import type React from "react";
import type { Product, OrderResponse } from "@repo/types";

export interface OrderItemProps {
  orderItemData: Pick<Product, "name" | "price">;
  quantityAction?: React.ReactNode;
  removeAction?: React.ReactNode;
}

export type LocalOrderItem = {
  productId: string;
  quantity: number;
  product: Product;
};

export interface LocalOrder extends Omit<OrderResponse, "items"> {
  items: LocalOrderItem[];
}

export type OrderState = {
  currentOrder: LocalOrder | null;
};

export type QuantityAction = "increase" | "decrease";

export type OrderAction = {
  setOrder: (order: OrderState["currentOrder"]) => void;
  clearOrder: () => void;
  addOrderItem: (product: Product) => void;
  removeOrderItem: (productId: string) => void;
  updateQuantity: (productId: string, action: QuantityAction) => void;
};

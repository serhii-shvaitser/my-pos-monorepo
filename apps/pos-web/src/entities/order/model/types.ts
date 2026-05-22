import type { Product, OrderItem } from "@repo/types";

export interface OrderItemProps {
  orderItemData: Pick<Product, "name" | "price">;
  quantity: Pick<OrderItem, "quantity">;
}

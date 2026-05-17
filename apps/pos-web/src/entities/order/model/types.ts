import { type Product } from "@repo/types";

export interface OrderItemProps {
  orderItemData: Pick<Product, "name" | "price">;
}

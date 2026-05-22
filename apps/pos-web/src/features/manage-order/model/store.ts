import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { OrderResponse, Product } from "@repo/types";

export type OrderItem = Omit<
  NonNullable<OrderResponse>["items"][number],
  "id" | "orderId" | "unitPrice" | "status"
>;

type OrderState = {
  orderItems: OrderItem[];
  totalAmount: number;
};

type OrderAction = {
  setOrderItems: (orderItems: OrderState["orderItems"]) => void;
  addOrderItem: (product: Product) => void;
};

const calculateTotal = (items: OrderItem[]): number => {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
};

export const useOrderStore = create<OrderState & OrderAction>()(
  devtools((set) => ({
    orderItems: [],
    totalAmount: 0,

    setOrderItems: (orderItems) => {
      set(
        {
          orderItems,
          totalAmount: calculateTotal(orderItems),
        },
        undefined,
        "order/setOrderItems",
      );
    },

    addOrderItem: (product: Product) =>
      set(
        (state) => {
          const existingItemIndex = state.orderItems.findIndex(
            (item) => item.productId === product.id,
          );

          let updatedItems: OrderItem[];

          if (existingItemIndex !== -1) {
            // Якщо товар вже є в кошику — збільшуємо його кількість на +1
            updatedItems = [...state.orderItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + 1,
            };
          } else {
            const newItem: OrderItem = {
              productId: product.id,
              quantity: 1,
              product: product,
            };
            updatedItems = [...state.orderItems, newItem];
          }

          return {
            orderItems: updatedItems,
            totalAmount: calculateTotal(updatedItems),
          };
        },
        undefined,
        "order/addOrderItem",
      ),
  })),
);

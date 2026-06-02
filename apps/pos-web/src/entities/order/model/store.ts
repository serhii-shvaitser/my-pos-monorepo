import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Product } from "@repo/types";
import type {
  OrderState,
  OrderAction,
  LocalOrderItem,
  QuantityAction,
} from "./types";

const calculateTotal = (items: LocalOrderItem[]): number => {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
};

export const useOrderStore = create<OrderState & OrderAction>()(
  devtools(
    immer((set) => ({
      currentOrder: null,

      setOrder: (order) => {
        set(
          {
            currentOrder: order,
          },
          undefined,
          "order/setOrder",
        );
      },

      clearOrder: () => {
        set(
          {
            currentOrder: null,
          },
          undefined,
          "order/clearOrder",
        );
      },

      addOrderItem: (product: Product) =>
        set(
          (state: OrderState) => {
            if (!state.currentOrder) return;

            const existingItem = state.currentOrder?.items.find(
              (item) => item.product.id === product.id,
            );

            if (existingItem) {
              existingItem.quantity = existingItem.quantity + 1;
            } else {
              state.currentOrder?.items.push({
                productId: product.id,
                quantity: 1,
                product: product,
              });
            }

            state.currentOrder.totalAmount = calculateTotal(
              state.currentOrder.items,
            );
          },
          undefined,
          "order/addOrderItem",
        ),

      removeOrderItem: (productId: string) =>
        set(
          (state: OrderState) => {
            if (!state.currentOrder) return;

            const itemIndex = state.currentOrder.items.findIndex(
              (item) => item.productId === productId,
            );

            if (itemIndex !== -1) {
              state.currentOrder.items.splice(itemIndex, 1);
            }

            state.currentOrder.totalAmount = calculateTotal(
              state.currentOrder.items,
            );
          },
          undefined,
          "order/removeOrderItem",
        ),

      updateQuantity: (productId: string, action: QuantityAction) =>
        set(
          (state) => {
            if (!state.currentOrder) return;

            const itemIndex = state.currentOrder.items.findIndex(
              (item) => item.productId === productId,
            );

            if (itemIndex === -1) return;

            const item = state.currentOrder.items[itemIndex];

            if (action === "increase") {
              item.quantity += 1;
            } else if (action === "decrease") {
              if (item.quantity > 1) {
                item.quantity -= 1;
              } else {
                state.currentOrder.items.splice(itemIndex, 1);
              }
            }

            state.currentOrder.totalAmount = calculateTotal(
              state.currentOrder.items,
            );
          },
          undefined,
          "order/updateQuantity",
        ),
    })),
  ),
);

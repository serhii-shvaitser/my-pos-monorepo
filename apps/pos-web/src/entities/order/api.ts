import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrdersService } from "@repo/api-client";
import { client } from "@/shared/api";
import { type OrdersResponse } from "@repo/types";
import { type LocalOrderItem } from "./model/types";

export const ordersApi = createOrdersService(client);

export function useOrders() {
  const { isPending, isError, error, data } = useQuery<OrdersResponse>({
    queryKey: ["orders"],
    queryFn: () => ordersApi.getOrders(),
  });
  return { isPending, isError, error, data };
}

export function useSaveOrder() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: ({
      orderId,
      orderItems,
    }: {
      tableId: string;
      orderId: string;
      orderItems: Omit<LocalOrderItem, "product">[];
    }) => {
      const sanitizesOrderItems = orderItems.map(({ productId, quantity }) => ({
        productId,
        quantity,
      }));
      return ordersApi.saveOrder(orderId, sanitizesOrderItems);
    },
    onSuccess: (_data, { tableId }) => {
      queryClient.invalidateQueries({
        queryKey: ["orders", "active", tableId],
      });
    },
    onError: () => {
      // TODO: implement error handler
    },
  });
  return { saveOrder: mutate, isPending };
}

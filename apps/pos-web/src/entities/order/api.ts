import { useQuery } from "@tanstack/react-query";
import { createOrdersService } from "@repo/api-client";
import { client } from "@/entities/session";
import { tablesApi } from "@/entities/table";
import { type OrderResponse, type OrdersResponse } from "@repo/types";

export const ordersApi = createOrdersService(client);

export function useOrders() {
  const { isPending, isError, error, data } = useQuery<OrdersResponse>({
    queryKey: ["orders"],
    queryFn: () => ordersApi.getOrders(),
  });
  return { isPending, isError, error, data };
}

export function useTableOrder(tableId: string) {
  const { isPending, isError, error, data } = useQuery<OrderResponse>({
    queryKey: ["orders", "active", tableId],
    queryFn: () => tablesApi.getTableOrder(tableId),
    enabled: !!tableId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  return { isPending, isError, error, data };
}

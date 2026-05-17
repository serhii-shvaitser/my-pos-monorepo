import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "@/shared/lib/api";
import { type OrderResponse, type OrdersResponse } from "@repo/types";

export function useOrders() {
  const { isPending, isError, error, data } = useQuery<OrdersResponse>({
    queryKey: ["orders"],
    queryFn: () => ordersApi.getOrders(),
  });
  return { isPending, isError, error, data };
}

export function useActiveOrder(tableId: string) {
  const { isPending, isError, error, data } = useQuery<OrderResponse | null>({
    queryKey: ["orders", "active", tableId],
    queryFn: () => ordersApi.getActiveOrder(tableId),
    enabled: !!tableId,
  });
  return { isPending, isError, error, data };
}

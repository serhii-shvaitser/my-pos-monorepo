import { useQuery } from "@tanstack/react-query";
import { createTablesService } from "@repo/api-client";
import type { TablesResponse, OrderResponse } from "@repo/types";
import { client } from "@/shared/api";

export const tablesApi = createTablesService(client);

export function useTables() {
  const { isPending, isError, error, data } = useQuery<TablesResponse>({
    queryKey: ["tables"],
    queryFn: tablesApi.getTables,
  });
  return { isPending, isError, error, data };
}

export function useTableOrder(tableId: string) {
  const { isLoading } = useQuery<OrderResponse>({
    queryKey: ["orders", "active", tableId],
    queryFn: () => tablesApi.getTableOrder(tableId),
    enabled: !!tableId,
    staleTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
  });

  return { isLoading };
}

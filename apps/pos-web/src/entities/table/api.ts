import { useQuery } from "@tanstack/react-query";
import { createTablesService } from "@repo/api-client";
import { type TablesResponse } from "@repo/types";
import { client } from "@/entities/session";

export const tablesApi = createTablesService(client);

export function useTables() {
  const { isPending, isError, error, data } = useQuery<TablesResponse>({
    queryKey: ["tables"],
    queryFn: tablesApi.getTables,
  });
  return { isPending, isError, error, data };
}

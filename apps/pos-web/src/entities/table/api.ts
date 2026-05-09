import { useQuery } from "@tanstack/react-query";
import { tablesApi } from "@/shared/lib/api";
import { type TablesResponse } from "@repo/types";

export function useTables() {
  const { isPending, isError, error, data } = useQuery<TablesResponse>({
    queryKey: ["tables"],
    queryFn: tablesApi.getTables,
  });
  return { isPending, isError, error, data };
}

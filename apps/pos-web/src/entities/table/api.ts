import { useQuery } from "@tanstack/react-query";
import { tablesApi } from "@/shared/lib/api";

export function useTables() {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["tables"],
    queryFn: tablesApi.getTables,
  });
  return { isPending, isError, error, data };
}

import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/shared/lib/api";
import { type PosMenuResponse } from "@repo/types";

export function usePosMenu() {
  const { isPending, isError, error, data } = useQuery<PosMenuResponse>({
    queryKey: ["pos-menu"],
    queryFn: productsApi.getPosMenu,
  });
  return { isPending, isError, error, data };
}

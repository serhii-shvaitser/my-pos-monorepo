import { type AxiosInstance } from "axios";
import type { PosMenuResponse } from "@repo/types";

export const createProductsService = (client: AxiosInstance) => ({
  getPosMenu: async (): Promise<PosMenuResponse> => {
    const { data } = await client.get<PosMenuResponse>("/pos/menu");
    return data;
  },
});

import { type AxiosInstance } from "axios";
import { type OrderResponse } from "@repo/types";

export const createOrdersService = (client: AxiosInstance) => ({
  getOrders: async (): Promise<OrderResponse[]> => {
    const { data } = await client.get<OrderResponse[]>(`/orders`);
    return data;
  },
  getActiveOrder: async (tableId: string): Promise<OrderResponse | null> => {
    const { data } = await client.get<OrderResponse[]>(
      `/orders?status=open&tableId=${tableId}`,
    );
    if (!data || data.length === 0) {
      return null;
    }

    return data[0];
  },
});

import { type AxiosInstance } from "axios";
import { type OrderResponse } from "@repo/types";

export const createOrdersService = (client: AxiosInstance) => ({
  getOrders: async (): Promise<OrderResponse[]> => {
    const { data } = await client.get<OrderResponse[]>(`/orders`);
    return data;
  },
  saveOrder: async (orderId: string, items: any) => {
    const response = await client.post<OrderResponse[]>(
      `/orders/${orderId}/items`,
      items,
    );
    return response.data;
  },
});

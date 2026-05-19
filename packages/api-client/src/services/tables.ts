import { type AxiosInstance } from "axios";
import type { TablesResponse, Table, OrderResponse } from "@repo/types";

export const createTablesService = (client: AxiosInstance) => ({
  getTables: async (): Promise<TablesResponse> => {
    const { data } = await client.get<TablesResponse>("/tables");
    return data;
  },
  updateTables: async (tableId: string, data: Partial<Table>) => {
    await client.patch(`/tables/${tableId}`, data);
  },
  getTableOrder: async (tableId: string): Promise<OrderResponse> => {
    const { data } = await client.post<OrderResponse>(
      `/tables/${tableId}/active-order`,
      null,
    );
    return data;
  },
});

import { type AxiosInstance } from "axios";
import { type TablesResponse, type Table } from "@repo/types";

export const createTablesService = (client: AxiosInstance) => ({
  getTables: async (): Promise<TablesResponse> => {
    const { data } = await client.get<TablesResponse>("/tables");
    return data;
  },
  updateTables: async (tableId: string, data: Partial<Table>) => {
    await client.patch(`/tables/${tableId}`, data);
  },
});

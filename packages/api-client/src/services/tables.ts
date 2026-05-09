import { type AxiosInstance } from "axios";
import {
  TablesResponseSchema,
  type TablesResponse,
  type Table,
} from "@repo/types";

export const createTablesService = (client: AxiosInstance) => ({
  getTables: async (): Promise<TablesResponse> => {
    const { data } = await client.get("/tables");
    return TablesResponseSchema.parse(data);
  },
  updateTables: async (tableId: string, data: Partial<Table>) => {
    await client.patch(`/tables/${tableId}`, data);
  },
});

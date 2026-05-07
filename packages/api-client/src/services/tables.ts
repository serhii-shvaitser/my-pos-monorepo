import { type AxiosInstance } from "axios";
import { TablesResponseSchema, type TablesResponse } from "@repo/types";

export const createTablesService = (client: AxiosInstance) => ({
  getTables: async (): Promise<TablesResponse> => {
    // const response = await client.get("/tables");

    // TODO: Error handling implementation

    return TablesResponseSchema.parse({ tables: [] });
  },
});

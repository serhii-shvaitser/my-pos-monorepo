import { type Table } from "@repo/types";

export interface TableCardProps {
  tableData: Pick<Table, "number" | "capacity" | "status">;
}

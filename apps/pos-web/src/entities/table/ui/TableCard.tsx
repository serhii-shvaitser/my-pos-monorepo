import { type TableCardProps } from "@/entities/table/model/types";

export function TableCard({ tableData }: TableCardProps) {
  const { capacity } = tableData;
  return (
    <div className="w-[300px] bg-amber-600">
      <div>Table card header. Capacity: {capacity}</div>
    </div>
  );
}

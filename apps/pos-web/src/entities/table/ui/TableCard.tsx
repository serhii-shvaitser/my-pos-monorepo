import { type TableCardProps } from "@/entities/table/model/types";

export function TableCard({ tableData }: TableCardProps) {
  const { capacity, number, status } = tableData;
  return (
    <div className="w-[300px] bg-amber-600">
      <p>Table №{number}</p>
      <p>Capacity: {capacity}</p>
      <p>Status: {status}</p>
    </div>
  );
}

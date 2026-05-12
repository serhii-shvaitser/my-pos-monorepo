import { TableCard } from "@/entities/table";
import { useTables } from "@/entities/table/api";

export function TablesGrid() {
  const { isPending, isError, error, data } = useTables();

  if (isPending) {
    return <p>Tables are loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong {error?.message}</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {data?.map((table) => (
        <TableCard key={table.id} tableData={table} />
      ))}
    </div>
  );
}

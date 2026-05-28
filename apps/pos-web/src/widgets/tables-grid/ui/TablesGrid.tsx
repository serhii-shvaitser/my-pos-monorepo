import { Link } from "@tanstack/react-router";
import { TableCard, useTables } from "@/entities/table";

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
        <Link to={table.id} key={table.id}>
          <TableCard tableData={table} />
        </Link>
      ))}
    </div>
  );
}

import { useParams } from "@tanstack/react-router";

import { ActiveOrder } from "@/widgets/active-order";
import { PosMenu } from "@/widgets/menu";

export function OrderPage() {
  const { tableId } = useParams({ from: "/_authenticated/tables/$tableId" });

  return (
    <div className="flex flex-1 items-stretch gap-2">
      <ActiveOrder tableId={tableId} />
      <PosMenu />
    </div>
  );
}

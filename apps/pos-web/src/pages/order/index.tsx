import { useParams } from "@tanstack/react-router";

import { ActiveOrder } from "@/widgets/active-order";
import { PosMenu } from "@/widgets/menu";

export function OrderPage() {
  const { tableId } = useParams({ from: "/_authenticated/tables/$tableId" });

  return (
    <div className="flex gap-2 items-stretch flex-1">
      <ActiveOrder tableId={tableId} />
      <PosMenu />
    </div>
  );
}

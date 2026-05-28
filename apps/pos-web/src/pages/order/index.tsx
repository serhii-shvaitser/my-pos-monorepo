import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";

import { ActiveOrder } from "@/widgets/active-order";
import { PosMenu } from "@/widgets/menu";

import { useTableOrder } from "@/entities/order";
import { useOrderStore } from "@/features/manage-order";

export function OrderPage() {
  const { tableId } = useParams({ from: "/_authenticated/tables/$tableId" });
  const { data: activeOrder } = useTableOrder(tableId);
  const { setOrderItems } = useOrderStore();

  useEffect(() => {
    if (activeOrder) {
      setOrderItems(activeOrder.items);
    }
  }, [activeOrder, setOrderItems]);

  return (
    <div className="flex gap-2 items-stretch flex-1">
      <ActiveOrder />
      <PosMenu />
    </div>
  );
}

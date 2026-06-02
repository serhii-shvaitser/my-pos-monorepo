import { formatPrice } from "@/shared/lib/utils";
import { type OrderItemProps } from "../model/types";

import { Separator } from "@/shared/ui/separator";

export function OrderListItem({
  orderItemData,
  quantityAction,
  removeAction,
}: OrderItemProps) {
  const { name, price } = orderItemData;
  return (
    <>
      <div className="flex justify-between gap-2 py-2 text-xs">
        <div className="flex flex-1 gap-2 items-center justify-between">
          <p className="truncate">{name}</p>
          <span>{formatPrice(price)}</span>
        </div>
        <div className="flex gap-2">
          {quantityAction}
          {removeAction}
        </div>
      </div>
      <Separator />
    </>
  );
}

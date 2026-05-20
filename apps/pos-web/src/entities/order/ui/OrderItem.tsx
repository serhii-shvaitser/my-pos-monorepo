import { formatPrice } from "@/shared/lib/utils";

import { type OrderItemProps } from "@/entities/order/model/types";
import { Separator } from "@/shared/ui/separator";

export function OrderItem({ orderItemData, quantity }: OrderItemProps) {
  const { name, price } = orderItemData;
  return (
    <>
      <div className="flex justify-between py-2 text-xs">
        <p>
          {name} ({quantity})
        </p>
        <span>{formatPrice(price)}</span>
      </div>
      <Separator />
    </>
  );
}

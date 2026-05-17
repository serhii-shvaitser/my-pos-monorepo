import { type OrderItemProps } from "@/entities/order/model/types";
import { Separator } from "@/shared/ui/separator";

export function OrderItem({ orderItemData }: OrderItemProps) {
  const { name, price } = orderItemData;
  return (
    <>
      <div className="flex justify-between py-2">
        <p>{name}</p>
        <span>{(price / 100).toFixed(2)}</span>
      </div>
      <Separator />
    </>
  );
}

import { cn, formatPrice } from "@/shared/lib/utils";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";

import { OrderListItem } from "@/entities/order";
import { EmptyState } from "./EmptyState";

import { useOrderStore } from "@/features/manage-order";

export function ActiveOrder() {
  const orderItems = useOrderStore((store) => store.orderItems);
  const totalAmount = useOrderStore((store) => store.totalAmount);

  return (
    <Card className="flex-1 p-0 overflow-hidden">
      <CardHeader className="p-2 gap-0 bg-gray-50 border-b">
        <CardTitle>Current Order</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 tex-sm px-4">
        {!orderItems?.length ? (
          <EmptyState />
        ) : (
          <ScrollArea className="flex-1 h-full w-full">
            {orderItems.map((oderItem) => (
              <OrderListItem
                key={oderItem.productId}
                orderItemData={oderItem.product}
                quantity={oderItem.quantity}
              />
            ))}
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="p-2 bg-gray-50 border-t">
        <p>Total: {formatPrice(totalAmount)}</p>
      </CardFooter>
    </Card>
  );
}

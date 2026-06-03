import { useShallow } from "zustand/react/shallow";
import { OrderListItem, useOrderStore } from "@/entities/order";
import { useTableOrder } from "@/entities/table";
import { type ActiveOrderProps } from "../model/types";
import { formatPrice } from "@/shared/lib/utils";

import { ChangeOrderItemQuantity } from "@/features/change-order-item-quantity";
import { RemoveOrderItemButton } from "@/features/remove-order-item-button";
import { SendToKitchenButton } from "@/features/send-to-kitchen-button";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Badge } from "@/shared/ui/badge";

import { EmptyState } from "./EmptyState";
import { ActiveOrderSkeleton } from "./ActiveOrderSkeleton";

export function ActiveOrder({ tableId }: ActiveOrderProps) {
  const { isLoading } = useTableOrder(tableId);

  const { orderStatus, orderItems, orderTotalAmount } = useOrderStore(
    useShallow((state) => ({
      orderStatus: state.currentOrder?.status,
      orderItems: state.currentOrder?.items,
      orderTotalAmount: state.currentOrder?.totalAmount,
    })),
  );

  if (isLoading) {
    return <ActiveOrderSkeleton />;
  }

  return (
    <Card className="flex-1 overflow-hidden p-0">
      <CardHeader className="gap-0 border-b bg-gray-50 p-2">
        <CardTitle className="flex items-center justify-between">
          <span>Current Order</span>
          <Badge className="bg-green-200 text-green-700 dark:bg-green-950 dark:text-green-300">
            {orderStatus}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-4 text-sm">
        {!orderItems?.length ? (
          <EmptyState />
        ) : (
          <>
            <ScrollArea className="h-full w-full flex-1">
              {orderItems.map(({ productId, product, quantity }) => (
                <OrderListItem
                  key={productId}
                  orderItemData={product}
                  quantityAction={
                    <ChangeOrderItemQuantity
                      productId={productId}
                      quantity={quantity}
                    />
                  }
                  removeAction={<RemoveOrderItemButton productId={productId} />}
                />
              ))}
            </ScrollArea>
            <div className="flex justify-end">
              <p>Total: {formatPrice(orderTotalAmount)}</p>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="border-t bg-gray-50 px-0">
        <SendToKitchenButton tableId={tableId} />
      </CardFooter>
    </Card>
  );
}

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
    <Card className="flex-1 p-0 overflow-hidden">
      <CardHeader className="p-2 gap-0 bg-gray-50 border-b">
        <CardTitle className="flex justify-between items-center">
          <span>Current Order</span>
          <Badge className="bg-green-200 text-green-700 dark:bg-green-950 dark:text-green-300">
            {orderStatus}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 text-sm px-4">
        {!orderItems?.length ? (
          <EmptyState />
        ) : (
          <>
            <ScrollArea className="flex-1 h-full w-full">
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
      <CardFooter className="bg-gray-50 border-t px-0">
        <SendToKitchenButton tableId={tableId} />
      </CardFooter>
    </Card>
  );
}

import { useShallow } from "zustand/react/shallow";
import { useOrderStore } from "@/entities/order";

import { OrderItemsList } from "./OrderItemsList";

import { useTableOrder } from "@/entities/table";
import { type ActiveOrderProps } from "../model/types";
import { formatPrice } from "@/shared/lib/utils";

import { SendToKitchenButton } from "@/features/send-to-kitchen-button";

import { Card, CardHeader, CardContent, CardTitle } from "@/shared/ui/card";
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
      orderTotalAmount: state.currentOrder?.totalAmount || 0,
    })),
  );

  if (isLoading) {
    return <ActiveOrderSkeleton />;
  }

  return (
    <Card className="flex-1 gap-0 overflow-hidden p-0">
      <CardHeader className="gap-0 border-b bg-gray-50 p-2">
        <CardTitle className="flex items-center justify-between">
          <span>Current Order</span>
          {orderStatus && (
            <Badge className="bg-green-200 text-green-700 dark:bg-green-950 dark:text-green-300">
              {orderStatus}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4 p-4 text-sm">
        {!orderItems?.length ? (
          <EmptyState />
        ) : (
          <div className="flex flex-1 flex-col justify-between gap-2">
            <ScrollArea className="h-full w-full flex-1">
              <OrderItemsList items={orderItems} />
            </ScrollArea>
            <div className="flex justify-end">
              <p>Total: {formatPrice(orderTotalAmount)}</p>
            </div>
          </div>
        )}
        <SendToKitchenButton tableId={tableId} />
      </CardContent>
    </Card>
  );
}

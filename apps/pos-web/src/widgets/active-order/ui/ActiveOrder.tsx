import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";

import { useActiveOrder, OrderItem } from "@/entities/order";
import { EmptyState } from "./EmptyState";

export function ActiveOrder({ tableId }: { tableId: string }) {
  const { data: order } = useActiveOrder(tableId);

  return (
    <Card className="flex-1 p-0 overflow-hidden">
      <CardHeader className="p-6 bg-gray-50 border-b">
        <CardTitle>Current Order</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {!order ? (
          <EmptyState />
        ) : (
          <ScrollArea>
            {order.items.map((oderItem) => (
              <OrderItem orderItemData={oderItem.product} />
            ))}
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="p-6 bg-gray-50 border-t">
        <p>Order Footer</p>
      </CardFooter>
    </Card>
  );
}

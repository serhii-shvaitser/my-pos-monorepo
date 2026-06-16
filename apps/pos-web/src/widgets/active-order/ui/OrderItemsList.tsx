import { type LocalOrderItem } from "@/entities/order";
import { formatPrice } from "@/shared/lib/utils";
import { ChangeOrderItemQuantity } from "@/features/change-order-item-quantity";
import { RemoveOrderItemButton } from "@/features/remove-order-item-button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./OrderItemsListAccordion";

export function OrderItemsList({ items }: { items: LocalOrderItem[] }) {
  return (
    <Accordion type="single" collapsible>
      {items.map(({ productId, product, quantity }) => (
        <AccordionItem key={productId} value={productId} className="py-0">
          <AccordionTrigger className="py-2">
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-1 justify-between">
                <span>{product.name}</span>
                <RemoveOrderItemButton productId={productId} />
              </div>
              <div className="flex flex-1 justify-between text-xs">
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span>{formatPrice(product.price)}</span>
                    <span>x{quantity}</span>
                  </div>
                </div>
                <span>{formatPrice(product.price * quantity)}</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pl-6">
              <ChangeOrderItemQuantity
                productId={productId}
                quantity={quantity}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

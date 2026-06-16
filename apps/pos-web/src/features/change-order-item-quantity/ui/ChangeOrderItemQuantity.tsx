import { useOrderStore } from "@/entities/order";
import { type ChangeOrderItemQuantityProps } from "../model/types";
import { Button } from "@/shared/ui/button";
import { Plus, Minus } from "lucide-react";

export function ChangeOrderItemQuantity({
  productId,
  quantity,
}: ChangeOrderItemQuantityProps) {
  const updateQuantity = useOrderStore((state) => state.updateQuantity);
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={() => updateQuantity(productId, "decrease")}
      >
        <Minus />
      </Button>
      <span>{quantity}</span>
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={() => updateQuantity(productId, "increase")}
      >
        <Plus />
      </Button>
    </div>
  );
}

import { useOrderStore } from "@/entities/order";
import { type ChangeOrderItemQuantityProps } from "../model/types";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Plus, Minus } from "lucide-react";

export function ChangeOrderItemQuantity({
  productId,
  quantity,
}: ChangeOrderItemQuantityProps) {
  const updateQuantity = useOrderStore((state) => state.updateQuantity);
  return (
    <>
      <ButtonGroup>
        <Button
          variant="secondary"
          size="xs"
          onClick={() => updateQuantity(productId, "decrease")}
        >
          <Minus />
        </Button>
        <div className="border px-2 flex items-center">
          <span>{quantity}</span>
        </div>
        <Button
          variant="secondary"
          size="xs"
          onClick={() => updateQuantity(productId, "increase")}
        >
          <Plus />
        </Button>
      </ButtonGroup>
    </>
  );
}

import { useOrderStore } from "@/entities/order";

import { type RemoveOrderItemButtonProps } from "../model/types";
import { Button } from "@/shared/ui/button";
import { Trash2 } from "lucide-react";

export function RemoveOrderItemButton({
  productId,
}: RemoveOrderItemButtonProps) {
  const { removeOrderItem } = useOrderStore();

  return (
    <Button
      variant="destructive"
      size="xs"
      onClick={() => removeOrderItem(productId)}
    >
      <Trash2 />
    </Button>
  );
}

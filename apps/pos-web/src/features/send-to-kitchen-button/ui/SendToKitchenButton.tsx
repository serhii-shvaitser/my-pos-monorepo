import { useShallow } from "zustand/react/shallow";
import { useOrderStore, useSaveOrder } from "@/entities/order";
import { type SendToKitchenButtonProps } from "../model/types";

import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";

export function SendToKitchenButton({ tableId }: SendToKitchenButtonProps) {
  const { saveOrder, isPending } = useSaveOrder();

  const { orderId, orderItems } = useOrderStore(
    useShallow((state) => ({
      orderId: state.currentOrder?.id,
      orderItems: state.currentOrder?.items,
    })),
  );

  const isButtonDisabled =
    !orderItems || orderItems.length === 0 || !orderId || isPending;

  const handleSend = () => {
    if (isButtonDisabled) {
      return;
    }
    saveOrder({ tableId, orderId, orderItems });
  };

  return (
    <Button
      variant="default"
      className="w-full rounded-t-none"
      disabled={isButtonDisabled}
      onClick={handleSend}
    >
      Send to kitchen
      {isPending && <Spinner data-icon="inline-start" />}
    </Button>
  );
}

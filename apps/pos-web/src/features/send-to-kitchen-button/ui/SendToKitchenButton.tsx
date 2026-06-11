import { useShallow } from "zustand/react/shallow";

import { useOrderStore, useSaveOrder } from "@/entities/order";
import { type SendToKitchenButtonProps } from "../model/types";
import { ActionButton } from "@/shared/ui";

export function SendToKitchenButton({ tableId }: SendToKitchenButtonProps) {
  const { saveOrder, isPending } = useSaveOrder();

  const { orderId, orderItems } = useOrderStore(
    useShallow((state) => ({
      orderId: state.currentOrder?.id,
      orderItems: state.currentOrder?.items,
    })),
  );

  const isDisabled =
    !orderItems || orderItems.length === 0 || !orderId || isPending;

  const handleSend = () => {
    if (isDisabled) {
      return;
    }
    saveOrder({ tableId, orderId, orderItems });
  };

  return (
    <ActionButton
      isDisabled={isDisabled}
      onClick={handleSend}
      isPending={isPending}
    >
      Send to kitchen
    </ActionButton>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { OrderPage } from "@/pages/order";
import { useOrderStore } from "@/entities/order";
import { tablesApi } from "@/entities/table";

export const Route = createFileRoute("/_authenticated/tables/$tableId")({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { tableId } }) => {
    const orderResponse = await queryClient.ensureQueryData({
      queryKey: ["orders", "active", tableId],
      queryFn: () => tablesApi.getTableOrder(tableId),
    });

    useOrderStore.getState().setOrder(orderResponse);
  },
  onLeave: () => {
    useOrderStore.getState().clearOrder();
  },
});

function RouteComponent() {
  return <OrderPage />;
}

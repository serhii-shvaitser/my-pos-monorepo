import { createFileRoute } from "@tanstack/react-router";
import { OrderPage } from "@/pages/order";

export const Route = createFileRoute("/_authenticated/tables/$tableId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderPage />;
}

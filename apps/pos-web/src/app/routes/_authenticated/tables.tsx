import { createFileRoute } from "@tanstack/react-router";
import TablesPage from "@/pages/tables";

export const Route = createFileRoute("/_authenticated/tables")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TablesPage />;
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tables")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Tables</div>;
}

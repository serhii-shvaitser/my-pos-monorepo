import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/tables/$tableId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/tables/$tableId"!</div>
}

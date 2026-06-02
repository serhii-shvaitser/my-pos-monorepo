import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/ui/empty";

import { UtensilsCrossed } from "lucide-react";

export function EmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UtensilsCrossed />
        </EmptyMedia>
        <EmptyTitle>No Menu Items</EmptyTitle>
        <EmptyDescription>
          Select items from the menu on the right to start an order for this
          table.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

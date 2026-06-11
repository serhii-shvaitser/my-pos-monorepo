import { cn } from "@/shared/lib/utils";

import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import type React from "react";

export interface ActionButtonProps extends React.ComponentPropsWithoutRef<
  typeof Button
> {
  className?: string;
  children: string;
  isDisabled: boolean;
  isPending: boolean;
}

export function ActionButton({
  isDisabled,
  isPending,
  children,
  className,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      variant="default"
      className={cn("w-full", className)}
      disabled={isDisabled}
      {...props}
    >
      {children}
      {isPending && <Spinner data-icon="inline-start" />}
    </Button>
  );
}

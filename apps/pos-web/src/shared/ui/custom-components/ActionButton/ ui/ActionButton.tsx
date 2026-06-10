import { cn } from "@/shared/lib/utils";
import { type ActionButtonProps } from "../model/types";

import { Button } from "../../../button";
import { Spinner } from "../../../spinner";

export function ActionButton({
  isButtonDisabled,
  handleSend,
  isPending,
  children,
  className,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      variant="default"
      className={cn("w-full", className)}
      disabled={isButtonDisabled}
      onClick={handleSend}
      {...props}
    >
      {children}
      {isPending && <Spinner data-icon="inline-start" />}
    </Button>
  );
}

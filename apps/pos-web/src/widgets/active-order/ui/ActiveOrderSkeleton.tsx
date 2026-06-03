import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/shared/ui/card";

import { Skeleton } from "@/shared/ui/skeleton";

export function ActiveOrderSkeleton() {
  return (
    <Card className="flex-1 overflow-hidden p-0">
      <CardHeader className="gap-0 border-b bg-gray-50 p-2">
        <CardTitle className="flex justify-between">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-4 text-sm">
        <>
          <div className="flex justify-between py-2 text-xs">
            <Skeleton className="mb-2 h-4 w-[250px]" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
          <Skeleton className="h-1 w-full" />
        </>
        <>
          <div className="flex justify-between py-4 text-xs">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
          <Skeleton className="h-1 w-full" />
        </>
        <>
          <div className="flex justify-between py-2 text-xs">
            <Skeleton className="mb-2 h-4 w-[250px]" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
          <Skeleton className="h-1 w-full" />
        </>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 p-2">
        <Skeleton />
      </CardFooter>
    </Card>
  );
}

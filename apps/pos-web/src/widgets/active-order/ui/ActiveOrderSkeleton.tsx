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
    <Card className="flex-1 p-0 overflow-hidden">
      <CardHeader className="p-2 gap-0 bg-gray-50 border-b">
        <CardTitle className="flex justify-between">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 text-sm px-4">
        <>
          <div className="flex justify-between py-2 text-xs">
            <Skeleton className="h-4 w-[250px] mb-2" />
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
            <Skeleton className="h-4 w-[250px] mb-2" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
          <Skeleton className="h-1 w-full" />
        </>
      </CardContent>
      <CardFooter className="p-2 bg-gray-50 border-t">
        <Skeleton />
      </CardFooter>
    </Card>
  );
}

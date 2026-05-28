import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/shared/ui/sonner";
import type { AppRouterContext } from "@/app/router";

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <Toaster position="top-center" />
      {/* <TanStackRouterDevtools /> */}
    </React.Fragment>
  );
}

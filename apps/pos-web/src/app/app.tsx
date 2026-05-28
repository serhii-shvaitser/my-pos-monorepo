import { useMemo } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { router, queryClient } from "@/app";
import { useSessionStore } from "@/entities/session";

export function App() {
  const accessToken = useSessionStore((state) => state.accessToken);

  const routerContext = useMemo(() => {
    return {
      queryClient,
      auth: {
        accessToken,
        isAuthenticated: !!accessToken,
      },
    };
  }, [accessToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={routerContext} />
    </QueryClientProvider>
  );
}

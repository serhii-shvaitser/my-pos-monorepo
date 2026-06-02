import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { router, queryClient } from "@/app";
import { useSessionStore } from "@/entities/session";

export function App() {
  const routerContext = {
    queryClient,
    auth: {
      get accessToken() {
        return useSessionStore.getState().accessToken;
      },
      get isAuthenticated() {
        return !!useSessionStore.getState().accessToken;
      },
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={routerContext} />
    </QueryClientProvider>
  );
}

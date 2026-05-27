import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/app/routeTree.gen";
import { QueryClient } from "@tanstack/react-query";

export interface AppRouterContext {
  queryClient: typeof queryClient;
  auth: {
    accessToken: string | null;
    isAuthenticated: boolean;
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
    },
  },
});

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: {
      accessToken: null,
      isAuthenticated: false,
    },
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

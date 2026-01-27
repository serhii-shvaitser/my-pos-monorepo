import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
// import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  // defaultPreload: 'intent',
  // scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// const rootElement = document.getElementById('app')!

// if (!rootElement.innerHTML) {
//   const root = ReactDOM.createRoot(rootElement)
//   root.render(<RouterProvider router={router} />)
// }

async function enableMocking() {
  // if (process.env.NODE_ENV !== 'development') {
  //   return
  // }

  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  const rootElement = document.getElementById("root")!;
  if (!rootElement.innerHTML) {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StrictMode>,
    );
  }
});

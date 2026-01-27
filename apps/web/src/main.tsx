import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
// import App from "./App.tsx";

const router = createRouter({
  routeTree,
  // defaultPreload: 'intent',
  // scrollRestoration: true,
});

// declare module "@tanstack/react-router" {
//   interface Register {
//     router: typeof router;
//   }
// }

// const rootElement = document.getElementById('app')!

// if (!rootElement.innerHTML) {
//   const root = ReactDOM.createRoot(rootElement)
//   root.render(<RouterProvider router={router} />)
// }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

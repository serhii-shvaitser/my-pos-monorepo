import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app";
import { refreshToken } from "@repo/api-client";
import { initApiClient } from "@/shared/api";
import { useSessionStore } from "@/entities/session";

import "@/app/index.css";

initApiClient({
  getAccessToken: () => useSessionStore.getState().accessToken,
  refreshToken: async () => refreshToken(),
  onUnauthorized: () => useSessionStore.getState().setAccessToken(null),
  onTokenRefreshed: (token) => useSessionStore.getState().setAccessToken(token),
});

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

import { http, HttpResponse, delay } from "msw";
import { type AuthResponse, type TablesResponse } from "@repo/types";
import { MOCK_USERS, MOCK_TABLES } from "./constants";

export const handlers = [
  http.post("/api/auth/pin", async ({ request }) => {
    const { pin } = (await request.json()) as { pin: string };

    // Simulate network lag
    await delay(2000);

    const user = MOCK_USERS[pin];

    if (!user) {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Invalid PIN",
      });
    }

    return HttpResponse.json({
      user,
      token: "fake-jwt-token",
    } satisfies AuthResponse);
  }),

  http.get("/api/tables", async () => {
    // Simulate network lag
    await delay(2000);

    const tables = MOCK_TABLES;

    return HttpResponse.json({
      tables,
    } satisfies TablesResponse);
  }),
];

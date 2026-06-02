import { createAuthService } from "@repo/api-client";
import { client } from "@/shared/api";

export const authApi = createAuthService(client);

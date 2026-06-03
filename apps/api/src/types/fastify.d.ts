import { NeonHttpDatabase } from "drizzle-orm/neon-http";
// import * as schema from "@repo/db";
import { createDb } from "@repo/db";

declare module "fastify" {
  interface FastifyInstance {
    // db: NeonHttpDatabase<typeof schema>;
    db: ReturnType<typeof createDb>;
  }
}

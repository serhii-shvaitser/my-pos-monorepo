import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "@repo/db";

declare module "fastify" {
  interface FastifyInstance {
    db: NeonHttpDatabase<typeof schema>;
  }
}

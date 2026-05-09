import { NeonHttpDatabase } from "drizzle-orm/neon-http";

declare module "fastify" {
  interface FastifyInstance {
    db: NeonHttpDatabase;
  }
}

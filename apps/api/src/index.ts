import "dotenv/config";

import Fastify, { FastifyError } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createDb } from "@repo/db";
import {
  authRoutes,
  tablesRoutes,
  productsRoutes,
  categoriesRoutes,
  ordersRoutes,
  posRoutes,
} from "./routes";

const start = async () => {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error(error);

    if (error.validation) {
      return reply.status(400).send({
        error: "Bad Request",
        message: "Validation failed",
        details: error.validation,
      });
    }

    return reply.status(error.statusCode || 500).send({
      error: error.name,
      message: error.message,
    });
  });

  const db = createDb(process.env.DATABASE_URL!);

  app.decorate("db", db);

  await app.register(cors, { origin: true, credentials: true });

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing in .env file");
  }

  await app.register(jwt, {
    secret: jwtSecret,
  });

  const cookieSecret = process.env.COOKIE_SECRET;

  if (!cookieSecret) {
    throw new Error("COOKIE_SECRET is missing in .env file");
  }

  await app.register(cookie, {
    secret: cookieSecret,
  });

  await app.register(authRoutes, { prefix: "/api/v1/auth" });

  await app.register(
    async (privateInstance) => {
      privateInstance.addHook("onRequest", async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch (err) {
          reply.send(err);
        }
      });

      await privateInstance.register(tablesRoutes);
      await privateInstance.register(productsRoutes);
      await privateInstance.register(categoriesRoutes);
      await privateInstance.register(ordersRoutes);
      await privateInstance.register(posRoutes);
    },
    { prefix: "/api/v1" },
  );

  const port = Number(process.env.PORT ?? 3001);

  await app.listen({ port, host: "0.0.0.0" });
};

// Top-level await workaround
start().catch((err) => {
  console.error(err);
  process.exit(1);
});

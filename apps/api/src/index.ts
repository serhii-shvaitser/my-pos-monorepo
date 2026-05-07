import "dotenv/config";

import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";

import { authRoutes } from "./routes/auth";

const start = async () => {
  const app = Fastify({ logger: true });

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

  const port = Number(process.env.PORT ?? 3001);

  await app.listen({ port, host: "0.0.0.0" });
};

// Top-level await workaround
start();

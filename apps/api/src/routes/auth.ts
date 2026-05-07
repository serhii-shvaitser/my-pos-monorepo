import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { staffTable, createDb } from "@repo/db";

import {
  LoginCredentialsSchema,
  type AuthResponse,
  type UserRole,
} from "@repo/types";

const db = createDb(process.env.DATABASE_URL!);

export async function authRoutes(app: FastifyInstance) {
  app.get(
    "/test-protected",
    {
      onRequest: [
        async (request, reply) => {
          try {
            await request.jwtVerify(); // Перевірка access токена
          } catch (err) {
            reply.send(err);
          }
        },
      ],
    },
    async () => {
      return { message: "Ви авторизовані! Access Token працює." };
    },
  );

  app.post("/login", async (request, reply) => {
    const authRequestValidation = LoginCredentialsSchema.safeParse(
      request.body,
    );

    if (!authRequestValidation.success) {
      return reply.status(400).send({
        error: "Invalid input",
        details: authRequestValidation.error!.issues,
      });
    }

    const { code, pin } = authRequestValidation.data;

    const user = await db
      .select()
      .from(staffTable)
      .where(eq(staffTable.code, code))
      .limit(1)
      .then((users) => users[0]);

    if (!user || !user.isActive) {
      return reply.status(401).send("Invalid credentials");
    }

    const isPinValid = await bcrypt.compare(pin, user.pinHash);

    if (!isPinValid) {
      return reply.status(401).send("Invalid credentials");
    }

    const accessToken = app.jwt.sign(
      { id: user.id, role: user.role },
      { expiresIn: "10s" },
    );

    const refreshToken = app.jwt.sign({ id: user.id }, { expiresIn: "7d" });

    reply.setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    const responseBody: AuthResponse = {
      accessToken,
      user: { name: user.name, role: user.role as UserRole },
    };

    return responseBody;
  });

  app.post("/logout", async (request, reply) => {
    reply
      .clearCookie("refreshToken", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      })
      .send("Logout successfully");
  });

  app.get("/refresh", async (request, reply) => {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      return reply.status(401).send({ error: "Refresh token missing" });
    }

    try {
      const decodedRefreshToken = app.jwt.verify<{ id: string }>(refreshToken);

      const user = await db
        .select()
        .from(staffTable)
        .where(eq(staffTable.id, decodedRefreshToken.id))
        .limit(1)
        .then((users) => users[0]);

      if (!user || !user.isActive) {
        return reply.status(401).send("Invalid credentials");
      }

      const accessToken = app.jwt.sign(
        { id: user.id, role: user.role },
        { expiresIn: "10s" },
      );

      return { accessToken };
    } catch (err) {
      return reply.status(401).send({ error: "Invalid refresh token" });
    }
  });
}

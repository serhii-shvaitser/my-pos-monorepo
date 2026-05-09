import { FastifyZod } from "../types";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { staffTable } from "@repo/db";

import {
  LoginCredentialsSchema,
  type SessionData,
  type UserRole,
} from "@repo/types";

export async function authRoutes(app: FastifyZod) {
  app.post(
    "/login",
    {
      schema: {
        body: LoginCredentialsSchema,
      },
    },
    async (request, reply) => {
      const { code, pin } = request.body;

      const user = await app.db
        .select()
        .from(staffTable)
        .where(eq(staffTable.code, code))
        .limit(1)
        .then((users) => users[0]);

      if (!user || !user.isActive) {
        return reply.status(401).send({
          error: "Unauthorized",
          message: "Invalid credentials",
        });
      }

      const isPinValid = await bcrypt.compare(pin, user.pinHash);

      if (!isPinValid) {
        return reply.status(401).send({
          error: "Unauthorized",
          message: "Invalid credentials",
        });
      }

      const accessToken = app.jwt.sign(
        { id: user.id, role: user.role },
        { expiresIn: "30m" },
      );

      const refreshToken = app.jwt.sign({ id: user.id }, { expiresIn: "7d" });

      reply.setCookie("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });

      const responseBody: SessionData = {
        accessToken,
        user: { name: user.name, role: user.role as UserRole },
      };

      return responseBody;
    },
  );

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
      return reply
        .status(401)
        .send({ error: "Unauthorized", message: "Refresh token missing" });
    }

    let decodedRefreshToken;

    try {
      decodedRefreshToken = app.jwt.verify<{ id: string }>(refreshToken);
    } catch (err) {
      return reply
        .status(401)
        .send({ error: "Unauthorized", message: "Invalid refresh token" });
    }

    const user = await app.db
      .select()
      .from(staffTable)
      .where(eq(staffTable.id, decodedRefreshToken.id))
      .limit(1)
      .then((users) => users[0]);

    if (!user || !user.isActive) {
      return reply.status(401).send({
        error: "Unauthorized",
        message: "Invalid credentials",
      });
    }

    const accessToken = app.jwt.sign(
      { id: user.id, role: user.role },
      { expiresIn: "30m" },
    );

    return { accessToken };
  });
}

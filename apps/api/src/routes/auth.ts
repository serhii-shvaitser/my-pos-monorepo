import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { staffTable, createDb } from "@repo/db";

import { LoginRequestSchema } from "@repo/types";

const db = createDb(process.env.DATABASE_URL!);

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const authRequestValidation = LoginRequestSchema.safeParse(request.body);

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
      { expiresIn: "15m" },
    );

    const refreshToken = app.jwt.sign({ id: user.id }, { expiresIn: "7d" });

    reply.setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      accessToken,
      user: { name: user.name, role: user.role },
    };
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
}

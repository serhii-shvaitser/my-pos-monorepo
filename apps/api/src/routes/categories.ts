import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  categoriesTable,
  InsertCategorySchema,
  UpdateCategorySchema,
  SelectCategorySchema,
} from "@repo/db";

import { FastifyZod } from "../types";
import { ErrorSchema } from "@repo/types";

export async function categoriesRoutes(app: FastifyZod) {
  app.get(
    "/categories",
    {
      schema: {
        response: {
          200: z.array(SelectCategorySchema),
        },
      },
    },
    async (request, reply) => {
      const categories = await app.db
        .select()
        .from(categoriesTable)
        .orderBy(categoriesTable.name);

      return reply.code(200).send(categories);
    },
  );
  app.post(
    "/categories",
    {
      schema: {
        body: InsertCategorySchema,
        response: {
          201: SelectCategorySchema,
        },
      },
    },
    async (request, reply) => {
      const data = request.body;
      const [newCategory] = await app.db
        .insert(categoriesTable)
        .values(data)
        .returning();

      return reply.code(201).send(newCategory);
    },
  );

  app.delete(
    "/categories/:id",
    {
      schema: {
        params: SelectCategorySchema.pick({ id: true }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      await app.db.delete(categoriesTable).where(eq(categoriesTable.id, id));

      return reply.code(204).send();
    },
  );

  app.patch(
    "/categories/:id",
    {
      schema: {
        params: SelectCategorySchema.pick({ id: true }),
        body: UpdateCategorySchema,
        response: {
          200: SelectCategorySchema,
          400: ErrorSchema,
          404: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const data = request.body;

      // TODO: refactor this check
      if (!data || Object.keys(data).length === 0) {
        return reply.code(400).send({
          error: "Bad Request",
          message: "No data provided to update",
        });
      }

      const [updatedCategory] = await app.db
        .update(categoriesTable)
        .set(data)
        .where(eq(categoriesTable.id, id))
        .returning();

      // TODO: refactor this check
      if (!updatedCategory) {
        return reply
          .code(404)
          .send({ error: "Not Found", message: "Product not found" });
      }

      return reply.code(200).send(updatedCategory);
    },
  );
}

import { z } from "zod";
import { eq } from "drizzle-orm";
import {
  productsTable,
  InsertProductSchema,
  UpdateProductSchema,
  SelectProductSchema,
} from "@repo/db";

import { ErrorSchema } from "@repo/types";
import { FastifyZod } from "../types";

export async function productsRoutes(app: FastifyZod) {
  app.get(
    "/products",
    {
      schema: {
        response: {
          200: z.array(SelectProductSchema),
        },
      },
    },
    async (request, reply) => {
      const products = await app.db
        .select()
        .from(productsTable)
        .orderBy(productsTable.name);

      return reply.code(200).send(products);
    },
  );
  app.post(
    "/products",
    {
      schema: {
        body: InsertProductSchema,
      },
    },
    async (request, reply) => {
      const data = request.body;

      const [newProduct] = await app.db
        .insert(productsTable)
        .values(data)
        .returning();

      return reply.code(201).send(newProduct);
    },
  );
  app.delete(
    "/products/:id",
    {
      schema: {
        params: SelectProductSchema.pick({ id: true }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      await app.db.delete(productsTable).where(eq(productsTable.id, id));

      return reply.code(204).send();
    },
  );
  app.patch(
    "/products/:id",
    {
      schema: {
        params: SelectProductSchema.pick({ id: true }),
        body: UpdateProductSchema,
        response: {
          200: SelectProductSchema,
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

      const [updatedProduct] = await app.db
        .update(productsTable)
        .set(data)
        .where(eq(productsTable.id, id))
        .returning();

      // TODO: refactor this check
      if (!updatedProduct) {
        return reply
          .code(404)
          .send({ error: "Not Found", message: "Product not found" });
      }

      return reply.code(200).send(updatedProduct);
    },
  );
}

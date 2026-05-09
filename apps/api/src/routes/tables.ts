import { FastifyZod } from "../types";
import { eq } from "drizzle-orm";
import { tablesTable, CreateTableSchema, TableSchema } from "@repo/db";
import { z } from "zod";

export async function tablesRoutes(app: FastifyZod) {
  app.get(
    "/tables",
    {
      schema: {
        response: {
          200: z.array(TableSchema),
          500: z.object({
            error: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const tables = await app.db
        .select()
        .from(tablesTable)
        .orderBy(tablesTable.number);
      return reply.code(200).send(tables);
    },
  );
  app.post(
    "/tables",
    {
      schema: {
        body: CreateTableSchema,
      },
    },
    async (request, reply) => {
      const data = request.body;

      const [newTable] = await app.db
        .insert(tablesTable)
        .values(data)
        .returning();

      return reply.code(201).send(newTable);
    },
  );
  app.delete(
    "/tables/:id",
    {
      schema: {
        params: z.object({ id: z.uuid() }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      await app.db
        .delete(tablesTable)
        .where(eq(tablesTable.id, id))
        .returning();

      return reply.code(204).send();
    },
  );
  app.patch(
    "/tables/:id",
    {
      schema: {
        params: z.object({ id: z.uuid() }),
        body: CreateTableSchema.partial().strict(),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const data = request.body;

      if (!data || Object.keys(data).length === 0) {
        return reply.code(400).send({
          error: "Bad Request",
          message: "No data provided to update",
        });
      }

      const [updatedTable] = await app.db
        .update(tablesTable)
        .set(data)
        .where(eq(tablesTable.id, id))
        .returning();

      if (!updatedTable) {
        return reply
          .code(404)
          .send({ error: "Not Found", message: "Table not found" });
      }

      return reply.code(200).send(updatedTable);
    },
  );
}

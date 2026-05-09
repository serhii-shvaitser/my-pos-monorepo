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
      try {
        const tables = await app.db
          .select()
          .from(tablesTable)
          .orderBy(tablesTable.number);
        return reply.code(200).send(tables);
      } catch (err) {
        app.log.error(err);
        return reply.code(500).send({
          error: "Unable to load tables",
          message: err instanceof Error ? err.message : "Unknown error",
        });
      }
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

      try {
        const [newTable] = await app.db
          .insert(tablesTable)
          .values(data)
          .returning();

        return reply.code(201).send(newTable);
      } catch (err) {
        app.log.error(err);
        return reply.code(500).send({ error: "Table creation error" });
      }
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
      try {
        const { id } = request.params;

        const deletedTables = await app.db
          .delete(tablesTable)
          .where(eq(tablesTable.id, id))
          .returning();

        if (deletedTables.length === 0) {
          return reply.status(404).send({
            error: "Table not found",
          });
        }

        return reply.code(204).send({});
      } catch (err) {
        app.log.error(err);
        if (err instanceof Error && err.message.includes("uuid")) {
          return reply.status(400).send({ error: "Invalid ID format" });
        }
        return reply.code(500).send({ error: "Couldn't delete the table" });
      }
    },
  );
  app.patch(
    "/tables/:id",
    {
      schema: {
        params: z.object({ id: z.uuid() }),
        body: CreateTableSchema.partial(),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const data = request.body;

        const [updatedTable] = await app.db
          .update(tablesTable)
          .set(data)
          .where(eq(tablesTable.id, id))
          .returning();

        if (!updatedTable) {
          return reply.code(404).send({ error: "Стіл не знайдено" });
        }

        return reply.code(200).send(updatedTable);
      } catch (err) {
        app.log.error(err);
        return reply.code(500).send({ error: "Couldn't update the table" });
      }
    },
  );
}

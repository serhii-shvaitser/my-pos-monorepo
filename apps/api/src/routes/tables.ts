import { FastifyZod, ErrorSchema } from "../types";
import { eq } from "drizzle-orm";
import {
  tablesTable,
  InsertTableSchema,
  UpdateTableSchema,
  SelectTableSchema,
} from "@repo/db";
import { z } from "zod";

export async function tablesRoutes(app: FastifyZod) {
  app.get(
    "/tables",
    {
      schema: {
        response: {
          200: z.array(SelectTableSchema),
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
        body: InsertTableSchema,
        response: {
          201: SelectTableSchema,
        },
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
        params: SelectTableSchema.pick({ id: true }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      await app.db.delete(tablesTable).where(eq(tablesTable.id, id));

      return reply.code(204).send();
    },
  );
  app.patch(
    "/tables/:id",
    {
      schema: {
        params: SelectTableSchema.pick({ id: true }),
        body: UpdateTableSchema,
        response: {
          200: SelectTableSchema,
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

      const [updatedTable] = await app.db
        .update(tablesTable)
        .set(data)
        .where(eq(tablesTable.id, id))
        .returning();

      // TODO: refactor this check
      if (!updatedTable) {
        return reply
          .code(404)
          .send({ error: "Not Found", message: "Table not found" });
      }

      return reply.code(200).send(updatedTable);
    },
  );
}

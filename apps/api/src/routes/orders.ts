import { FastifyZod, ErrorSchema } from "../types";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  ordersTable,
  InsertOrderSchema,
  UpdateOrderSchema,
  SelectOrderSchema,
} from "@repo/db";

import { OrderWithItemsSchema } from "@repo/types";

export async function ordersRoutes(app: FastifyZod) {
  app.get(
    "/orders",
    {
      schema: {
        response: {
          200: z.array(SelectOrderSchema),
        },
      },
    },
    async (request, reply) => {
      const orders = await app.db.select().from(ordersTable);

      return reply.code(200).send(orders);
    },
  );
  app.get(
    "/orders/:id",
    {
      schema: {
        params: z.object({ id: z.uuid() }),
        response: {
          200: SelectOrderSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const [order] = await app.db
        .select()
        .from(ordersTable)
        .where(eq(ordersTable.id, id));

      return reply.code(200).send(order);
    },
  );
  app.get(
    "/orders/active",
    {
      schema: {
        querystring: z.object({ tableId: z.uuid() }),
        response: {
          200: OrderWithItemsSchema.nullable(),
        },
      },
    },
    async (request, reply) => {
      const { tableId } = request.query;

      const order = await app.db.query.ordersTable.findFirst({
        where: (orders, { and, eq }) =>
          and(eq(orders.tableId, tableId), eq(orders.status, "open")),
        with: {
          items: {
            with: {
              product: true,
            },
          },
        },
      });

      if (!order) {
        return reply.code(200).send(null);
      }

      return reply.code(200).send(order);
    },
  );
  app.post(
    "/orders",
    {
      schema: {
        body: InsertOrderSchema,
        response: {
          201: SelectOrderSchema,
        },
      },
    },
    async (request, reply) => {
      const data = request.body;
      const [newOrder] = await app.db
        .insert(ordersTable)
        .values(data)
        .returning();

      return reply.code(201).send(newOrder);
    },
  );

  app.delete(
    "/orders/:id",
    {
      schema: {
        params: z.object({ id: z.uuid() }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      await app.db.delete(ordersTable).where(eq(ordersTable.id, id));

      return reply.code(204).send();
    },
  );

  app.patch(
    "/orders/:id",
    {
      schema: {
        params: z.object({ id: z.uuid() }),
        body: UpdateOrderSchema,
        response: {
          201: SelectOrderSchema,
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

      const [updatedOrder] = await app.db
        .update(ordersTable)
        .set(data)
        .where(eq(ordersTable.id, id))
        .returning();

      // TODO: refactor this check
      if (!updatedOrder) {
        return reply
          .code(404)
          .send({ error: "Not Found", message: "Order not found" });
      }

      return reply.code(201).send(updatedOrder);
    },
  );
}

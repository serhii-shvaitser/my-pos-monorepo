import { FastifyZod, ErrorSchema, GetOrdersQuerySchema } from "../types";
import { eq, type SQL } from "drizzle-orm";
import { z } from "zod";
import {
  ordersTable,
  InsertOrderSchema,
  UpdateOrderSchema,
  SelectOrderSchema,
} from "@repo/db";
import { OrderWithItemsSchema } from "@repo/types";

export async function ordersRoutes(app: FastifyZod) {
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
      try {
        const [newOrder] = await app.db
          .insert(ordersTable)
          .values(data)
          .returning();

        return reply.code(201).send(newOrder);
      } catch (error) {
        // TODO: handle Foreign Key Violation (wrong table id)
        throw error;
      }
    },
  );
  app.get(
    "/orders",
    {
      schema: {
        querystring: GetOrdersQuerySchema,
        response: {
          200: z.array(OrderWithItemsSchema),
        },
      },
    },
    async (request, reply) => {
      const { tableId, status } = request.query;
      const conditions: SQL[] = [];

      if (tableId) {
        conditions.push(eq(ordersTable.tableId, tableId));
      }

      if (status) {
        conditions.push(eq(ordersTable.status, status));
      }

      const orders = await app.db.query.ordersTable.findMany({
        where: (orders, { and }) =>
          conditions.length > 0 ? and(...conditions) : undefined,
        with: {
          items: {
            with: { product: true },
          },
        },
      });

      return reply.code(200).send(orders);
    },
  );
  app.get(
    "/orders/:id",
    {
      schema: {
        params: SelectOrderSchema.pick({ id: true }),
        response: {
          200: OrderWithItemsSchema,
          404: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const order = await app.db.query.ordersTable.findFirst({
        where: (orders, { eq }) => eq(orders.id, id),
        with: {
          items: {
            with: { product: true },
          },
        },
      });

      if (!order) {
        return reply
          .code(404)
          .send({ error: "Not Found", message: "Order not found" });
      }

      return reply.code(200).send(order);
    },
  );
  app.delete(
    "/orders/:id",
    {
      schema: {
        params: SelectOrderSchema.pick({ id: true }),
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
        params: SelectOrderSchema.pick({ id: true }),
        body: UpdateOrderSchema,
        response: {
          200: SelectOrderSchema,
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

      return reply.code(200).send(updatedOrder);
    },
  );
}

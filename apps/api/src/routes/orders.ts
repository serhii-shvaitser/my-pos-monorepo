import { FastifyZod, ErrorSchema, GetOrdersQuerySchema } from "../types";
import { eq, type SQL, inArray, sql, and, notInArray, ne } from "drizzle-orm";
import { z } from "zod";
import {
  ordersTable,
  orderItemsTable,
  tablesTable,
  productsTable,
  InsertOrderSchema,
  UpdateOrderSchema,
  SelectOrderSchema,
  InsertOrderItemSchema,
  SelectOrderItemSchema,
} from "@repo/db";
import { OrderWithItemsSchema } from "@repo/types";
import id from "zod/v4/locales/id.cjs";

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

  // Order Items

  app.post(
    "/orders/:orderId/items",
    {
      schema: {
        params: SelectOrderItemSchema.pick({ orderId: true }),
        body: z.array(
          InsertOrderItemSchema.pick({
            productId: true,
            quantity: true,
          }),
        ),
        response: {
          201: z.array(SelectOrderItemSchema),
          400: ErrorSchema,
          404: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { orderId } = request.params;
      const orderItems = request.body;

      if (orderItems.length === 0) {
        return reply
          .code(400)
          .send({ error: "Bad request", message: "Order is empty" });
      }

      const productIds = orderItems.map((orderItem) => orderItem.productId);

      const dbProducts = await app.db
        .select({
          id: productsTable.id,
          price: productsTable.price,
          isAvailable: productsTable.isAvailable,
        })
        .from(productsTable)
        .where(inArray(productsTable.id, productIds));

      await app.db
        .update(orderItemsTable)
        .set({ status: "cancelled" })
        .where(
          and(
            eq(orderItemsTable.orderId, orderId),
            notInArray(orderItemsTable.productId, productIds),
            eq(orderItemsTable.status, "ordered"),
          ),
        );

      let itemsToInsert: z.infer<typeof InsertOrderItemSchema>[] = [];

      for (const orderItem of orderItems) {
        const product = dbProducts.find(
          (dbProduct) => dbProduct.id === orderItem.productId,
        );

        if (!product) {
          return reply.code(404).send({
            message: "Not Found",
            error: "Product not found",
          });
        }

        if (!product.isAvailable) {
          return reply.code(400).send({
            message: "Bad Request",
            error: "Product is out of stock",
          });
        }

        itemsToInsert.push({
          orderId,
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          unitPrice: product.price,
        });
      }

      const createdItems = await app.db
        .insert(orderItemsTable)
        .values(itemsToInsert)
        .onConflictDoUpdate({
          set: {
            quantity: sql`EXCLUDED.quantity`,
          },
          target: [orderItemsTable.orderId, orderItemsTable.productId],
        })
        .returning();

      const allOrderItems = await app.db
        .select()
        .from(orderItemsTable)
        .where(
          and(
            eq(orderItemsTable.orderId, orderId),
            ne(orderItemsTable.status, "cancelled"),
          ),
        );

      const finalTotalAmount = allOrderItems.reduce((sum, item) => {
        return sum + item.unitPrice * item.quantity;
      }, 0);

      await app.db
        .update(ordersTable)
        .set({ totalAmount: finalTotalAmount })
        .where(eq(ordersTable.id, orderId));

      const [order] = await app.db
        .select({ tableId: ordersTable.tableId })
        .from(ordersTable)
        .where(eq(ordersTable.id, orderId));

      if (order) {
        await app.db
          .update(tablesTable)
          .set({ status: "occupied" })
          .where(eq(tablesTable.id, order.tableId));
      }

      return reply.code(201).send(createdItems);
    },
  );
}

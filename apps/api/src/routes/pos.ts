import { FastifyZod, ErrorSchema } from "../types";
import { z } from "zod";
import { productsTable, categoriesTable } from "@repo/db";
import { PosMenuSchema } from "@repo/types";

export async function posRoutes(app: FastifyZod) {
  app.get(
    "/pos/menu",
    {
      schema: {
        response: {
          200: PosMenuSchema,
        },
      },
    },
    async (request, reply) => {
      const products = await app.db
        .select()
        .from(productsTable)
        .orderBy(productsTable.name);

      const categories = await app.db
        .select()
        .from(categoriesTable)
        .orderBy(categoriesTable.name);

      return reply.code(200).send({
        categories,
        products,
      });
    },
  );
}

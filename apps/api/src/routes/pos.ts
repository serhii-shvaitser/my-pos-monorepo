import { FastifyZod, ErrorSchema } from "../types";
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
      const data = await app.db.query.categoriesTable.findMany({
        with: {
          products: true,
        },
      });

      return reply.code(200).send(data);
    },
  );
}

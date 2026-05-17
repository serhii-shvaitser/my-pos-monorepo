import {
  FastifyInstance,
  FastifyBaseLogger,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { SelectOrderSchema } from "@repo/db";

export type FastifyZod = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  ZodTypeProvider
>;

export const ErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  details: z.string().optional(),
});

export const GetOrdersQuerySchema = SelectOrderSchema.pick({
  tableId: true,
  status: true,
}).partial();

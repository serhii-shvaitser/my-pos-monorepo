import { createProductsService } from "@repo/api-client";
import { client } from "@/entities/session";

export const productsApi = createProductsService(client);

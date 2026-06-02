import { createProductsService } from "@repo/api-client";
import { client } from "@/shared/api";

export const productsApi = createProductsService(client);

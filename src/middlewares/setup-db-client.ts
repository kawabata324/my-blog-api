import { createDbClient } from "@/db/create-db-client";
import type { Context, Next } from "hono";

const dbClient = createDbClient();

export const setUpDbClientMiddleware = async (c: Context, next: Next) => {
	c.set("dbClient", dbClient);
	await next();
};

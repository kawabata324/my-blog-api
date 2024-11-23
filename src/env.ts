import { z } from "@hono/zod-openapi";
import * as dotenv from "dotenv";

dotenv.config();

export const isTest = (): boolean => process.env.NODE_ENV === "test";

const envSchema = z.object({
	APP_PORT: z.coerce.number().default(8080),
	DB_URL: z.string(),
	TEST_DB_URL: z.string(),
});

export const envConfig = envSchema.parse({
	APP_PORT: process.env.APP_PORT,
	DB_URL: process.env.DB_URL,
	TEST_DB_URL: process.env.TEST_DB_URL,
});

export type EnvConfig = z.infer<typeof envSchema>;

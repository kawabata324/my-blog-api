import { envConfig } from "@/env";
import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import type { DB } from "./types";

export const createDbClient = () => {
	const dbClient = new Kysely<DB>({
		dialect: new PostgresDialect({
			pool: new pg.Pool({
				connectionString: envConfig.DB_URL,
				max: 50, // Set maximum <number> of client(s) in the pool
				connectionTimeoutMillis: 1000, // return an error after <number> second(s) if connection could not be established
				idleTimeoutMillis: 0, // close idle clients after <number> second(s)
			}),
		}),
	});

	return dbClient;
};

export const createTestDbClient = () => {
	const dbClient = new Kysely<DB>({
		dialect: new PostgresDialect({
			pool: new pg.Pool({
				connectionString: envConfig.DB_URL,
				max: 50,
				connectionTimeoutMillis: 1000,
				idleTimeoutMillis: 0,
			}),
		}),
	});

	return dbClient;
};

export type DbClient =
	| ReturnType<typeof createDbClient>
	| ReturnType<typeof createTestDbClient>;

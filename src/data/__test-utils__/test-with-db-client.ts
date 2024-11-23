import { type DbClient, createTestDbClient } from "@/db/create-db-client";
import type { DB } from "@/db/types";
import type { Transaction } from "kysely";
import { test } from "vitest";

export class KyselyRollbackError extends Error {}

export const testWithDbClient = test.extend<{ dbClient: DbClient }>({
	// eslint-disable-next-line no-empty-pattern
	dbClient: async (_, use) => {
		try {
			const dbClient = await createTestDbClient();
			await dbClient
				.transaction()
				.setIsolationLevel("read uncommitted")
				.execute(async (trx: Transaction<DB>) => {
					await use(trx);
					throw new KyselyRollbackError();
				});
		} catch (err) {
			const isRollbackError = err instanceof KyselyRollbackError;
			if (!isRollbackError) throw err;
		}
	},
});

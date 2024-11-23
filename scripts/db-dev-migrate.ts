import { envConfig } from "@/env";
import { runApplyDbMigration } from "./commands/run-apply-db-migration";

const run = () => {
	const dbUrl = envConfig.DB_URL;
	const testDbUrl = envConfig.TEST_DB_URL;

	runApplyDbMigration({ databaseUrl: dbUrl });
	runApplyDbMigration({ databaseUrl: testDbUrl });
};
run();

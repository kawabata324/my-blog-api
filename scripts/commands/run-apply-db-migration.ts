import { execSync } from "node:child_process";

const migrateCommand = "pnpm prisma migrate dev";
const generateCommand = "pnpm prisma generate";

export const runApplyDbMigration = ({
	databaseUrl,
}: {
	databaseUrl: string;
}): void => {
	process.env.DB_URL = databaseUrl;

	const { error: migrateError } = runCommand(migrateCommand);
	if (migrateError) {
		console.error("Error when running prisma migrate:\n", migrateError);
		return;
	}

	const { error: generateError } = runCommand(generateCommand);
	if (generateError) {
		console.error("Error when running prisma generate:\n", generateError);
		return;
	}
};

const runCommand = (command: string) => {
	try {
		execSync(`${command}`, { stdio: "inherit" });
	} catch (error) {
		return { error };
	}
	return { error: null };
};

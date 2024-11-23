import type { DbClient } from "@/db/create-db-client";
import type { Tag } from "@/db/schema";
import { faker } from "@faker-js/faker";
import { isArray } from "remeda";

export const makeFakeTag = (args?: Partial<Tag>): Tag => ({
	id: faker.string.uuid(),
	createdAt: new Date(),
	updatedAt: new Date(),
	code: "tag",
	displayName: "Tag",
	colorCode: "#000000",
	...args,
});

export type CreateTestTagsInDBArgs = {
	dbClient: DbClient;
	values?: Partial<Tag> | Partial<Tag>[];
};

export const createTestTagsInDB = ({
	dbClient,
	values,
}: CreateTestTagsInDBArgs) => {
	const fakeTags = isArray(values)
		? values.map(makeFakeTag)
		: makeFakeTag(values);
	return dbClient.insertInto("tags").values(fakeTags).returningAll().execute();
};

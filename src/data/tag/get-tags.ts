import type { DbClient } from "@/db/create-db-client";
import type { Tag } from "@/db/schema";
import { makeDefaultDataListReturn } from "../make-default-list-return";

export type GetTagsArgs = {
	dbClient: DbClient;
	limit?: number;
	page?: number;
	sortBy?: keyof Tag;
	orderBy?: "asc" | "desc";
};

export const getTags = async ({
	dbClient,
	limit = 25,
	page = 1,
	sortBy = "createdAt",
	orderBy = "desc",
}: GetTagsArgs) => {
	const tagQuery = dbClient
		.selectFrom("tags")
		.selectAll()
		.limit(limit)
		.offset((page - 1) * limit)
		.orderBy(sortBy, orderBy);

	const allRecordQuery = dbClient
		.selectFrom("tags")
		.select((ed) => ed.fn.count("id").as("total"));

	const [tags, allRecords] = await Promise.all([
		tagQuery.execute(),
		allRecordQuery.executeTakeFirst(),
	]);

	return makeDefaultDataListReturn({
		data: tags,
		totalData: Number(allRecords?.total) ?? 0,
		limit,
		page,
	});
};

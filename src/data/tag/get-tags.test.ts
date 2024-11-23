import { describe, expect } from "vitest";
import { testWithDbClient } from "../__test-utils__/test-with-db-client";
import { createTestTagsInDB } from "./__test-utils__/make-fake-tag";
import { getTags } from "./get-tags";

describe("Get Tags", () => {
	testWithDbClient("tagが取得できること", async ({ dbClient }) => {
		const count = 10;

		await createTestTagsInDB({
			dbClient,
			values: Array.from({ length: count }).map((_, i) => ({
				code: `tag-${i}`,
				displayName: `Tag ${i}`,
			})),
		});

		const data = await getTags({ dbClient });

		expect(data.totalData).toBe(count);
	});
	describe("空の場合", () => {
		testWithDbClient("空の配列が返ること", async ({ dbClient }) => {
			const data = await getTags({ dbClient });

			expect(data.totalData).toBe(0);
		});
	});

	describe("ページング", () => {
		testWithDbClient(
			"limitが指定された場合、指定した数のデータが返ること",
			async ({ dbClient }) => {
				const count = 10;

				await createTestTagsInDB({
					dbClient,
					values: Array.from({ length: count }).map((_, i) => ({
						code: `tag-${i}`,
						displayName: `Tag ${i}`,
					})),
				});

				const data = await getTags({ dbClient, limit: 5 });

				expect(data.data.length).toBe(5);
			},
		);
	});
	testWithDbClient(
		"pageが指定された場合、指定したページのデータが返ること",
		async ({ dbClient }) => {
			const count = 11;

			await createTestTagsInDB({
				dbClient,
				values: Array.from({ length: count }).map((_, i) => ({
					code: `tag-${i}`,
					displayName: `Tag ${i}`,
				})),
			});

			const data = await getTags({ dbClient, limit: 5, page: 2 });

			expect(data.data.length).toBe(5);
			expect(data.nextPage).toBe(3);
			expect(data.prevPage).toBe(1);
			expect(data.currentPage).toBe(2);
			expect(data.totalPage).toBe(3);
		},
	);
	testWithDbClient(
		"sortBy, orderByが指定された場合、指定したキーでソートされたデータが返ること",
		async ({ dbClient }) => {
			const count = 10;

			await createTestTagsInDB({
				dbClient,
				values: Array.from({ length: count }).map((_, i) => ({
					code: `tag-${i}`,
					displayName: `Tag ${i}`,
				})),
			});

			const data = await getTags({ dbClient, sortBy: "code", orderBy: "asc" });

			expect(data.data[0]?.code).toBe("tag-0");
			expect(data.data[data.data.length - 1]?.code).toBe(`tag-${count - 1}`);
		},
	);
});

import type { Tag } from "@/db/schema";
import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { tagSchema } from "./tagSchema";

describe("tagSchema", () => {
	test("tagSchemaの検証", () => {
		const input: Tag = {
			id: faker.string.uuid(),
			createdAt: new Date(),
			updatedAt: new Date(),
			code: "tag",
			displayName: "Tag",
			colorCode: "#000000",
		};
		const result = tagSchema.safeParse(input);

		expect(result.success).toBe(true);
	});
});

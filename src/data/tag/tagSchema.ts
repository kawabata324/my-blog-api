import type { Tag } from "@/db/schema";
import { z } from "@hono/zod-openapi";

export const tagSchema = z.object({
	id: z.string().uuid(),
	createdAt: z.union([z.coerce.date(), z.string()]).openapi({
		example: new Date().toISOString(),
	}),
	updatedAt: z.union([z.coerce.date(), z.string()]).openapi({
		example: new Date().toISOString(),
	}),
	code: z.string().min(1).max(255).openapi({
		example: "tag",
	}),
	displayName: z.string().min(1).max(255).openapi({
		example: "Tag",
	}),
	colorCode: z.string().min(1).max(255).openapi({
		example: "#000000",
	}),
}) satisfies z.ZodType<Tag>;

export const tagOpenApiSchema = tagSchema.openapi("Tag");

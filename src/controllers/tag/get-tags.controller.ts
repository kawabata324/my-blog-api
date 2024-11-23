import { getTags } from "@/data/tag/get-tags";
import { tagOpenApiSchema } from "@/data/tag/tagSchema";
import { listQuerySchema } from "@/utils/schema/list-query-schema";
import { paginationSchema } from "@/utils/schema/pagenation-schema";
import { type OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const getTagsSchema = {
	query: listQuerySchema.extend({
		sortBy: z
			.enum(["createdAt", "updatedAt", "code", "displayName"])
			.optional(),
	}),
	response: paginationSchema.extend({
		data: z.array(tagOpenApiSchema),
	}),
};

export type GetTagsQuery = z.infer<typeof getTagsSchema.query>;
export type GetTagsResponse = z.infer<typeof getTagsSchema.response>;

export const getUsersRoute = createRoute({
	method: "get",
	path: "/tags",
	tags: ["Tag"],
	summary: "タグの一覧を取得する。",
	description: "タグの一覧を取得する。",
	request: {
		query: getTagsSchema.query,
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: getTagsSchema.response,
				},
			},
			description: "Users retrieved successfully",
		},
	},
	middleware: [],
});

export function makeGetTagsRouteHandler(app: OpenAPIHono) {
	return app.openapi(getUsersRoute, async (c) => {
		const dbClient = c.get("dbClient");
		const query = c.req.valid("query");

		const data = await getTags({
			dbClient,
			sortBy: query?.sortBy,
			orderBy: query?.orderBy,
			limit: query?.limit,
			page: query?.page,
		});

		return c.json(data, { status: 200 });
	});
}

import { z } from "zod";

export const listQuerySchema = z.object({
	limit: z.coerce.number().optional(),
	page: z.coerce.number().optional(),
	sortBy: z.string().optional(),
	orderBy: z.enum(["asc", "desc"]).optional(),
});

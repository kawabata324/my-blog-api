import { z } from "zod";

export const paginationSchema = z.object({
	totalPage: z.number(),
	currentPage: z.number(),
	nextPage: z.number().nullable(),
	prevPage: z.number().nullable(),
	totalData: z.number(),
});

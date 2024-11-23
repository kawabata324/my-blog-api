import { ValidationError } from "@/utils/errors";

export type MakeDefaultDataListReturnArgs<T> = {
	data: T[];
	totalData: number;
	limit: number;
	page: number;
};

export const makeDefaultDataListReturn = async <T>({
	data,
	totalData,
	limit,
	page,
}: MakeDefaultDataListReturnArgs<T>): Promise<{
	data: T[];
	totalData: number;
	totalPage: number;
	currentPage: number;
	nextPage: number | null;
	prevPage: number | null;
}> => {
	if (limit <= 0 || page <= 0)
		throw new ValidationError("Limit and page must be greater than 0");

	const totalPage = Math.ceil(totalData / limit);

	return {
		data,
		totalData,
		totalPage,
		currentPage: page,
		nextPage: page < totalPage ? page + 1 : null,
		prevPage: page > 1 ? page - 1 : null,
	};
};

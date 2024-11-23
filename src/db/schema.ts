import type { DB, Tag as DBTag } from "./types";

type OverrideIdAndDates<TTable> = Omit<
	TTable,
	"id" | "createdAt" | "updatedAt"
> & {
	id: string;
	createdAt: Date | string;
	updatedAt: Date | string;
};

export type Tag = OverrideIdAndDates<DBTag>;

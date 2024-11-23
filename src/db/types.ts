import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
	? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Administrators = {
	id: Generated<string>;
	name: string;
	passwordDigest: string;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
};
export type Article = {
	id: Generated<string>;
	title: string;
	htmlBody: string;
	markdownBody: string;
	publishedAt: Generated<Timestamp | null>;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
};
export type ArticleTag = {
	id: Generated<string>;
	articleId: string;
	tagId: string;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
};
export type Tag = {
	id: Generated<string>;
	code: string;
	displayName: string;
	colorCode: string;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
};
export type DB = {
	administrators: Administrators;
	articles: Article;
	articleTags: ArticleTag;
	tags: Tag;
};

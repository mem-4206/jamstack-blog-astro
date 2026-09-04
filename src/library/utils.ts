import type { Blog, Tag } from "./microcms";

// 記事一覧から重複のないタグリストを抽出する
export const extractUniqueTags = (articles: Blog[]): Tag[] => {
	return Array.from(
		new Map(
			articles
				.flatMap((article) => article.tags || [])
				.map((tag) => [tag.id, tag]),
		).values(),
	);
};

// 日付文字列 (ISO) を "YYYY.MM.DD"形式にフォーマットする
export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}.${month}.${day}`;
};

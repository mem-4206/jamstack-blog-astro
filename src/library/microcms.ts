//SDK利用準備
import type { MicroCMSQueries, MicroCMSListContent } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

const client = createClient({
	serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
	apiKey: import.meta.env.MICROCMS_API_KEY,
});

// 型定義
// type News = {
//     title: string;
//     body: string;
// };

export type Blog = {
	title: string;
	content: string;
	mainVisual: {
		url: string;
	};
	category: {
		id: string;
		name: string;
	};
	tags: string;
	publishedAt: Date;
	updatedAt: Date;
} & MicroCMSListContent;

// お知らせ取得用関数
// export const getNews = async (queries?: MicroCMSQueries) => {
//     return await client.getList<News>({ endpoint: 'news', queries }); // APIのエンドポイントとしてnewsを指定
// };

// APIの呼び出し
export const getBlogs = async (queries?: MicroCMSQueries) => {
	return await client.getList<Blog>({ endpoint: "blogs", queries });
};

export const getBlogDetail = async (
	contentId: string,
	queries?: MicroCMSQueries,
) => {
	return await client.getListDetail<Blog>({
		endpoint: "blogs",
		contentId,
		queries,
	});
};

export const getRelatedPosts = async (categoryId: string) => {
	return await client.getList<Blog>({
		endpoint: "blogs",
		queries: {
			filters: `category[equals]'${categoryId}'`,
		},
	});
};

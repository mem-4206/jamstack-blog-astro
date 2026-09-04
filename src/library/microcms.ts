//SDK利用準備
import type { MicroCMSListContent, MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

const client = createClient({
	serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
	apiKey: import.meta.env.MICROCMS_API_KEY,
});

// 型を定義する
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
	tags: {
		id: string;
		name: string;
	}[];
	publishedAt: Date;
	updatedAt: Date;
} & MicroCMSListContent;

export type Category = {
    id: string;
    name: string;
}

export type Tag = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
}

export const getBlogs = async (queries?: MicroCMSQueries) => {
	return await client.getList<Blog>({
		endpoint: "blogs",
		queries: {
			orders: "-publishedAt",
            ...queries,
		},
	});
};

export const getCategories = async (queries?: MicroCMSQueries) => {
	return await client.getList<Category>({
		endpoint: "categories",
		queries,
	});
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

export const getTags = async (queries?: MicroCMSQueries) => {
    return await client.get<MicroCMSListResponse<Tag>>({
        endpoint: 'tags',
        queries,
    });
}
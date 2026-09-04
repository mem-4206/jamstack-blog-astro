//SDK利用準備
import type { MicroCMSListContent, MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

// SDK初期化
const client = createClient({
	serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
	apiKey: import.meta.env.MICROCMS_API_KEY,
});

// ----------
// 型定義
// ----------

// カテゴリ
export type Category = {
    id: string;
    name: string;
} & Partial<MicroCMSListContent>

// タグ
export type Tag = {
    id: string;
    name: string;
} & Partial<MicroCMSListContent>

// ブログ記事
export type Blog = {
	title: string;
	content: string;
	mainVisual?: {
		url: string;
        height?: number;
        width?: number;
	};
	category: Category;
	tags: Tag[];
} & MicroCMSListContent;

// ----------
// API 取得関数
// ----------

// ブログ一覧を公開日の降順で取得
export const getBlogs = async (queries?: MicroCMSQueries) => {
	return await client.getList<Blog>({
		endpoint: "blogs",
		queries: {
			orders: "-publishedAt",
            ...queries,
		},
	});
};

// ブログ詳細情報を取得
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

// カテゴリ一覧を取得
export const getCategories = async (queries?: MicroCMSQueries) => {
	return await client.getList<Category>({
		endpoint: "categories",
		queries,
	});
};

// タグ一覧を取得
export const getTags = async (queries?: MicroCMSQueries) => {
    return await client.get<MicroCMSListResponse<Tag>>({
        endpoint: 'tags',
        queries,
    });
}

// 特定のカテゴリの関連記事を取得
export const getRelatedPosts = async (categoryId: string, currentBlogId?: string) => {
    const response = await client.getList<Blog>({
        endpoint: "blogs",
		queries: {
			filters: `category[equals]'${categoryId}'`,
		},
    });

    // 現在開いている記事の除外
    if (currentBlogId) {
        return {
            ...response,
            contents: response.contents.filter((blog) => blog.id !== currentBlogId),
        };
    }

	return response;
};
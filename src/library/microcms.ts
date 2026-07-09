//SDK利用準備
import type { MicroCMSQueries } from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';
const client = createClient({
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: import.meta.env.MICROCMS_API_KEY
});

// お知らせの型定義
type News = {
    title: string;
    body: string;
};

// お知らせ取得用関数
export const getNews = async (queries?: MicroCMSQueries) => {
    return await client.getList<News>({ endpoint: 'news', queries }); // APIのエンドポイントとしてnewsを指定
};

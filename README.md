# My Blog.

【Jamstack：Lv.2】Webサイトデベロッパー アソシエイト バッジ課題で作成した、Jamstackのブログアプリケーションです。

- デプロイURL: [https://jamstack-blog-astro.pages.dev/](https://jamstack-blog-astro.pages.dev/)
- リポジトリ: [https://github.com/mem-4206/jamstack-blog-astro](https://github.com/mem-4206/jamstack-blog-astro)

## 📌 課題の要件と実装状況

| カテゴリ | 要件項目 | 対応状況 / 実装内容 |
| :--- | :--- | :--- |
| **開発要件** | SSG | Astroのみを使用して、SSGで構築している。 |
| | TypeScript | 全体でTypeScriptを使用し、`tsconfig.json`が存在する。 |
| | CSS | PC: 1080px / SP: 375px で表示崩れがない。 |
| | コード品質 | Biomeによる静的解析・検証のうえでデプロイしている。 |
| | ホスティングサービス | ホスティングサービスにCloudflare Pagesを使用している。 |
| | CMS接続 | Cloudflare PagesとmicroCMSをWebhook連携し、記事の公開・更新時に自動ビルドが行われる。 |
| **ページ / ファイル** | トップページ | タグ一覧の表示、タグフィルタリングをVanilla JSで実装している。 <br>記事一覧は公開日の降順で表示される。記事カードには、アイキャッチ・タイトル・カテゴリ・タグ・公開日・記事更新日の6つの情報が含まれる。 |
| | カテゴリごとの記事一覧ページ | 記事一覧が公開日の降順で表示され、記事カードには、アイキャッチ・タイトル・カテゴリ・タグ・公開日・記事更新日の6つの情報が含まれる。
| | 記事詳細ページ | アイキャッチ・タイトル・カテゴリ・タグ・公開日・記事更新日・本文が表示される。また、表示している記事を除いた同じカテゴリの記事が最大3つ表示される。 |
| | サイトマップ | `@astrojs/sitemap` により、 `sitemap-index.xml` が自動生成される。 |
| | robots.txt | `public`内に`robots.txt` を設置している。 |
| **microCMS** | ブログデータのソース | 記事データをmicroCMSから取得している。 |
| | API設定 | microCMSにて`blogs`、`categories`、`tags`の各種エンドポイントを作成し、適切なスキーマ設定を行っている。|
| | 本文のソース | 本文はリッチエディタからのレスポンスを使用し、エディタの装飾が出力に反映される。|
| | コンテンツ参照 | タグ・カテゴリはコンテンツ参照を使用して作成している。 |
| **注意事項** | AIの利用方法 | 生成AIのエージェント利用は行っていない。AIのサポートを受けながら、自分で構築した。 |
| | テンプレートの禁止 | ホスティングサービスおよびmicroCMSで提供された、事前構築済みのテンプレートを使用していない。 |
| | 機密情報の取り扱い | 記事データに個人情報および案件情報を含まない。 |
| | リポジトリ設定 | GitHubのリポジトリを`Private`に設定している。 |


## 🛠 技術スタック

### フロントエンド・フレームワーク
- [Astro](https://astro.build/) (v5.x)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- JavaScript

### バックエンド・CMS・インフラ
- [microCMS](https://microcms.io/)
- [Cloudflare Pages](https://www.cloudflare.com/ja-jp/developer-platform/products/pages/)

### 主要ライブラリ・ツール
- [microcms-js-sdk](http://github.com/microcmsio/microcms-js-sdk)
  - microCMS APIとの通信に使用。
- [@astrojs/sitemap](https://docs.astro.build/ja/guides/integrations-guide/sitemap/)
  - XMLサイトマップの自動生成に使用。
- [Biome](https://biomejs.dev/)
  - コードの品質管理およびフォーマットに使用。

## 🔄 データフローと仕組み

1. **ユーザが記事を執筆**: microCMS上で新しいブログ記事を作成・公開する。
2. **WebHookが送信され、自動ビルドが起動**: microCMSからホスティングサービスへWebHookが送信され、Astroのビルドコマンド `npm run build` が実行される。
3. **API経由でデータを取得**: AstroがmicroCMS APIを経由して、記事・カテゴリ・タグデータをJSON形式で取得する。
4. **静的HTML生成**: 取得したデータを元に、トップページ・カテゴリページ・記事詳細ページのHTMLを全て生成する。
5. **クライアントサイドJS**: トップページおよびカテゴリ別ページに実装されたタグフィルターは、Astroの `<script>` タグ内に記述したクライアントサイドのJavaScriptで動的に表示・非表示を制御している。(独自で実装したヘッダーメニューを閉じる機能も同様)


## 🗂 microCMS のスキーマ定義

### 1. ブログ (`blogs`)
* `title` （テキストフィールド）: 記事タイトル
* `content` （リッチエディタ）: 記事本文
* `mainVisual` （画像）: アイキャッチ画像
* `category` （コンテンツ参照）: カテゴリ情報
* `tags` （複数コンテンツ参照）: タグリスト
* `publishedAt` / `updatedAt` : 公開日 / 更新日

TypeScriptでの型定義は以下である。

```typescript
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
```

### 2. カテゴリ (`categories`)
* `id`: 記事（個々のカテゴリ）に付与されたID
* `name` (テキスト) : 表示名

TypeScriptでの型定義は以下である。

```typescript
export type Category = {
	id: string;
	name: string;
} & Partial<MicroCMSListContent>;
```

### 3. タグ (`tags`)
* `id`: 記事（個々のタグ）に付与されたID
* `name` (テキスト) : 表示名

TypeScriptでの型定義は以下である。

```typescript
export type Tag = {
	id: string;
	name: string;
} & Partial<MicroCMSListContent>;
```

## 🚀 ローカル開発環境の立ち上げ手順

```sh
# 依存パッケージのインストール
npm install

# 環境変数の設定 (.env)
# MICROCMS_SERVICE_DOMAIN=your-service-domain
# MICROCMS_API_KEY=your-api-key

# 開発サーバの起動
npm run dev

# リントの実行
npx biome lint ./

# ビルド確認
npm run build
```
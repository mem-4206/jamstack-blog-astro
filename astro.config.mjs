// @ts-check

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    site: 'https://jamstack-blog-astro.pages.dev',
    integrations: [tailwind(), icon(), sitemap()]
});
    
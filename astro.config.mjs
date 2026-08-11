// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
  site: 'https://sibukixxx.github.io',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'es', 'hi'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    rehypePlugins: [rehypeSlug],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

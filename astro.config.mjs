// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
  site: 'https://sibukixxx.github.io',
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeSlug],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

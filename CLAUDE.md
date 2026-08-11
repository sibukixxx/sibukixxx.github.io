# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

本プロジェクトは pnpm 運用（`pnpm-lock.yaml` を使用）。

```bash
pnpm dev      # Start development server (localhost:4321)
pnpm build    # Build for production (outputs to ./dist)
pnpm preview  # Preview production build locally
```

## Deployment

Push to `master` branch triggers GitHub Actions workflow that builds and deploys to GitHub Pages. The site is available at https://sibukixxx.github.io.

## Architecture

This is an Astro 7.x static site with Tailwind CSS 4.x for styling.

### Content Collections

Two content collections defined in `src/content.config.ts`:

- **blog**: Markdown posts with frontmatter: `title`, `description`, `pubDate`, `tags[]`, `draft`
- **projects**: Markdown entries with frontmatter: `title`, `description`, `url?`, `github?`, `tech[]`

Content files live in `src/content/blog/` and `src/content/projects/`.

### Layout Hierarchy

- `Base.astro`: Root HTML layout with meta tags, OGP, fonts
- `BlogPost.astro`: Extends Base, adds article header with date/tags

### Routing

- `/` - Home page with hero, recent posts, featured projects
- `/en/portfolio` - English-language resume / portfolio page
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog posts (dynamic route from collection)
- `/projects` - Projects listing

### Styling

Tailwind CSS 4.x configured via `@tailwindcss/vite` plugin in astro.config.mjs. Custom theme variables (colors, fonts) defined in `src/styles/global.css` using `@theme` directive.

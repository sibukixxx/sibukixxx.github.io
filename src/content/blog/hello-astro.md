---
title: 'Astro でブログを作り直しました'
description: 'Gatsby から Astro に移行した経緯と、新しいサイトの構成について紹介します。'
pubDate: 2026-01-24
tags: ['Astro', 'Web開発']
---

## はじめに

このたび、ブログを Gatsby から Astro に移行しました。この記事では、移行の経緯と新しいサイトの構成について紹介します。

## なぜ Astro を選んだのか

Astro を選んだ理由は以下の通りです：

1. **ゼロ JavaScript** - デフォルトで JavaScript を送信しないため、高速なページ読み込みが可能
2. **コンテンツファースト** - Markdown/MDX を第一級でサポート
3. **モダンな DX** - TypeScript、Vite ベースの高速な開発体験
4. **柔軟性** - 必要に応じて React、Vue などのフレームワークを組み合わせ可能

## 技術スタック

新しいサイトは以下の技術で構築されています：

- **フレームワーク**: Astro 5.x
- **スタイリング**: Tailwind CSS 4.x
- **ホスティング**: GitHub Pages
- **デプロイ**: GitHub Actions

## Content Collections の活用

Astro の Content Collections を使用することで、型安全なコンテンツ管理が可能になりました。

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

## まとめ

Astro への移行により、よりシンプルで高速なブログを実現できました。今後もこのブログで技術的な学びを発信していきます。

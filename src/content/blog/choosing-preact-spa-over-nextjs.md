---
title: 'Next.js ではなく Preact SPA を選ぶケース'
description: 'SSR も SEO も不要な管理画面に Next.js は本当に必要か。Preact + TanStack Router + Signals + Vite という古典的な SPA 構成を、AI コーディング時代の「制約の設計」という観点から選び直す話。'
pubDate: 2026-08-09
tags: ['Preact', 'Next.js', 'フロントエンド', 'アーキテクチャ', 'AI']
draft: false
---

最近、新しい Web アプリを作るときに、必ずしも Next.js を選ばなくなった。

Next.js が悪いわけではない。むしろ非常に強力だ。SSR、SEO、ルーティング、Server Components、API、認証との統合など、Web アプリケーションを作るために必要なものが一通り揃っている。

ただ、考えてみると少し奇妙でもある。**管理画面を作りたいだけなのに、本当にそこまで必要なのか。**

最近自分が設計しているシステムでは、むしろ次のような構成を選ぶことが増えている。

```text
Backend
  Go API

Frontend
  Preact
  TypeScript
  Tailwind CSS
  TanStack Router
  Preact Signals
  Vite
```

つまり、かなり古典的な SPA である。なぜ今になって SPA なのか。

## Next.js を使う理由と、使わない理由は別

Next.js を採用する理由として、よく次のようなものが挙げられる。

- SEO
- SSR
- Server Components
- ファイルベースルーティング
- API Routes
- 認証
- Middleware
- Image Optimization
- サーバーとフロントをまとめて管理できる

どれも便利だ。問題は、**そのプロジェクトで本当にそれらを使うのか**ということだ。

たとえば、自社用の管理システムを考える。ログインしたユーザーしかアクセスしない。Google 検索に載せる必要もない。バックエンド API はすでに Go で存在する。フロントの仕事は、

```text
API からデータ取得 → 表示 → ユーザー操作 → API へ送信
```

ほぼこれだけだ。

この場合、SSR は必要ない。SEO も必要ない。Next.js の Server Actions も API Routes も必要ない。そうなると、Next.js を採用する理由が急激に減ってくる。

## SPA が向いているシステム

自分の中では、現在はだいたい次の基準で考えている。

**Preact SPA が向いているもの**

- 管理画面
- 社内ツール
- 業務システム
- ダッシュボード
- AI エージェントの操作画面
- SaaS のログイン後画面
- PoC・小規模サービス

**Next.js が向いているもの**

- メディア
- EC
- コンテンツサイト
- SEO 流入が重要なサービス
- 公開ページ主体の SaaS
- サーバーレンダリング自体に価値があるサービス

ポイントは、**SPA vs SSR という技術論から考えないこと**だと思っている。

まず「このページは誰がどうやって訪れるのか？」から考える。Google 検索から来るなら SSR や SSG には大きな意味がある。ログイン画面からしか入れないのであれば、その価値はかなり小さくなる。

## Backend が別にあるなら Next.js を Backend 化しない

これは最近かなり重要だと思っている。たとえば、こういう構造を作ることがある。

```text
Browser → Next.js → Go API → PostgreSQL
```

もちろん BFF として Next.js を置く明確な理由があれば問題ない。しかし、理由もなくこの構造にすると、API レイヤーが二重になる。だったら、

```text
Browser → Go API → PostgreSQL
```

でいいケースも多い。Frontend は UI に集中する。Backend は Business Logic に集中する。かなり分かりやすい。

## Preact を選んでいる理由

そこで Preact を使っている。理由は単純に「React より軽いから」だけではない。むしろ自分が重要だと思っているのは、**フロントエンドを小さな UI ランタイムとして扱えること**だ。

```text
Preact
├─ Component
├─ Router
├─ State
└─ API Client
```

これくらいでいい。フロントエンド側に巨大なアーキテクチャを持たせたくない。Business Logic は Go 側に置く。DB アクセスも当然 Backend。認証もできるだけ Backend との境界を明確にする。

Frontend は「API の状態を人間が操作できる形に変換するもの」くらいの位置づけでいいと思っている。

## TanStack Router を使う

SPA になると当然 Router が必要になる。そこで TanStack Router を使う。

自分が欲しいのは、単に URL を切り替える Router ではない。たとえば、

```text
/dashboard
/offers
/categories
/contents
/sns-accounts
/analytics
```

という管理画面があったとする。ここで、

```text
URL → Route → Loader → Component
```

という関係を明示的にしておきたい。

Next.js ではディレクトリ構造によって多くのことが暗黙的に決定される。これは便利でもある。一方 SPA では、ある程度明示的に書くことで、**アプリケーション構造をコード上にはっきり残す**ことができる。AI にコードを書かせる場合にも、この明示性は意外と重要になる。

## Signals を Global State 管理ツールとして使わない

Preact Signals も使っている。ただし、何でも Signals に入れるわけではない。ここはかなり重要だと思っている。

たとえば、

```ts
const sidebarOpen = signal(false)
```

のような UI state には向いている。一方、案件一覧・売上データ・ユーザー情報・分析結果のような Server State まで全部 Signals に入れ始めると、状態管理が再び巨大化する。

基本的には次のように分ける。

```text
Local UI State → Signals
Server State   → API / Query
```

「Global State をどう管理するか」を考え続けるより、**そもそも Global State を作らない**方がシステムは単純になる。

## AI コーディング時代には「単純なアーキテクチャ」が強い

そして最近、この構成を選ぶ最大の理由がこれだ。

AI にコードを書かせる場合、フレームワークの機能が多ければ多いほど便利になるとは限らない。AI はコードを書くこと自体は非常に速い。問題になるのは、**どこに書くべきなのか**である。

Next.js では同じ処理でも、

- Server Component
- Client Component
- Server Action
- Route Handler
- Middleware
- Browser

など、実行場所の候補が複数存在する。人間でも設計を間違える。当然 AI も間違える。

一方、**Preact = Browser、Go = Server** なら非常に分かりやすい。AI には、

- Business Logic は Go に置く
- Preact には Business Logic を書かない
- Component から直接 fetch しない
- API Client 経由でアクセスする
- Signals は UI State だけに使う

とルールを渡せばいい。AI が生成できるコード量が増えれば増えるほど、**自由度を減らすアーキテクチャの価値が上がる**と思っている。

## 機能が多いことは必ずしもメリットではない

以前は「できることが多いフレームワーク = 優れたフレームワーク」という感覚が強かった。しかし AI が実装を大量に生成するようになると、少し考え方が変わる。

重要なのは **Capability ではなく Constraint** になる。つまり「何ができるか」より「どうしか書けないか」の方が重要になってくる。

AI に自由に設計させると、コードベースは簡単に発散する。だから最初から、

```text
Frontend
├─ routes
├─ components
├─ features
├─ api
└─ signals

Backend
├─ domain
├─ usecase
├─ repository
└─ handler
```

くらいまで決めてしまう。AI にはその範囲内で実装させる。これは AI コーディングにおける一種の Harness だと思っている。

## Tailwind も同じ理由で使う

Tailwind を使う理由も似ている。単純に CSS を書く量を減らしたいだけではない。AI に、

- Tailwind だけを使用する
- 独自 CSS を増やさない
- Spacing は既存の Scale を使う
- 共通 UI は Component 化する

と指定できる。すると AI が勝手に `styles.css`、`foo.module.css`、styled-components、inline style などを大量発生させることを防げる。これも Constraint である。

## Vite で十分なケースはかなり多い

ビルドには Vite を使う。SPA なのでビルドすれば静的ファイルが生成される。あとは CDN や Static Hosting に置けばいい。サーバーサイドレンダリングのランタイムを持つ必要もない。つまり Deployment も、

```text
Preact → Vite Build → Static Files → CDN
```

で終わる。Backend は Backend として Go をデプロイする。この分離は運用上も分かりやすい。

## ただし公開サイトまで SPA にする必要はない

ここで重要なのは、**全部 Preact にする必要はない**ということである。たとえば自分が作っているようなアフィリエイト運用システムなら、

```text
                ┌─ Public Site
                │   SEO / SSG / SSR
                │
Go API ─────────┤
                │
                └─ Admin
                    Preact SPA
```

でいい。管理画面と公開サイトでは要求が違う。だったら技術も分ければいい。

「このプロジェクトは Next.js」「このプロジェクトは Preact」という単位で考える必要もない。**ページの役割ごとにアーキテクチャを分離する。**こちらの方が自然だと思う。

## Preact SPA を選ばないケース

逆に、最初から次の要求が分かっているなら、自分なら Next.js など SSR/SSG を得意とするフレームワークを検討する。

- 検索流入が事業の中心
- 大量の公開ページが存在する
- OGP や Metadata が重要
- コンテンツ配信が中心
- SSR そのものに UX 上の価値がある
- 公開サイトと Application が密接

特に SEO については注意が必要だ。最初に「SEO はいらないから SPA でいい」と言って作り始め、半年後に「やっぱり検索流入を取りたい」となるとアーキテクチャ変更のコストが発生する。

だから SPA を採用するときには、**将来どこが公開領域になるのか**だけは最初に考えておいた方がいい。自分なら公開領域を別 Application として切れる境界を作っておく。

## 結局「軽いから Preact」ではない

Preact を選ぶ理由を「React より軽いから」だけで説明すると、あまり本質的ではないと思う。自分が Preact SPA を選んでいる理由は、

- 不要な Server Rendering を持たない
- Frontend と Backend の責務を分ける
- Application の実行場所を明確にする
- 状態管理を増やさない
- Deployment を単純にする
- AI が迷える選択肢を減らす

ためだ。つまり、**機能を増やすためではなく、設計上の選択肢を減らすために Preact を使っている。**

## AI 時代のフレームワーク選定

これからフレームワーク選定の基準は少し変わっていくのではないかと思っている。これまでは、

- Developer Experience
- Ecosystem
- Performance
- Features

などが主な評価軸だった。そこに今後は、**AI がアーキテクチャを誤解しにくいか**という評価軸が入ってくる。

AI は実装速度を劇的に上げる。だからこそ、人間の仕事は「コードを書く」ことから「AI が間違ったコードを書きにくい構造を作る」ことへ少しずつ移っていく。

その観点から見ると、

```text
Preact + TypeScript + Tailwind + TanStack Router + Signals + Vite
+
Go API
```

という、一見すると地味な構成はかなり面白い。

Next.js のような巨大なフレームワークを使わなければ高度な Web アプリケーションを作れないわけではない。場合によっては逆だ。**必要なものだけを組み合わせた小さなアーキテクチャの方が、AI 時代には長く保守できる。**

最近はそんなことを考えている。

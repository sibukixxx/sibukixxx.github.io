---
title: 'Next.jsではなくPreact SPAを選ぶケース'
description: 'SSRもSEOも不要な管理画面にNext.jsは本当に必要か。Preact + TanStack Router + Signals + Viteという古典的なSPA構成を選ぶ理由と、AIコーディング時代における「制約の強いアーキテクチャ」の価値について考える。'
pubDate: 2026-08-09
tags: ['Preact', 'Next.js', 'Frontend', 'Architecture', 'AI Coding']
draft: false
---

最近、新しいWebアプリを作るときに、必ずしもNext.jsを選ばなくなった。

Next.jsが悪いわけではない。むしろ非常に強力だ。SSR、SEO、ルーティング、Server Components、API、認証との統合など、Webアプリケーションを作るために必要なものが一通り揃っている。

ただ、考えてみると少し奇妙でもある。管理画面を作りたいだけなのに、本当にそこまで必要なのか。

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

つまり、かなり古典的なSPAである。なぜ今になってSPAなのか。

## Next.jsを使う理由と、使わない理由は別

Next.jsを採用する理由として、よく次のようなものが挙げられる。

- SEO
- SSR
- Server Components
- ファイルベースルーティング
- API Routes
- 認証・Middleware
- Image Optimization
- サーバーとフロントをまとめて管理できる

どれも便利だ。問題は、**そのプロジェクトで本当にそれらを使うのか**ということだ。

たとえば、自社用の管理システムを考える。ログインしたユーザーしかアクセスしない。Google検索に載せる必要もない。バックエンドAPIはすでにGoで存在する。フロントの仕事は、

```text
APIからデータ取得 → 表示 → ユーザー操作 → APIへ送信
```

ほぼこれだけだ。

この場合、SSRは必要ない。SEOも必要ない。Server ActionsもAPI Routesも必要ない。そうなると、Next.jsを採用する理由が急激に減ってくる。

## SPAが向いているシステム

自分の中では、現在はだいたい次の基準で考えている。

**Preact SPAを選ぶ**

- 管理画面
- 社内ツール・業務システム
- ダッシュボード
- AIエージェント操作画面
- SaaSのログイン後画面
- PoC・小規模サービス

**Next.jsを選ぶ**

- メディア・EC・コンテンツサイト
- SEO流入が重要なサービス
- 公開ページ主体のSaaS
- サーバーレンダリング自体に価値があるサービス

ポイントは、SPA vs SSRという技術論から考えないことだと思っている。まず「このページは誰がどうやって訪れるのか？」から考える。

Google検索から来るならSSRやSSGには大きな意味がある。ログイン画面からしか入れないのであれば、その価値はかなり小さくなる。

## Backendが別にあるならNext.jsをBackend化しない

これは最近かなり重要だと思っている。たとえば、こういう構造を作ることがある。

```text
Browser → Next.js → Go API → PostgreSQL
```

もちろんBFFとしてNext.jsを置く明確な理由があれば問題ない。しかし、理由もなくこの構造にすると、APIレイヤーが二重になる。だったら、

```text
Browser → Go API → PostgreSQL
```

でいいケースも多い。

FrontendはUIに集中する。BackendはBusiness Logicに集中する。かなり分かりやすい。

## Preactを選んでいる理由

そこでPreactを使っている。理由は単純に「Reactより軽いから」だけではない。むしろ自分が重要だと思っているのは、**フロントエンドを小さなUIランタイムとして扱えること**だ。

```text
Preact
├─ Component
├─ Router
├─ State
└─ API Client
```

これくらいでいい。フロントエンド側に巨大なアーキテクチャを持たせたくない。

Business LogicはGo側に置く。DBアクセスも当然Backend。認証もできるだけBackendとの境界を明確にする。Frontendは「APIの状態を人間が操作できる形に変換するもの」くらいの位置づけでいいと思っている。

## TanStack Routerを使う

SPAになると当然Routerが必要になる。そこでTanStack Routerを使う。

自分が欲しいのは、単にURLを切り替えるRouterではない。たとえば、

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

Next.jsではディレクトリ構造によって多くのことが暗黙的に決定される。これは便利でもある。一方SPAでは、ある程度明示的に書くことで、**アプリケーション構造をコード上にはっきり残す**ことができる。AIにコードを書かせる場合にも、この明示性は意外と重要になる。

## SignalsはGlobal State管理ツールとして使わない

Preact Signalsも使っている。ただし、何でもSignalsに入れるわけではない。ここはかなり重要だと思っている。

たとえば、

```ts
const sidebarOpen = signal(false)
```

のようなUI stateには向いている。一方、案件一覧・売上データ・ユーザー情報・分析結果のようなServer Stateまで全部Signalsに入れ始めると、状態管理が再び巨大化する。

基本的には、こう分ける。

```text
Local UI State → Signals
Server State   → API / Query
```

「Global Stateをどう管理するか」を考え続けるより、**そもそもGlobal Stateを作らない**方がシステムは単純になる。

## AIコーディング時代には「単純なArchitecture」が強い

そして最近、この構成を選ぶ最大の理由がこれだ。

AIにコードを書かせる場合、Frameworkの機能が多ければ多いほど便利になるとは限らない。AIはコードを書くこと自体は非常に速い。問題になるのは、**どこに書くべきなのか**である。

Next.jsでは同じ処理でも、Server Component、Client Component、Server Action、Route Handler、Middleware、Browserなど、実行場所の候補が複数存在する。人間でも設計を間違える。当然AIも間違える。

一方、

```text
Preact = Browser
Go     = Server
```

なら非常に分かりやすい。AIには、こうルールを渡せばいい。

- Business LogicはGoに置く
- PreactにはBusiness Logicを書かない
- Componentから直接fetchしない。API Client経由でアクセスする
- SignalsはUI Stateだけに使う

AIが生成できるコード量が増えれば増えるほど、**自由度を減らすArchitectureの価値が上がる**と思っている。

## Frameworkの機能が多いことは必ずしもメリットではない

以前は「できることが多いFramework = 優れたFramework」という感覚が強かった。しかしAIが実装を大量に生成するようになると、少し考え方が変わる。

重要なのはCapabilityではなくConstraintになる。つまり「何ができるか」より、**「どうしか書けないか」**の方が重要になってくる。

AIに自由に設計させると、コードベースは簡単に発散する。だから最初から、

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

くらいまで決めてしまう。AIにはその範囲内で実装させる。これはAI Codingにおける一種のHarnessだと思っている。

## Tailwindも同じ理由で使う

Tailwindを使う理由も似ている。単純にCSSを書く量を減らしたいだけではない。

AIに、

- Tailwindだけを使用する
- 独自CSSを増やさない
- Spacingは既存Scaleを使う
- 共通UIはComponent化する

と指定できる。するとAIが勝手に `styles.css` や `foo.module.css`、styled-components、inline styleなどを大量発生させることを防げる。これもConstraintである。

## Viteで十分なケースはかなり多い

ビルドにはViteを使う。SPAなのでビルドすれば静的ファイルが生成され、あとはCDNやStatic Hostingに置けばいい。サーバーサイドレンダリングのRuntimeを持つ必要もない。

つまりDeploymentも、

```text
Preact → Vite Build → Static Files → CDN
```

で終わる。BackendはBackendとしてGoをデプロイする。この分離は運用上も分かりやすい。

## ただし公開サイトまでSPAにする必要はない

ここで重要なのは、**全部Preactにする必要はない**ということである。

たとえば自分が作っているようなアフィリエイト運用システムなら、

```text
                ┌─ Public Site
                │   SEO / SSG / SSR
                │
Go API ─────────┤
                │
                └─ Admin
                    Preact SPA
```

でいい。管理画面と公開サイトでは要求が違う。だったらTechnologyも分ければいい。

「このプロジェクトはNext.js」「このプロジェクトはPreact」という単位で考える必要もない。ページの役割ごとにArchitectureを分離する。こちらの方が自然だと思う。

## Preact SPAを選ばないケース

逆に、最初から次の要求が分かっているなら、自分ならNext.jsなどSSR/SSGを得意とするFrameworkを検討する。

- 検索流入が事業の中心
- 大量の公開ページが存在する
- OGPやMetadataが重要
- コンテンツ配信が中心
- SSRそのものにUX上の価値がある
- 公開サイトとApplicationが密接

特にSEOについては注意が必要だ。最初に「SEOはいらないからSPAでいい」と言って作り始め、半年後に「やっぱり検索流入を取りたい」となるとArchitecture変更のコストが発生する。

だからSPAを採用するときには、**将来どこが公開領域になるのか**だけは最初に考えておいた方がいい。自分なら公開領域を別Applicationとして切れる境界を作っておく。

## 結局「軽いからPreact」ではない

Preactを選ぶ理由を「Reactより軽いから」だけで説明すると、あまり本質的ではないと思う。

自分がPreact SPAを選んでいる理由は、

- 不要なServer Renderingを持たない
- FrontendとBackendの責務を分ける
- Applicationの実行場所を明確にする
- 状態管理を増やさない
- Deploymentを単純にする
- AIが迷える選択肢を減らす

ためだ。つまり、**機能を増やすためではなく、設計上の選択肢を減らすためにPreactを使っている。**

## AI時代のFramework選定

これからFramework選定の基準は少し変わっていくのではないかと思っている。

これまではDeveloper Experience、Ecosystem、Performance、Featuresなどが主な評価軸だった。そこに今後は、**AIがArchitectureを誤解しにくいか**という評価軸が入ってくる。

AIは実装速度を劇的に上げる。だからこそ、人間の仕事は「コードを書く」ことから「AIが間違ったコードを書きにくい構造を作る」ことへ少しずつ移っていく。

その観点から見ると、

```text
Preact + TypeScript + Tailwind + TanStack Router + Signals + Vite
+
Go API
```

という、一見すると地味な構成はかなり面白い。

Next.jsのような巨大なFrameworkを使わなければ高度なWebアプリケーションを作れないわけではない。場合によっては逆だ。必要なものだけを組み合わせた小さなArchitectureの方が、AI時代には長く保守できる。

最近はそんなことを考えている。

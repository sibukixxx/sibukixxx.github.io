---
title: 'AIコーディングで重要なのはプロンプトよりHarnessだった'
description: 'Promptをどれだけ丁寧に書いてもAIは間違えます。型・Lint・Test・CIといった「間違ったコードが通らない環境」= Harness こそがAIコーディングを安定させるという話です。'
pubDate: 2026-08-09
tags: ['AI Coding', 'Harness', 'Architecture']
draft: false
---

AIコーディングを使い始めた頃は、かなり Prompt を気にしていました。

```text
あなたはシニアソフトウェアエンジニアです。
以下の要件に従って実装してください。
- Clean Architecture
- TypeScript
- 型安全
- テストを書く
- 可読性を重視する
```

こういう指示を丁寧に書けば、良いコードが出てくると思っていました。

もちろん Prompt は重要です。ただ、しばらく使っていると別のことに気づきます。**Prompt をどれだけ丁寧に書いても、AI は普通に間違えます。**

逆に、Prompt が多少雑でも、TypeScript compiler・ESLint・Custom Lint・Test・Architecture Rule・CI のような仕組みがしっかりしているプロジェクトでは、AI はかなり安定してコードを書けます。

最近は、**AIコーディングで本当に重要なのは Prompt Engineering ではなく Harness Engineering なのではないか**と考えています。

## Harness とは何か

Harness は本来「馬具」「安全帯」のような意味の言葉です。ソフトウェアの文脈では、**対象を一定の環境に固定し、制御し、評価する仕組み**くらいに考えると分かりやすいです。

```text
AI Agent
   ↓
Code
   ↓
Compiler / Lint / Test / Architecture Check / Security Check
   ↓
Pass / Fail
```

この周囲の仕組み全体が Harness です。つまり「AI に正しいコードを書かせる」のではなく、**「間違ったコードを書いたら通らない環境を作る」**という考え方です。

## Prompt は「お願い」でしかない

たとえば「Component から直接 fetch しないでください」と Prompt で伝えたとします。AI はかなりの確率で守りますが、コードベースが大きくなればいつかこう書きます。

```ts
export function UserList() {
  useEffect(() => {
    fetch("/api/users")
  }, [])
}
```

「IMPORTANT: 絶対に fetch してはいけません」と Prompt を強くしても、完全には防げません。Prompt は **Rule ではなく Instruction** であり、AI が解釈する余地があるからです。

## Rule にできるものは Prompt に書かない

だったら機械的に禁止してしまえばいいのです。ESLint や AST で `components/**` からの `fetch()` 呼び出しを禁止すれば、書いた瞬間にこうなります。

```text
Error: Direct fetch is prohibited in components.
Use apiClient instead.
```

「fetch を書かないでください」という Prompt より、「fetch を書いたら CI を落とす」Lint の方が確実です。ここから自分の考え方が変わりました。

**機械的に検証できるものを、自然言語でお願いしない。**

## TypeScript と Schema は AI の Harness になる

TypeScript のメリットは型安全や IDE 補完だけではありません。AI コーディングでは **Compiler が AI を評価してくれる**という意味があります。AI が間違ったコードを書いても `tsc` が落としてくれる。TypeScript Compiler は AI Code Evaluator として使えます。

この視点で見ると、型を細かく設計する意味も変わります。人間のためだけでなく、**AI が間違えられる範囲を狭くするために型を書く**のです。

さらに Runtime validation まで入れると二重の制約になります。

```ts
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.enum(["admin", "user"])
})
```

AI が勝手に `role = "super-admin"` のような値を扱おうとしても弾けます。AI コーディングでは、自由度を高くするより **Valid State の範囲を狭くした方が安定します**。

## Architecture も機械的に守らせる

domain / application / infrastructure / presentation の4層システムで、「domain は他層に依存しない」といったルールを README に書くだけだと、AI はそのうち破ります。

```ts
// domain/user.ts
import { prisma } from "../infrastructure/prisma"
```

そこで「domain から infrastructure への import は禁止」を AST や Dependency Graph で検査する Architecture Test を入れます。すると Architecture が **Documentation ではなく Executable Specification** になります。これは AI コーディングとの相性が非常に良いです。

## 良い設計とは、AI が間違えにくい設計

良い Architecture の評価軸は、これまで保守性・拡張性・可読性などでした。AI コーディングでは、そこに**「AI が誤解しにくいか」**という軸が加わると思います。

```text
src/
  components/
  hooks/
  utils/
  helpers/
  services/
  common/
```

この構造では人間でも「utils？helpers？services？」と迷います。当然 AI も迷い、同じ機能が分散していきます。一方、

```text
features/
  users/
    api.ts
    schema.ts
    types.ts
    components/
```

のように境界が明確なら、AI も配置場所を判断しやすい。Architecture には **LLM Interpretability** のような性質も必要になってきます。

## Repository 構造と実例が Prompt になる

毎回「Feature 単位で配置してください」と書く必要はありません。Repository が `features/auth/`、`features/users/` という構造になっていて、各 feature の中身も統一されていれば、新しく `orders` を作らせたとき AI は自然に同じ構造を作ります。**既存コードそのものが Few-shot Prompt になる**のです。

実装パターンも同じです。フォームの要件を毎回 Prompt に書くより、`UserForm.tsx` に完璧な実装例を一つ置いておき、「UserForm と同じパターンで ProductForm を作って」と頼む方が確実です。

AI コーディングでは、Documentation 以上に **Canonical Example** が重要になります。これは長大な CLAUDE.md を書くより効く場合があります。

## Test は AI への仕様になる

普通は Implementation → Test の順で考えますが、AI コーディングでは逆の使い方ができます。

```ts
it("returns 409 when email already exists", async () => {
  const res = await register({ email: "existing@example.com" })
  expect(res.status).toBe(409)
})
```

これだけ先に用意して「この Test が通るように実装して」と指示すれば、自然言語より仕様が明確になります。**Test は AI にとって非常に強い Prompt でもある**のです。

Issue の Acceptance Criteria（emailは必須、既存emailなら409、成功時201…）を Integration Test に変えれば、`Issue → Test → AI → Implementation → CI` という流れになります。人間の役割は「コードを書く」から**「成功条件を書く」**方へ移ります。

## CI は AI の教師になる

理想は次の Loop です。

```text
AI → Implement → lint / typecheck / test / build → Failure → AI Fix
```

AI 自身が Compiler Error や Test Failure を読んで修正できます。CI は単なる品質保証ではなく、**AI に Feedback を返す教師**になります。

そうなると Error Message の品質も重要になります。

```text
悪い例: Invalid architecture.

良い例: Domain layer must not import infrastructure.
        Found: src/domain/user.ts → src/infrastructure/prisma.ts
        Move DB access to repository implementation.
```

後者なら AI はかなり高い確率で自動修正できます。Error Message UX は Developer Experience だけでなく **Agent Experience** の問題になります。

## Prompt Engineering が不要になるわけではない

もちろん Prompt は重要です。何を実装するのか、何を変更してはいけないのか、Scope はどこまでか、は自然言語で伝える必要があります。ただし役割が違います。

**Prompt は Intent を伝える。Harness は Constraint を保証する。**

たとえば「決済機能を追加してください。Stripe を使用します」は Prompt でいい。一方「domain 層から Stripe SDK を import してはいけない」は Lint や Architecture Test にすべきです。

## AI 向け Guideline を巨大化させない

AI コーディングを始めると、CLAUDE.md や AGENTS.md にルールを大量に書きたくなります。しかし 1000 行の Guideline はスケールしません。AI も全部は守らないし、人間も更新しなくなります。

Machine enforceable な Rule はコードに移します。

```text
Formatting       → Prettier
Import order     → ESLint
Dependency rule  → Architecture Test
Type rule        → TypeScript
API schema       → Zod / OpenAPI
Behavior         → Test
```

Prompt や Guideline には、「なぜこの Architecture なのか」「例外は何か」「現在の Goal は何か」といった、**機械では判定しにくい情報だけ**を書きます。

## AST が再び重要になる

Custom Lint を作ると `Source Code → AST → Rule → Error` という構造になります。「Component 内で fetch 禁止」「Repository 以外から Prisma 禁止」などは AST で検出できます。

AI がコードを大量に書くほど、コードを読む技術より**コードを機械的に検査する技術**の価値が上がります。静的解析そのものが新しいわけではなく、**AI がコード生成量を爆発的に増やしたことで、静的解析の価値が再評価されている**のだと思います。

## LLM Evaluation と同じ構造

[前回の LLM Evaluation の記事](/blog/llm-evaluation)で `LLM → Output → Evaluator` という構造を書きました。AI コーディングもまったく同じです。

```text
Coding Agent → Code → Evaluator
```

Evaluator が Compiler・Lint・Test・AST Rule・Security Scanner・Architecture Test になるだけです。AI コーディングも**一種の LLM Evaluation 問題**として考えることができます。

## 強い AI より、強い Harness

AI コーディングの話は「どの Model が一番コードを書けるか」になりやすいです。もちろん Model 性能は重要ですが、実際の開発では **Model A + 弱い Harness より、Model B + 強い Harness の方が安定する**ことがあります。

Model は間違えます。今後さらに賢くなっても、おそらくゼロにはなりません。だから「間違えない AI」を待つより、**「間違えても壊れない開発環境」を作る方が現実的**です。

ソフトウェア開発そのものが、

```text
Human writes code
        ↓
Human designs constraints
AI generates code
Machine evaluates code
```

へ移行しています。人間が書くコード量は減るかもしれませんが、その代わり「何を許すか」「何を禁止するか」「何を成功とするか」「どう検証するか」を設計する仕事が増えます。

そう考えると、これから重要になるのは Prompt Engineering だけではありません。むしろ、**AI が安全かつ一貫して働ける実行環境を作る Harness Engineering** なのだと思います。

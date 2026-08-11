---
title: 'AI時代にASTを学ぶ意味'
description: 'LLMが得意な曖昧な意味理解と、ASTが得意な厳密な構造理解を組み合わせる。AI Coding Harnessの一部としてASTを学ぶ意義と実践的な学習順序をまとめます。'
pubDate: 2026-08-09
tags: ['AST', 'ESLint', 'TypeScript', 'AI']
draft: false
---

AIがコードを書いてくれる時代になった一方で、コードを機械的に理解・検査・変換する技術の価値はむしろ上がっている。
その中心にあるのがAST（Abstract Syntax Tree / 抽象構文木）。

## ASTとは

例えば、

```ts
const price = total * tax;
```

というコードを単なる文字列としてではなく、

```text
VariableDeclaration
├─ Identifier: price
└─ BinaryExpression
   ├─ Identifier: total
   ├─ Operator: *
   └─ Identifier: tax
```

のような「プログラムの構造」として表現したものがAST。

ESLintも、ParserがソースコードをASTへ変換し、そのASTを走査してルール違反を検出する仕組みになっている。

## なぜAI時代に重要なのか

LLMに、

> このリポジトリで危険なコードを探して

と頼むことはできる。

しかしLLMだけでは、

- 見落とし
- 誤検出
- 毎回結果が変わる
- 巨大コードベースではコンテキストが足りない

といった問題がある。

そこで、

```text
Source Code
    ↓
AST / Static Analysis
    ↓
怪しい箇所を機械的に抽出
    ↓
LLM
    ↓
意味・設計・修正方法を判断
```

という構成が有効になる。

つまり、ASTはAIの代替ではなく、AIに正確な材料を渡すためのHarnessになる。

## 何ができるのか

### 1. 独自Lint

例えば、

```ts
repository.findMany();
```

を直接Controllerから呼ぶことを禁止する、といったプロジェクト独自ルールを作れる。

ESLintではASTノードをVisitorで検査し、違反箇所を報告したり、自動修正を提供したりできる。

これをCIに入れれば、「AIがアーキテクチャルールを破ったコードを書く」ことも機械的に防げる。

### 2. コード検索・可視化

ASTを解析すれば、

- 関数
- Class
- Import
- API
- DBアクセス
- Dependency

などを構造として取得できる。

単純なgrepより正確なので、

```text
Controller
   ↓
UseCase
   ↓
Repository
   ↓
Prisma
```

のような依存関係の可視化にも使える。

Tree-sitterのようなParserは複数言語のSyntax Treeを高速に構築でき、エディタで入力中のコードにも追従できるよう設計されている。

### 3. Codemod / Refactoring

ASTは読むだけではなく変更もできる。

例えば、

```ts
oldApi()
```

を、

```ts
newApi()
```

へ大量に変換する。

`ts-morph`ではTypeScript ASTを操作してNodeの追加・削除・置換などができる。

大規模Migrationでは、「AIに1000ファイル書き換えさせるより、AST変換ルールを書いてAIにそのルールを作らせる」方が安全な場合がある。

## AIとの組み合わせ

特に面白いのは、

```text
AST
 ↓
Rule Engine
 ↓
LLM
 ↓
修正案
 ↓
AST / Test / Lint
 ↓
検証
```

というループ。

AIに自由にコードを書かせるのではなく、機械的に検証できる範囲をAST・Lint・型・Testで囲う。

AI Codingで重要になる「Harness Engineering」の一部としてASTを見ると理解しやすい。

## 学ぶなら

TypeScriptなら、

1. ASTとは何か
2. ESTree
3. ESLint Custom Rule
4. TypeScript Compiler API
5. ts-morph
6. Codemod
7. AST + LLM

くらいの順番がよさそう。

いきなりCompiler内部を読む必要はない。

まず、「特定の関数をControllerから呼んだらESLint Errorにする」程度のCustom Ruleを1つ作る。そこからASTを触り始めるのが実践的。

## 結論

AI時代だからASTが不要になるのではなく、逆。

LLMは曖昧な意味理解が得意で、ASTは厳密な構造理解が得意。

```text
LLM（意味・意図・設計判断）
  +
AST（構造・制約・検証）
  =
AI Coding Harness
```

という役割分担になる。

これから重要なのは、「AIにコードを書かせる能力」だけではなく、「AIが間違ったコードを書けない仕組みを作る能力」なのだと思う。

---
title: 'LLM Evaluation を「なんとなく」で終わらせない'
description: 'LLM機能の開発が「なんとなく良くなったので採用」で進んでいませんか。Evaluation Dataset の作り方、4つの評価方法、LLM-as-a-Judge の限界、Production Data を評価に戻すループまで、LLM Evaluation の設計をまとめます。'
pubDate: 2026-08-09
tags: ['LLM', 'Evaluation', 'AI Coding']
draft: false
---

LLM を使った機能を作っていると、かなりの確率でこうなります。

「この回答、前より良くなった気がする」

そして次に、「Prompt を少し変えてみる」。さらに、「なんとなく良くなったので採用」。

PoC ならこれでも構いません。ただし、LLM をプロダクトに組み込むなら、この開発方法にはかなり危うさがあります。なぜなら、**「良くなった」が測定されていないから**です。

最近は、LLM 機能を作るときには Prompt・Model・RAG・Agent と同じくらい、**Evaluation を最初から設計する必要がある**と考えています。

## 普通のソフトウェアならテストを書く

通常のプログラムなら、たとえばこういう関数があります。

```ts
function add(a: number, b: number) {
  return a + b
}
```

評価は簡単です。

```ts
expect(add(1, 2)).toBe(3)
```

入力と期待値が明確だからです。

しかし LLM ではそうはいきません。出力が自然言語なので、**完全一致では評価できない**のです。

たとえば「この商品を初心者向けに説明してください」に対して、A という回答も B という回答も C という回答も、すべて正解になり得ます。ここから LLM Evaluation の難しさが始まります。

## 「正解」を1つに決めない

LLM Evaluation で最初に変えなければならないのは、**Expected Output に対する考え方**だと思います。

通常のテストは `input → expected output` ですが、LLM の場合はむしろ、

```text
input → evaluation criteria → output
```

と考えた方がいいです。

たとえば HS コード候補を説明する AI なら、

- 正確性
- 根拠
- 過度に断定していない
- 必要な追加情報を提示している
- フォーマットを守っている

などを評価します。つまり「この文章と一致したか」ではなく、**「この回答が満たすべき条件を満たしたか」**を見ます。

## まず Evaluation Dataset を作る

自分なら LLM 機能を作るとき、最初に小さな Dataset を作ります。たとえば商品分類 AI なら、こういう形式です。

```json
[
  {
    "input": "綿100%の男性用Tシャツ",
    "expected": {
      "category": "衣類",
      "mustMention": ["素材", "用途"]
    }
  }
]
```

これを大量に作る必要はありません。最初なら 20〜100 ケースでも十分意味があります。

重要なのは、**毎回同じ質問で Model や Prompt を比較できるようにすること**です。これがないと、昨日の Prompt と今日の Prompt のどちらが良いのか比較できません。

## Happy Path だけを評価しない

Dataset を作るとき、普通の入力だけを並べてもあまり意味がありません。むしろ重要なのは、

- 曖昧な入力
- 情報不足
- 矛盾した入力
- 非常に長い入力
- 専門用語
- 誤字
- 誘導的な質問

などです。

たとえば「これは絶対 HS コード 8471 ですよね？」と聞かれたとします。LLM が「はい、8471です。」と答えるなら危険です。良い回答は、

> 提供された情報だけでは確定できません。用途・構成・主要機能を確認する必要があります。

かもしれません。

つまり Evaluation Dataset とは、**正常系テストケース集ではなく、LLM を壊しにいくケース集でもある**のです。

## 評価方法を4つに分ける

LLM Evaluation には1種類の評価方法しかないわけではありません。自分なら大きく4つに分けます。

### 1. Deterministic Evaluation

コードで判定できるものです。たとえば JSON 出力なら、

- JSON として parse できるか
- 必須 field が存在するか
- enum の範囲内か
- 文字数制限を守っているか
- URL 形式か

など。これは普通のテストで十分です。LLM Judge を使う必要はありません。

### 2. Reference Based Evaluation

既知の正解と比較できるものです。分類、ラベル、数値、固有名詞などが該当します。

```text
expected = 8471
actual   = 8471
```

なら単純に判定できます。自然言語部分まで全部 LLM Judge に任せる必要はありません。

### 3. LLM-as-a-Judge

自然言語品質の評価です。「分かりやすいか」「根拠が十分か」「質問に答えているか」「冗長すぎないか」などを、別の LLM に「この回答を1〜5点で評価してください」のように採点させます。

ただし「なんとなく良い回答か評価してください」では意味がありません。**Judge にも Rubric を渡します。**

```text
5: 正確で、根拠を示し、情報不足を明示している
3: 概ね正しいが、重要な根拠が不足している
1: 誤った断定、または重大な情報欠落がある
```

というように基準を書きます。

### 4. Pairwise Evaluation

LLM Judge に「この回答を100点満点で評価してください」と聞くより、**「回答 A と回答 B のどちらが良いか」を比較させる方が使いやすい**ケースが多いです。

たとえば Prompt v1 と Prompt v2 を同じ Dataset に通し、Judge に「A が良い / B が良い / 引き分け」で判定させます。すると、

```text
Prompt v2 win rate = 67%
```

のように比較できます。これはかなり実践的です。プロンプト改善とは本来、before と after の比較だからです。

## LLM Judge も信用しすぎない

ここはかなり重要だと思っています。

LLM-as-a-Judge を導入すると「自動評価できた」気分になります。しかし Judge も LLM です。つまり、**評価する側も間違える**という問題があります。

たとえば Judge には、

- 長い回答を高評価する
- 自分と似た表現を好む
- 提示順（位置）によって評価が変わる
- Model によって評価傾向が違う

といった偏りが発生し得ます。

だから「LLM Judge ＝ 正解」ではありません。自分なら Judge の役割を、Human Evaluation を完全に置き換えるものではなく、**大量の候補を一次スクリーニングするもの**として扱います。

## 「Prompt を変えたら全部評価する」

ここまで作ると、LLM 開発が普通のソフトウェア開発に近づいてきます。たとえば、

```text
prompts/
  classify-v1.txt
  classify-v2.txt
evals/
  dataset.json
  evaluate.ts
```

という構造にして、Prompt を変更したら `pnpm eval` を実行します。結果が、

```text
Accuracy           91% → 94%
Format compliance  99% → 99%
Hallucination rate  6% →  3%
Average cost       $0.012 → $0.015
Latency             820ms → 1040ms
```

と出ます。ここまでくると「なんとなく良くなった」から脱却できます。

## Accuracy だけを見ると危険

LLM Evaluation で面白いのは、**品質だけを最大化すればいいわけではない**というところです。

たとえば Model A が、

```text
Accuracy 96% / Cost $0.04 / Latency 4sec
```

Model B が、

```text
Accuracy 93% / Cost $0.003 / Latency 600ms
```

だったとします。プロダクトによっては Model B の方が圧倒的に良いです。

だから Evaluation では Quality・Cost・Latency を一緒に見ます。自分なら最低でも、

- Task Success Rate
- Hallucination Rate
- Format Compliance
- Latency
- Token Usage
- Cost

くらいは記録します。

## Failure Category を記録する

平均点だけを見るのも危険です。

たとえば Accuracy が 92% だったとしても、8% の失敗が全部「情報不足なのに断定した」なのであれば重大かもしれません。そこで失敗を分類します。

```text
wrong_answer
missing_information
hallucination
format_error
overconfident
irrelevant
tool_error
```

のようなカテゴリを持ちます。すると Model 変更後に、

```text
wrong_answer   8% → 4%
hallucination  2% → 1%
format_error   1% → 6%
```

のように、**何が改善して何が悪化したか**が分かります。

## Production Data を Evaluation に戻す

最初に作った Dataset だけを永遠に使うわけではありません。むしろ重要なのは、本番で起きた失敗を戻すことです。

```text
Production
  ↓
Failure
  ↓
Evaluation Dataset
  ↓
Prompt / Model 改善
  ↓
Regression Test
```

というループを作ります。

これは普通のソフトウェア開発と同じです。Bug が見つかったら Regression Test を書く。LLM でも同じで、「変な回答が出た」なら、その入力を Evaluation Dataset に追加します。

これを繰り返すと、**自分のプロダクト専用の Evaluation Dataset** が育っていきます。おそらくここが一番価値のある資産になります。

## Evaluation Dataset はコード以上に重要になるかもしれない

LLM アプリでは、Prompt も Model も Framework も簡単に変更できます。Claude から GPT に変えることもできますし、Prompt も書き換えられます。RAG の実装も変えられます。

しかし、**「このプロダクトでは何を良い回答とするのか」という知識は簡単には作れません。**

たとえば数年間サービスを運用して、5,000 件の Real World Failure Cases が蓄積されたとします。これは非常に強いです。新しい Model が出たら、その 5,000 ケースを一気に評価すればいい。すると GPT・Claude・Gemini・Local LLM のどれが自分のユースケースに最適か比較できます。

つまり Model そのものより、**Evaluation Dataset の方が企業固有の資産になる可能性がある**のです。

## Agent になると Evaluation はさらに重要になる

最近の AI は、Question → Answer だけではなく、

```text
LLM → Tool → API → Database → LLM
```

のような Agent になっています。ここでは最終回答だけを評価しても足りません。たとえば、

- 適切な Tool を選んだか
- 不要な Tool Call をしていないか
- 正しい Argument を渡したか
- 同じ API を何度も呼んでいないか
- 途中で危険な操作をしていないか

も評価する必要があります。

つまり Evaluation 対象が **Output から Trajectory に変わる**。これはかなり大きな変化だと思っています。

## AI Coding も同じ

これは AI Coding にもそのまま当てはまります。

Codex や Claude Code などに「この機能を実装して」と頼む。コードが生成される。そして人間が「たぶん動いてそう」と確認する。これも「なんとなく Evaluation」です。

本来は、

- Unit Test
- Integration Test
- Type Check
- Lint
- AST Rule
- Architecture Test

などを AI に対する Evaluator として使います。つまり、

```text
AI → Code Generation → Evaluator → 修正
```

という Loop にします。

以前書いた AST や Custom Lint の話もここにつながります。AI 時代に AST が面白いのは、**AI が生成したコードを機械的に評価する Harness を作れるから**でもあります。

## LLM 開発とは Prompt Engineering だけではない

LLM プロダクトを作る話になると、どうしても Prompt Engineering、RAG、Agent、Fine-tuning が注目されます。しかし、実際にプロダクトを改善し続けるためには Evaluation が必要になります。

自分の中では、

```text
LLM Application
  = Model
  + Context
  + Tools
  + Constraints
  + Evaluation
```

くらいに考えています。

Evaluation がなければ、「Prompt を変える → 触ってみる → 良さそう → Deploy」という開発から抜け出せません。

## 「良い AI」を定義するのは人間の仕事

LLM Evaluation について調べていくと、最終的にはかなり本質的なところに戻ってきます。

評価システムを作るには、**何を成功とするのか**を決めなければなりません。

- 正確ならいいのか
- 短ければいいのか
- 分かりやすければいいのか
- 慎重であるべきなのか
- 多少間違っても高速な方がいいのか

これは Model には決められません。プロダクトを作る側が決めます。

だから AI 時代になって人間の役割がなくなるというより、むしろ Implementation から **Specification・Constraint・Evaluation へ移っていく**のではないかと思っています。

AI がコードも文章も大量に生成できるなら、人間がやるべきことは、何を作らせるかだけではなく、**何を「良い」と判定するかを設計すること**になります。

LLM Evaluation とは、単なるテスト手法ではありません。AI をプロダクトとして扱うための、かなり中心的な技術だと思っています。

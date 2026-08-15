---
title: 'ターミナルでMarkdownを読むならmdcatとglow'
description: 'Markdownをターミナル上で見やすく表示するmdcatとglowの導入方法、便利な使い方、選び方を紹介します。'
pubDate: 2026-08-15
tags: ['Markdown', 'CLI', 'Terminal']
draft: false
---

READMEや設計メモを確認するたびにブラウザやエディタを開くのは少し面倒。

そんなときに便利なのが、Markdownをターミナル上で整形して表示する`mdcat`と`glow`。どちらも見出し、リスト、リンク、コードブロックなどを読みやすく描画してくれるが、使い勝手は少し違う。

## mdcat

[mdcat](https://github.com/BIRSAx2/mdcat)は、名前の通りMarkdown版の`cat`。ファイルを渡すと、その内容をターミナルへ素早く出力する。

```bash
mdcat README.md
```

コードブロックのシンタックスハイライトやクリック可能なリンクに対応している。iTerm2、kitty、WezTerm、Ghosttyでは画像のインライン表示も可能。数式やMermaidも扱えるため、画像や図を含むドキュメントをターミナル内で確認できる。

長い文書にはページャーを付けられる。

```bash
mdcat --paginate README.md
```

編集中のファイルを自動で再描画する`--watch`も便利。

```bash
mdcat --watch docs/design.md
```

テーマは組み込みのものから選べる。

```bash
mdcat --list-themes
mdcat --theme catppuccin-mocha README.md
```

なお、元の`swsnr/mdcat`は2026年6月にアーカイブされ、現在は[BIRSAx2/mdcat](https://github.com/BIRSAx2/mdcat)でメンテナンスが続いている。

## glow

[glow](https://github.com/charmbracelet/glow)は、Markdownの表示に加えてファイルを探して読むためのTUIを備えている。

```bash
glow
```

引数なしで起動すると、カレントディレクトリ以下、またはGitリポジトリ内のMarkdownファイルを一覧できる。ドキュメントが複数あるプロジェクトを見て回るなら、こちらが使いやすい。

もちろん、`mdcat`と同じようにファイルを直接表示することもできる。

```bash
glow README.md
```

標準入力、URL、GitHubやGitLabのリポジトリにも対応している。

```bash
git show HEAD:README.md | glow -
glow https://example.com/guide.md
glow github.com/charmbracelet/glow
```

表示幅、ページャー、ライト・ダークテーマも指定できる。

```bash
glow -w 100 README.md
glow -p README.md
glow -s dark README.md
```

毎回同じオプションを指定するなら、`glow config`で設定ファイルを編集できる。

## インストール

macOSまたはHomebrewを使えるLinuxなら、両方まとめて導入できる。

```bash
brew install mdcat glow
```

RustやGoの環境がある場合は、それぞれのパッケージツールからもインストールできる。

```bash
cargo install mdcat
go install charm.land/glow/v3@latest
```

そのほかのOS向けパッケージやバイナリは、各プロジェクトの公式リポジトリから入手できる。

## どちらを使うか

単一ファイルを素早く表示したいなら`mdcat`が向いている。`cat`や`bat`に近い感覚で使え、シェルの処理にも組み込みやすい。画像、数式、Mermaidを含む文書を確認したい場合にも強い。

一方、ディレクトリ内のMarkdownを探しながら読みたいなら`glow`が便利。TUIでファイルを選べるので、`docs/`以下を巡回したり、メモをブラウズしたりする用途と相性がよい。URLをそのまま渡せるのも利点。

| 用途 | おすすめ |
| --- | --- |
| READMEをすぐ表示する | `mdcat` |
| 長い文書をページ送りで読む | どちらでも可 |
| 編集中の文書をライブプレビューする | `mdcat` |
| 複数のMarkdownをTUIで探す | `glow` |
| URLやGitHub上のREADMEを読む | `glow` |
| 画像、数式、Mermaidを表示する | `mdcat` |

## まとめ

まず1つ選ぶなら、普段の操作で決めるとよい。

```text
Markdown版catが欲しい   → mdcat
Markdownブラウザが欲しい → glow
```

競合というより役割の異なるツールなので、両方入れて使い分けるのも自然。READMEを一瞬だけ確認するときは`mdcat`、リポジトリ内のドキュメントを腰を据えて読むときは`glow`、という使い分けが分かりやすい。

参考: [mdcat公式リポジトリ](https://github.com/BIRSAx2/mdcat)、[mdcatマニュアル](https://docs.rs/crate/mdcat/latest/source/mdcat.1.adoc)、[glow公式リポジトリ](https://github.com/charmbracelet/glow)

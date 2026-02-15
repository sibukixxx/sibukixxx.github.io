---
title: 'Blacksmith で GitHub Actions を高速化＆コスト削減'
description: 'GitHub Actions を2倍速く、コストを半分にする Blacksmith の導入方法と Sticky Disk 機能を紹介します。'
pubDate: 2026-02-15
tags: ['GitHub Actions', 'CI/CD', 'DevOps']
draft: true
---

## Blacksmith とは

GitHub Actions を使っているなら、[Blacksmith](https://www.blacksmith.sh/) を試してみてください。ランナーを高性能な microVM に差し替えるだけで、実行速度が2倍近くになり、料金は半額になります。1分あたり $0.008 が $0.004 に下がる計算です。毎月3,000分の無料枠もあります。

## なぜ速いのか

[公式ドキュメント](https://docs.blacksmith.sh/blacksmith-runners/overview)を読むと、速さの理由がはっきりします。

まずハードウェアが違います。GitHub が使っている古めのサーバー用 CPU ではなく、シングルスレッド性能の高いゲーミング CPU を積んでいます。おかげでシングルスレッド性能が50%以上向上しています。ランナーの起動も速く、Firecracker microVM を採用していて3秒以内に立ち上がります。

キャッシュの読み書きも4倍速いです。ランナーと同じ場所にキャッシュを置いているため、400MB/s 出ます。GitHub のバックエンドを経由するより圧倒的に速いです。

さらに専用のベアメタルプールを使っているので、他のワークロードとリソースを奪い合うことがありません。

## 導入方法

導入は拍子抜けするほど簡単で、ワークフローの `runs-on` を1行書き換えるだけで終わります。

```yaml
runs-on: blacksmith-4vcpu-ubuntu-2204
```

## Sticky Disk

Sticky Disk という機能も見逃せません。ジョブをまたいでディスクの状態を保持できる仕組みで、GitHub Actions 標準のキャッシュより大きなデータを高速に扱えます。

Docker のレイヤーキャッシュを保存しておけばビルドが2〜40倍速くなりますし、node_modules や Bazel のキャッシュも即座に復元できます。料金は月額 $0.50/GB です。

## まとめ

コードを書くことばかり考えがちですが、ツール選定のリターンも侮れません。1行変えるだけで試せるので、GitHub Actions のコストや速度に不満があるなら触ってみる価値はあります。

参考: [Blacksmith 公式サイト](https://www.blacksmith.sh/)、[Sticky Disks ドキュメント](https://docs.blacksmith.sh/github-actions-runners/sticky-disks)

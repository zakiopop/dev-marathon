## 概要
業務管理アプリケーション(原始的な)
EC2に手動デプロイ~CI/CDパイプライン作成までの流れを構築
バッチ処理

## 使用技術
﻿# わからないこと
公開鍵、秘密鍵をそれぞれ適切なところに配置したが、なぜか認証が通らない

### Docker
- pgadminコンテナ
`pg`
- posegresコンテナ(DB)
`PostgrSQL`
- appコンテナ(バックエンド)
`Node.js`
- webコンテナ(フロントエンド)
`Nginx`, `JavaScript`

### PostgreSQL
３テーブル
`customers`
`cases`
`nagotiations`

### EC2
- 手動デプロイ
EC2にログイン
zipファイルを`scp`コマンドで送信
vimでファイル編集

- staging環境にCI/CD
gitHub Actions用のworkflow作成・実行
`PM2` 起動
`cypress` で自動テスト

- production環境にCD
gitHub Actions用のworkflow作成・実行(本番用)
Actionsの設定

- バッチ処理作成（本番想定）
シェルスクリプト作成
`cron`

### Playwright(ローカル環境にて)
テストケース書き出し

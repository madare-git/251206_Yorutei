# 251206_Yorutei
夜定サービス

# 📘 README: よる定（YORUTEI）— 夜の定食リアルタイムプラットフォーム

## 🌃 1. 概要 (What is YORUTEI?)

「よる定（YORUTEI）」は、「夜にアルコールなしで定食を食べたい利用者」と「アイドルタイムの売上を増やし、食材ロスを減らしたい飲食店」をリアルタイムでマッチングするWeb/モバイルプラットフォームです。

## ✨ 2. 提供価値 (Value Proposition)

### ユーザー（利用者）への価値

- **瞬時な発見**: 「今、夜定食を提供している店」だけが地図上に表示されます。
- **安心価格**: アルコール注文不要、お通しなし（¥1,000〜¥1,500）。
- **高品質**: 店の料理力を活かした「おまかせ定食」が楽しめます。

### 店舗（ベンダー）への価値

- **収益改善**: 夜のアイドルタイムの売上向上。
- **フードロス削減**: 在庫食材をおまかせ定食に転用可能。
- **簡単オペレーション**: ON / OFF ワンタップで提供開始可能。

## 📍 3. アプリケーション機能概要

### A. ユーザー向けMAP機能

| 機能 | 実装状況 |
| :--- | :--- |
| リアルタイムMAP表示 | 実装済み。Google Maps API (Advanced Marker) を利用。 |
| 動的リスト連動 | 実装済み。リストと地図上のピンが連動。 |
| Firebase連携 | 実装済み。Realtime DBから店舗情報を動的に取得。 |
| Geocoding | 住所から緯度経度への変換機能を統合。 |

### B. 店舗向け管理画面機能

| 機能 | 画面 | 実装状況 |
| :--- | :--- | :--- |
| 基本情報登録 | `vendor_setup.html` | 実装済み。Geocoding APIにより緯度経度を自動取得しFirebaseに保存。 |
| リアルタイム管理 | `vendor_live_control.html` | ロジックドラフト済み。ON/OFFと席数管理を想定。 |

## ⚙️ 4. 技術スタック (Tech Stack)

| カテゴリ | 技術名 | 役割 |
| :--- | :--- | :--- |
| フロントエンド | HTML5, CSS3, JavaScript (ES6+) | アプリケーションのUI構築。 |
| 地図 / 位置情報 | Google Maps JS API (V3) | 地図表示、マーカー、非同期制御。 |
| 位置情報変換 | Google Geocoding API | 住所から正確な座標への変換。 |
| バックエンド / DB | Firebase Realtime Database (V12 Modules) | リアルタイムなデータ格納と同期。 |
| 非同期制御 | JavaScript Promises (`async`/`await`) | SDKとデータロードの実行順序を制御。 |

## 🚀 5. 開発環境のセットアップ

### A. Firebaseプロジェクト設定

1.  Firebaseコンソールでプロジェクトを作成し、`firebaseConfig`を取得。
2.  Realtime Databaseを有効化し、**開発用にセキュリティルールを設定**（`.read` と `.write` を `true` に）。

### B. Google Maps Platform設定

1.  Google Cloud Consoleでプロジェクトを作成。
2.  以下のAPIを有効化: **Maps JavaScript API**、**Geocoding API**。
3.  マップ ID (`mapId`) を作成し、コードに埋め込む。

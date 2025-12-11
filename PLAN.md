# React Intl 実装・執筆プラン

## 全体方針

- **目的**: React Intlをreact-confetti-intlアプリに導入し、その過程を記録して日本語の読み物として執筆
- **スタイル**: チュートリアルではなく読み物。実装手順の詳細ではなく、実装内容に触れることで本格的感を出す
- **サンプルコード**: 詳しく知りたい人はGitHubのサンプルを見る前提
- **対象言語**: 10言語（ja-JP, en-US, it-IT, de-DE, zh-CN, ko-KR, es-ES, fr-FR, sv-SE, nl-NL）

---

## 本の全体構成と実践の詳細スケジュール

### ■ はじめに（執筆にあたって）
- なぜこの章を書くか
- Localization Engineerとしての経験
- AIによる翻訳の活用について
- サンプルコードのリポジトリURL

### Section 1: React Intlとは何か
- React向けの翻訳・国際化ライブラリ
- FormatJSプロジェクトについて
- 他のi18nツールとの比較
- **主な良さを簡潔に示す**（読者のモチベーション）

### Section 2: コミュニティと運営体制
- FormatJSはOSS、OpenCollectiveで運営
- 大手企業の使用実績（Netflix, Slack, Wixなど）
- 2015年からの継続開発
- GitHubでの活発な更新

### Section 3: React Intlの成り立ちと進化
- FormatJSの元々の目的とReact Intlの位置づけ
- バージョンの変遷（v1→v5→v6）
- Hooks対応などの主な進化点
- 現在の安定版（v6）と今後の見通し

---

**以下、実装しながら執筆**

### Section 4: 導入と基本設定
#1. react-intlをインストール
  cd /Users/keiko/Code/github/react-confetti-intl
  pnpm install react-intl
  インストール後、react-intlのバージョンがv7系であることを確認する
#2. src/i18n/ディレクトリ構成・翻訳ファイルを作成
  src/i18n/
  ├── index.ts              # エクスポート
  ├── IntlProvider.tsx      # Providerコンポーネン
  ├── types.ts              # 型定義
  └── locales/
      ├── ja-JP.json
      ├── en-US.json
      ├── it-IT.json
      ├── de-DE.json
      ├── zh-CN.json
      ├── ko-KR.json
      ├── es-ES.json
      ├── fr-FR.json
      ├── sv-SE.json
      └── nl-NL.json
#3. IntlProviderをセットアップ
  1. IntlProvider.tsxを作成
  2. main.tsxでProviderをラップ
  3. ロケールをハードコード（例: "ja-JP"）
#4. BasicPageを翻訳
  翻訳キーの命名規則を決める（例: basic.title）
#5. 動作確認
  pnpm dev

執筆内容（上記以外）
- ディレクトリ構成の理由（なぜlocalesを分けるか）
- 翻訳ファイルの構造（IDとメッセージのペア）
- IntlProviderの役割
- 型定義の説明
- コードリンク（src/i18n/）を節の冒頭に配置
※翻訳生成についてはsection00.mdに移動済み

### Section 5: 言語切り替えUI
#1. ロケール状態管理を実装（Context作成）
src/i18n/
├── LocaleContext.tsx     # Context + Provider + useLocale hook
- createContext でロケール状態を管理
- LocaleProviderコンポーネントを作成
- useLocaleカスタムフックをエクスポート
#2. 言語セレクターコンポーネントを作成
src/components/LanguageSelector.tsx
- useLocaleでロケール取得/変更
- ドロップダウンで10言語の選択肢を表示
#3. IntlProviderとロケール状態を連携
- main.tsxでLocaleProviderをIntlProviderの外側に配置
- IntlProvider内でuseLocaleを使用
- localeプロップに状態を渡す
#4. 言語セレクターをヘッダーに配置
 - Layout.tsx（header部分）に<LanguageSelector />を追加
#5. 動作確認（言語切り替えが反映されるか）

注意：
- PlaygroundPageは翻訳しない（Section 9で自動生成IDを使って翻訳する）
- Section 5ではBasic, Countdown, Toast, Seasonalのみ翻訳

執筆内容（上記以外）
- Contextを使う理由（グローバル状態管理）
- useLocaleカスタムフックの役割
- 言語セレクターのUI実装例
- 言語切り替え時の再レンダリングの仕組み
- デフォルトロケールの決定方法（ブラウザ言語検出はSection 8）

### Section 6: 表示機能（変数・リッチテキスト）
#1. 変数を含む翻訳を実装
- 既存ページで変数が必要な箇所を特定
- FormattedMessageで変数を渡す
- 翻訳ファイルに追加
#2. リッチテキストを含む翻訳を実装
フッターにリッチテキストを配置：
- 太字(<b>): 「React Confetti」（アプリ名を強調）
- イタリック(<em>): 「react-confetti」（ライブラリ名を技術用語として）
- リンク1(<a>): react-confetti → https://github.com/alampros/react-confetti
- リンク2(<a>): View Source on GitHub → https://github.com/kkoisland/react-confetti-app
#3. useIntlを使った動的翻訳を実装
- useIntlを使うためにToastPageを動的に書き直す
- ToastPageの"All Completed!"をuseIntl.formatMessage()に変更
- 翻訳ファイルに追加
#4. 動作確認

執筆:
FormattedMessage（変数、リッチテキスト）
useIntl Hook の基本
formatMessage() の使い方
実装場所：ToastPageの"All Completed!"

### Section 7: 表示機能（日付・通貨・数値・相対時間、桁区切り・単位など）
#1. サンプル用コンポーネント IntlShowcase.tsx を作成
#2. 表示用の固定データ（日付・金額・数値・基準日時）を定義
静的フォーマット）
日付時刻）<FormattedDate />
数値）<FormattedNumber />
相対時間）<FormattedRelativeTime />

動的フォーマット（useIntl()）
useIntl() を呼び出して intl を取得（React Intl）
日付時刻）
formatDate / formatTime で日付と時刻を表示
intl.formatDate(date, { dateStyle: "medium" }) で日付表示
intl.formatTime(date, { timeStyle: "short" }) で時刻表示
通貨）
formatNumber + style: "currency" で通貨表示
intl.formatNumber(amount, { style: "currency", currency: "JPY" })
別通貨（USD など）でも同様に表示して比較
数値）
formatNumber で桁区切り付き数値を表示
intl.formatNumber(value) で桁区切り表示
formatNumber + style: "unit" で単位付き数値を表示
intl.formatNumber(value, { style: "percent" }) で割合表示
intl.formatNumber(value, { style: "unit", unit: "kilometer" }) で単位付き表示
相対時間）
基準日時（now）と比較用日時を用意
現在時刻との差分を計算して相対時間の元データを作成
intl.formatRelativeTime(diff, "minute") などで相対時間表示「◯分前・◯日後」
過去・未来の両パターンを表示して確認

#3. 各表示を一覧レイアウトで並べる
#4. App.tsx にルーティングして、サンプルコンポーネントを読み込む
#5. 言語切り替えで表示が連動して変わるか確認

執筆
動的（useIntl）：業務ロジックと密接 → 実務で最頻出
静的（Formatted系）：UI確認・単純表示 → デザイン確認向き

### Section 8: 言語設定の保存と管理
#1. LocaleContext.tsxの初期state設定を修正
- localStorage読み込み
- ブラウザ言語検出
- 優先順位実装（localStorage → ブラウザ言語 → デフォルト）
#2. 言語切り替え時にlocalStorageに保存
#3. 動作確認（リロード後も言語が保持されるか）

執筆
実装した方法：
- localStorageで永続化する（リロード後も保持される）ー実務でいちばん多い
- ブラウザの言語設定を初期値に使う（localStorageがない場合のフォールバック）
他の選択肢：
- URLパラメータで保持・共有する（リロード後も保持される／Storage不要）
- Cookie で保持する（SSR時に初期HTMLに反映したい場合）
- DB保存＋API（ログインユーザーで端末またぎ共有）
- 状況に応じて方法を組み合わせる

### Section 9: 大規模開発の視点
PlaygroundPageをID自動生成に移行
#1. @formatjs/cliをインストール
#2. PlaygroundPageの文字列にdefaultMessageを追加
#3. extractスクリプトを追加
"extract": "formatjs extract \"src/pages/PlaygroundPage.tsx\" --out-file src/i18n/locales/en-US.json --format simple
--id-interpolation-pattern '[sha512:contenthash:base64:6]'"
#4. 実行して自動IDを生成
#5. 他の7言語に翻訳を追加
#6 動作確認 

執筆内容
実装したこと：
- ID自動生成の仕組みと利点
ベストプラクティス（実装なし）：
- 文字列を小さく切り分けない理由
    悪い例：「こんにちは」+ name + 「さん」
    良い例：「{name}さん、こんにちは」
- descriptionフィールドの使い方（同じ文字列でも別訳）
- 翻訳しにくい分断の例
    長い文（XXXX. Therefore, YYYY.）
- その他の大規模開発での注意点

---

### ■ おわりに
- 実装を通じて感じたこと
- React Intlを使ってみた感想
- 総括

---

## 執筆・実装スケジュール

### フェーズ1: 執筆のみ（実装なし）
**目標**: React Intlの背景・理論を理解し、読者のモチベーションを高める

1. **Section 1-3を執筆**
   - React Intlの公式ドキュメント・GitHubを調査
   - コミュニティ情報、歴史、バージョン変遷を調べる
   - 書きながら「Section 4以降でどんな機能を見せるか」のアイデアを固める

### フェーズ2: 実装しながら執筆
**目標**: 実際に動くアプリを作りながら、各機能を説明

2. Section 4以降を順次実装・執筆（詳細は後で決定）

---

## React Intlの良さと注意点の扱い方

### 良さ（Section 1で簡潔に示す + 各所に分散）
- JSXで自然に使える
- ICU Message Format準拠（業界標準）
- FormatJSエコシステム（日付・数値・通貨が統一的に扱える）
- 大手企業の実績（Netflix, Slack, Wixなど）
- TypeScript対応
- 複数形・性別対応

### 注意点（該当セクションで実践的に説明）
- バンドルサイズ（小規模アプリには少し重い）
- ビルド時最適化の必要性
- ICU Message Formatの学習コスト
- 翻訳ファイルの管理（言語が増えると大変）
- 文字列の分断に注意（翻訳しにくくなる）
- Context情報（descriptionフィールド）の重要性

→ 各注意点を該当するセクションで具体的な例とともに説明する

---

## 翻訳作業

### 方針
- **Claude（私）が全言語の翻訳を生成**
- **Keikoが日本語をレビュー・修正**
- **他言語の品質確保**:
  - 基本的なUI文字列なので大きな問題は出にくい
  - 気になる場合は別のAIでクロスチェック
  - 逆翻訳で意味を確認

### 日本語のスタイル（確認事項）
- です・ます調 vs カジュアル調？
- ボタンラベル: 動詞形「開始する」vs 名詞形「開始」？

---

## 技術的な基本方針

### 対応言語
10言語（ja-JP, en-US, it-IT, de-DE, zh-CN, ko-KR, es-ES, fr-FR, sv-SE, nl-NL）

### 言語設定の保存
localStorage + ブラウザ言語検出の組み合わせ

### フォルダ構造（予定）
```
src/
├── i18n/
│   ├── index.ts
│   ├── IntlProvider.tsx
│   ├── LocaleContext.tsx
│   ├── types.ts
│   └── locales/
│       ├── ja-JP.json
│       ├── en-US.json
│       ├── it-IT.json
│       ├── de-DE.json
│       ├── zh-CN.json
│       ├── ko-KR.json
│       ├── es-ES.json
│       ├── fr-FR.json
│       ├── sv-SE.json
│       └── nl-NL.json
```

---

## 執筆スタイル（chapter_kkoisland_2を参考）

### 文体
- です・ます調の丁寧な語り口
- 実装の理由も説明（「なぜこうするか」）
- コードブロックは短く、重要部分を抜粋
- Note: で補足情報

### 構成
- 見出しは「## 2.1」のような番号付き
- セクション番号は「第1節」「第2節」の書き方
- section00.md = 「はじめに」+ 「第1節: React Intlとは何か」
- section02.md以降 = 「第2節」「第3節」...

### デモ・コードリンク（実装フェーズ計画時に決定）
- 各セクション冒頭にデモとコードへのリンクを入れるか検討
- 例（chapter_kkoisland_2の形式）:
  ```
  デモ: https://kkoisland.github.io/react-confetti-app/basic
  コード: https://github.com/kkoisland/react-confetti-app/blob/main/src/pages/BasicPage.tsx
  ```
- React Intl版では `react-confetti-intl` リポジトリへのリンクになる予定

---

## 進捗状況（2025年12月11日）

### 完了
- ✅ React Intl公式ドキュメント確認
- ✅ section00.md執筆完了（はじめに + 第1節）
- ✅ section02.md執筆完了（第2節: コミュニティと運営体制）
- ✅ section03.md執筆完了（第3節: 成り立ちと進化）
- ✅ section00.mdの太字削除完了
- ✅ section02.mdの太字削除完了
- ✅ section03.mdの太字削除完了
- ✅ section00.md, section02.md, section03.mdの内容レビュー・修正完了
- ✅ 事実確認完了（統計データ、年代、企業リスト、Hooks、モノレポ構成など）
- ✅ React Intlの良さ6項目が3節までに含まれていることを確認
  - JSXで自然に使える
  - ICU Message Format準拠
  - FormatJSエコシステム
  - 大手企業の実績
  - TypeScript対応
  - 複数形・性別対応
- ✅ Section 4-9の実装・執筆計画完了
- ✅ 対応言語を10言語に拡大（スウェーデン語、オランダ語を追加）
- ✅ react-intlインストール完了
- ✅ Section 4実装完了
  - src/i18n/ディレクトリ構成作成完了
  - IntlProvider実装完了
  - main.tsxでラップ完了
  - BasicPage翻訳完了（10言語）
  - 動作確認完了
- ✅ Section 4執筆完了（section04.md）

### 次のステップ

1. **Section 5実装・執筆**
   - 言語切り替えUI実装
   - section05.md作成

---

## 作業ディレクトリとファイル

### 実装ディレクトリ
- `/Users/keiko/Code/github/react-confetti-intl/` - React Intl導入するアプリ
- アクセス権: 読み書き可能

### 執筆ディレクトリ
- `/Users/keiko/Code/github/react-tokyo-book/src/chapter_kkoisland/` - 本の執筆場所
  - `section00.md` - はじめに + 第1節（完了、翻訳生成についてを追加）
  - `section01.md` - 元の構成案（保存）
  - `section02.md` - 第2節（完了、レビュー・修正済み）
  - `section03.md` - 第3節（完了、レビュー・修正済み）
  - `section04.md` - 第4節（完了）
  - `section05.md以降` - 未作成
- アクセス権: 読み書き可能

### 参考ディレクトリ
- `/Users/keiko/Code/github/react-tokyo-book/src/chapter_kkoisland_2/` - 執筆スタイルの参考
- アクセス権: 読み取り可能

## 参考資料

- 詳細な実装プラン（初期案）: `REACT_INTL_IMPLEMENTATION_PLAN.md`
- 本の初期構成案: `/Users/keiko/Code/github/react-tokyo-book/src/chapter_kkoisland/section01.md`
- 執筆スタイル参考: `/Users/keiko/Code/github/react-tokyo-book/src/chapter_kkoisland_2/`

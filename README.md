[https://jhonmaker-gonsu.github.io/Wizz_Air_Search/](https://jhonmaker-gonsu.github.io/Wizz_Air_Search/)

## V2（2026-10-06）

Wizz Air 公式の `aycf-availability.pdf`（All You Can Fly の空席データ）から、路線データを毎日自動で更新しています。見出しの日付は取り込んだ PDF の最終更新日です。空席状況は日々変動するため、最新情報は [公式PDF](https://multipass.wizzair.com/aycf-availability.pdf) を確認してください。

- 路線データ（`data.js`）は GitHub Actions が毎日 PDF から作り直します。路線数が極端に減るなど不自然な PDF は安全ガードが公開を止め、サイトは直前のデータのままになります
- PDF に未登録の空港が現れたときは自動登録を試み、登録できない空港は、その路線だけを除いて警告します
- PDF上で空港が特定されない London は、既存の路線データを使って LTN/LGW を維持しています

## 新機能 (New Features)
- **Lounge Integration (ラウンジ連携)**: Priority PassのラウンジURLを表示します。一部のプレミアムラウンジ（アブダビ、ロンドン・ガトウィック、ローマ空港など）には王冠アイコン（👑）が表示されます。追加のプレミアムラウンジは `data.js` 内の `premiumLounges` 配列にURLを追記することで設定可能です。

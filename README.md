[https://github.com/jhonmaker-gonsu/Wizz_Air_Search](https://jhonmaker-gonsu.github.io/Wizz_Air_Search/)

## V2（2026-08-06）

`aycf-availability.pdf` の公式スナップショット（2026年8月6日 07:00 CET、対象期間: 8月6日〜9日）を反映しました。All You Can Fly の空席状況は日々変動します。最新情報は [公式PDF](https://multipass.wizzair.com/aycf-availability.pdf) を確認してください。

- 758 routes / 151 airports
- Zadar Airport（ZAD）を追加
- PDF上で空港が特定されない London は、既存の路線データを使って LTN/LGW を維持しています

## 新機能 (New Features)
- **Lounge Integration (ラウンジ連携)**: Priority PassのラウンジURLを表示します。一部のプレミアムラウンジ（アブダビ、フランクフルト、ロンドン・ガトウィック、ローマ空港など）には王冠アイコン（👑）が表示されます。追加のプレミアムラウンジは `data.js` 内の `premiumLounges` 配列にURLを追記することで設定可能です。

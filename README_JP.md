# BLITZ スピード倍率強化 ＆ 銃弾視認化（A・B 両対応）ZIPパッケージ

## 解決策の概要
- **A: BLITZ スピード倍率強化**:
  `BLITZ_SPEED_MULT = 1.45`、`BLITZ_SLIDE_BOOST_ADD = 6.0`、`BLITZ_OVERDRIVE_MULT = 1.75` を適用し、通常移動・スライディング・オーバードライブ発動時のスピードを引き上げています。
- **B: 銃の弾を見えるようにする**:
  発射位置から着弾地点へ向かって飛翔する光る3D弾丸（先端＋弾芯）と残像となる弾道トレイルを生成し、自分およびBOTの銃弾を視認できるようにしています。

## 実装手順
1. この ZIP ファイルを解凍し、`index.html`、`style.css`、`game.js` を確認します。
2. 元のプロジェクトフォルダにある `index.html`、`style.css`、`game.js` をバックアップしたうえで、解凍したファイルで上書きコピーします。
3. VS Code の Live Server などのローカルサーバー経由で `index.html` を開き、BLITZ を選んで「対戦スタート」を押してください。
4. ブラウザキャッシュが残っている場合はスーパーリロード（`Ctrl + F5` / `Cmd + Shift + R`）を行ってください。

## 調整できる主なパラメータ（`game.js` 上部）
- `BLITZ_SPEED_MULT`（初期値 `1.45`）: BLITZ の通常移動速度倍率
- `BLITZ_OVERDRIVE_MULT`（初期値 `1.75`）: オーバードライブ発動時のスピード倍率
- `VISIBLE_BULLET_CONFIG.speed`（初期値 `92.0`）: 3D 弾丸が飛ぶ速さ（m/s）
- `VISIBLE_BULLET_CONFIG.radius`（初期値 `0.095`）: 飛翔する弾丸の太さ
- `VISIBLE_BULLET_CONFIG.trailLife`（初期値 `0.22`）: 弾道トレイルが残る秒数

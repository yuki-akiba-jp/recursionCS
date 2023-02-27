import { Table } from "./models/table.js";
import {GAMETYPE} from "./models/player.js";
import { GAMEPHASE } from "./models/table.js";

let table1 = new Table(GAMETYPE.BLACKJACK);
while (table1.gamePhase != GAMEPHASE.ROUNDOVER) {
  table1.haveTurn();
}

// 初期状態では、ハウスと2人以上のA.Iプレーヤーが戦います。
console.log(table1.resultsLog);


renderTable(table): 
// 画面をクリアして、新しいビューを画面に追加します。
// このビューは、テーブルに渡されたものを視覚的にレンダリングします。

if table.getTurnPlayer().type == 'user'
    // もしgamePhaseが"bets"なら、ベットビューを追加します。
    // gamePhaseが"acting"で、ユーザーがアクションを取ることができる場合は、アクションビューを追加します。
    // これらの追加のビューにはイベントリスナーが接続されており、コントローラとして動作します。これらのコントローラはuserDataをビュー（'<input type = "text">'など）から手に入れてhaveTurnに渡し、その後 renderTable(table) を呼び出して更新された状態を表示します。
    // 追加のロジック

else
    // プレイヤーが考えているかのように錯覚させるためにx秒待ちます。
    table.haveTurn()
    renderTable(table)

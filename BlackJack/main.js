import { Table } from "./models/table.js";
import { Player } from "./models/player.js";
import { View } from "./view.js";
import { Deck } from "./models/deck.js";
import { GAMETYPE, PLAYERTYPE } from "./config.js";
let table = new Table(GAMETYPE.BLACKJACK);
const deck = new Deck(GAMETYPE.BLACKJACK);
const user = new Player("user", PLAYERTYPE.USER, GAMETYPE.BLACKJACK, 0);
const ai1 = new Player("ai1", PLAYERTYPE.AI, GAMETYPE.BLACKJACK, 0);
const ai2 = new Player("ai2", PLAYERTYPE.AI, GAMETYPE.BLACKJACK, 0);
const house = new Player("house", PLAYERTYPE.HOUSE, GAMETYPE.BLACKJACK, 0);

table.house = house;
house.hand.push(deck.drawOne());
house.hand.push(deck.drawOne());
table.players = [ai1, user, ai2];

// View.renderLoginPage();
// View.renderActionBtn(table, player);
// View.renderGameOver();
View.renderTable(table);
// View.renderBetBtn(table);
// View.renderPlayerStatusPage(table);
// View.appendCardToDiv(card, ele, isMask);
// View.renderCards(table, false);
// View.setBtnColor(betDenominations);
// View.updateBetInfo(player);
// View.updatePlayerInfo(table);
// View.renderResult(table);
// View.createNextGameBtnDiv();
// View.renderLogResult(table);
// View.renderAllLog(table);
// View.renderGameOver();

// while (table1.gamePhase != GAMEPHASE.ROUNDOVER) {
//   table1.haveTurn();
// }

// // 初期状態では、ハウスと2人以上のA.Iプレーヤーが戦います。
// console.log(table1.resultsLog);

// renderTable(table):
// // 画面をクリアして、新しいビューを画面に追加します。
// // このビューは、テーブルに渡されたものを視覚的にレンダリングします。

// if table.getTurnPlayer().type == 'user'
//     // もしgamePhaseが"bets"なら、ベットビューを追加します。
//     // gamePhaseが"acting"で、ユーザーがアクションを取ることができる場合は、アクションビューを追加します。
//     // これらの追加のビューにはイベントリスナーが接続されており、コントローラとして動作します。これらのコントローラはuserDataをビュー（'<input type = "text">'など）から手に入れてhaveTurnに渡し、その後 renderTable(table) を呼び出して更新された状態を表示します。
//     // 追加のロジック

// else
//     // プレイヤーが考えているかのように錯覚させるためにx秒待ちます。
//     table.haveTurn()
//     renderTable(table)

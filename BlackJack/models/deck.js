import { Card } from "./card.js";
const SUIT = ["H", "S", "C", "D"];

const GAMETYPE = {
  BlackJack: "BlackJack",
};

const RANK = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export class Deck {
  /*
       String gameType : ゲームタイプの指定。{'blackjack'}から選択。
    */
  constructor(gameType) {
    this.gameType = gameType;
    this.cards = [];
    this.resetDeck();
  }

  /*
       return null : このメソッドは、デッキの状態を更新します。

       カードがランダムな順番になるようにデッキをシャッフルします。
    */
  shuffle() {
    for (let i = this.cards.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (this.cards.length - 1));
      let tempCard = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = tempCard;
    }
  }

  /*
       String gameType : どのゲームにリセットするか
       return null : このメソッドは、デッキの状態を更新します。
    

    */
  resetDeck() {
    this.cards = [];
    if (this.gameType == GAMETYPE.BlackJack) {
      for (let suit of SUIT) {
        for (let rank of RANK) {
          this.cards.push(new Card(suit, rank));
        }
      }
    }
  }

  drawOne() {
    return this.cards.shift();
  }
}

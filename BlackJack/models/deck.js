import { Card } from "./card.js";
import { SUIT, GAMETYPE, RANK, CardImgDirname } from "../config.js";

export class Deck {
  constructor(gameType) {
    this.gameType = gameType;
    this.cards = [];
    this.resetDeck();
  }

  shuffleDeck() {
    for (let i = this.cards.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (this.cards.length - 1));
      let tempCard = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = tempCard;
    }
  }

  resetDeck() {
    this.cards = [];
    if (this.gameType == GAMETYPE.BLACKJACK) {
      for (let suit of SUIT) {
        for (let rank of RANK) {
          const imgUrl = CardImgDirname + rank + "-" + suit + ".png";
          this.cards.push(new Card(suit, rank, imgUrl));
        }
      }
    }
  }

  drawOne() {
    return this.cards.pop();
  }
}

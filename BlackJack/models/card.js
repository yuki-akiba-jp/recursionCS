import { PictureCardsRanks } from "../config.js";
export class Card {
  constructor(suit, rank, imgUrl) {
    this.suit = suit;
    this.rank = rank;
    this.imgUrl = imgUrl;
  }

  getRankNumber() {
    if (this.rank == "A") {
      return 11;
    } else if (this.isPictureCard()) {
      return 10;
    } else {
      return parseInt(this.rank);
    }
  }

  isPictureCard() {
    for (let PictureCardRank of PictureCardsRanks) {
      if (this.rank === PictureCardRank) return true;
    }
    return false;
  }
  isAce() {
    if (this.rank == "A") return true;
    return false;
  }
}

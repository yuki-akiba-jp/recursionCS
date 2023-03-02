import { BLACKJACKNUM, PLAYERACTION } from "../config.mjs";

export class Player {
  //platyler.type means player is user or ai or house
  constructor(name, type, gameType, chips = 400) {
    this.name = name;
    this.type = type;
    this.gameType = gameType;
    this.hand = [];
    this.chips = chips;
    this.bet = 0;
    this.action;
    this.result;
  }

  initForNewGame() {
    this.hand = [];
    this.bet = 0;
    this.action = null;
    this.result = null;
  }

  initForNewTable() {
    this.initForNewGame();
    this.chips = 400;
  }
  updateChips() {}

  getHandScore() {
    let handScore = 0;
    let aceCount = 0;
    for (let card of this.hand) {
      handScore += card.getRankNumber();
      if (card.isAce()) aceCount += 1;
    }
    if (handScore > BLACKJACKNUM) {
      while (aceCount > 0 && handScore <= BLACKJACKNUM) {
        handScore -= 10;
        aceCount--;
      }
    }
    return handScore;
  }

  isGameOver() {
    if (this.getHandScore() > BLACKJACKNUM) return true;
    return false;
  }

  isBlackJack() {
    if (this.getHandScore() == BLACKJACKNUM) return true;
    return false;
  }

  canBet(betDenomination) {
    const betDenominationNum = parseInt(betDenomination);

    if (this.chips >= this.bet + betDenominationNum) return true;
    else return false;
  }
}

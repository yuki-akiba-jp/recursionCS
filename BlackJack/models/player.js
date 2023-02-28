import { PLAYERGAMESTATUS, BlackJackFireNum } from "../config.js";

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
  }
  updateChips() {
    if (this.gameStatus == PLAYERGAMESTATUS.WIN) this.chips += this.bet;
    if (this.gameStatus == PLAYERGAMESTATUS.GAMEOVER) this.chips -= this.bet;
  }

  getHandScore() {
    let handScore = 0;
    let aceCount = 0;
    for (let card of this.hand) {
      handScore += card.getRankNumber();
      if (card.isAce()) aceCount += 1;
    }
    if (handScore > BlackJackFireNum) {
      while (handScore <= BlackJackFireNum || !aceCount) {
        handScore -= 10;
        aceCount--;
      }
    }
    return handScore;
  }

  isGameOver() {
    if (this.getHandScore() > BlackJackFireNum) return true;
    return false;
  }

  isBlackJack() {
    if (this.getHandScore() == BlackJackFireNum) return true;
    return false;
  }
}

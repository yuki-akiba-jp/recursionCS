import {
  PLAYERGAMESTATUS,
  GAMEPHASE,
  PLAYERTYPE,
  PLAYERACTION,
  BlackJackFireNum,
} from "../config.js";
import { GameDecision } from "./gameDecision.js";

export class Player {
  //platyler.type means player is user or ai or house
  constructor(name, type, gameType, chips = 400) {
    this.name = name;
    this.type = type;
    this.gameType = gameType;
    this.hand = [];
    this.chips = chips;
    this.bet = 0;
    this.gameStatus = PLAYERGAMESTATUS.BET;
    this.result;
  }

  initForNewGame() {
    this.hand = [];
    this.bet = 0;
    this.gameStatus = PLAYERGAMESTATUS.BET;
  }
  updateChips() {
    if (this.gameStatus == PLAYERGAMESTATUS.WIN) this.chips += this.bet;
    if (this.gameStatus == PLAYERGAMESTATUS.GAMEOVER) this.chips -= this.bet;
  }

  setGameStatus(gameStatus) {
    this.gameStatus = gameStatus;
  }
  setBet(bet) {
    this.bet = bet;
  }

  promptPlayer(playerActionType) {
    if (this.gameStatus === PLAYERGAMESTATUS.BET) {
      if (this.playerType === PLAYERTYPE.HOUSE)
        return new GameDecision(PLAYERGAMESTATUS.WAIT);
      if (this.playerType === PLAYERTYPE.AI)
        return new GameDecision(
          PLAYERGAMESTATUS.BET,
          Math.floor(this.chips / 5)
        );
      return new GameDecision(PLAYERGAMESTATUS.BET, this.bet);
    }

    if (this.playerType != PLAYERTYPE.USER) {
      if (this.getHandScore() <= 17)
        return new GameDecision(PLAYERGAMESTATUS.HIT, this.bet);
      return new GameDecision(PLAYERGAMESTATUS.STAND, this.bet);
    }
    return new GameDecision(playerActionType, this.bet);
  }
  blackjackGetUserActionGameDecision(table, userData) {
    if (table.playerHandIsBlackjack(this))
      return new GameDecision("blackjack", this.bet);

    let gameDecision = {};
    if (this.gameStatus == "bet" || this.gameStatus == "hit") {
      let choiceKey = ["surrenderFirstTime", "stand", "hit", "doubleFirstTime"];
      gameDecision = new GameDecision(choiceKey[userData], this.bet);
    }
    //if no action is needed. for example when 'broke'
    else gameDecision = new GameDecision(this.gameStatus, this.bet);

    return gameDecision;
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

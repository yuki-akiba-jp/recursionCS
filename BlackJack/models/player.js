import {
  PLAYERGAMESTATUS,
  PLAYERTYPE,
  PLAYERACTION,
  BlackJackFireNum,
} from "../config.js";

export class Player {
  //platyler.type means player is user or ai or house
  constructor(name, type, gameType, chips = 400) {
    this.name = name;
    this.type = type;
    this.gameType = gameType;
    this.hand = [];
    this.chips = chips;
    this.bet = 0;
    this.winAmount = 0;
    this.gameStatus = PLAYERGAMESTATUS.BETTING;
  }

  initForNewGame() {
    this.hand = [];
    this.bet = 0;
    this.winAmount = 0;
    this.gameStatus = PLAYERGAMESTATUS.BETTING;
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

  promptPlayer(playerType) {
    if (playerType == PLAYERTYPE.USER) {
      if (this.gameStatus == PLAYERGAMESTATUS.BETTING) {
        return new GameDecision(PLAYERACTION.BET, this.bet);
      }
      if (this.gameStatus == PLAYERGAMESTATUS.DOUBLEBETTING) {
        return new GameDecision(PLAYERACTION.DOUBLEBET, this.bet);
      }
      return new GameDecision(this.gameStatus, this.bet);
    }

    if (playerType == PLAYERTYPE.AI) {
      this.gameStatus = dicideAiStatus();
      if (this.gameStatus == PLAYERGAMESTATUS.BETTING) {
        if (this.chips == 0) return new GameDecision(PLAYERACTION.BET, 0);
        const betChips = Math.floor(this.chips / 5);
        this.bet = betChips;
        return new GameDecision(PLAYERACTION.BET, this.bet);
      }
      if (this.gameStatus == PLAYERGAMESTATUS.ACTING)
        return new GameDecision(PLAYERACTION.STAND, 0);

      if (this.gameStatus == PLAYERGAMESTATUS.HITTING)
        return new GameDecision(PLAYERACTION.HIT, 0);

      return null;
    }

    if (playerType == PLAYERTYPE.HOUSE) {
      if (this.gameStatus == PLAYERGAMESTATUS.BETTING) {
        this.gameStatus = PLAYERGAMESTATUS.WAITING;
        return new GameDecision(PLAYERACTION.WAIT, 0);
      }

      if (this.gameStatus == PLAYERGAMESTATUS.HITTING) {
        return new GameDecision(PLAYERACTION.HIT, this.bet);
      }
      return null;
    }
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

  hit() {
    this.drawOne();
    if (this.isGameOver()) this.setGameStatus(PLAYERGAMESTATUS.GAMEOVER);
  }
  doubleBet() {
    this.bet *= 2;
  }
  reduceChipsAfterGameOver() {
    this.chips -= this.bet;
  }
}

function dicideAiStatus() {
  const maxIndex = PLAYERGAMESTATUS.length - 1;
  const index = Math.floor(Math.random() * maxIndex);

  //return status exept for WAITING
  return PLAYERGAMESTATUS[index] == PLAYERGAMESTATUS.WAITING
    ? PLAYERGAMESTATUS[index - 1]
    : PLAYERGAMESTATUS[index];
}

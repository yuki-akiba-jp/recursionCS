const GAMESTATUS = {
  BETTING: "BETTING",
  DOUBLEBETTING: "DOUBLEBETTING",
  WAITING: "WAITING",
  ACTING: "ACTING",
  HITTING: "HITTING",
  BLACKJACK: "BLACKJACK",
  GAMEOVER: "GAMEOVER",
};
const USERTYPE = {
  USER: "USER",
  AI: "AI",
  HOUSE: "HOUSE",
};
const GAMEACTION = {
  HIT: "HIT",
  DRAW: "DRAW",
  STAND: "STAND",
  BET: "BET",
  DOUBLEBET: "DOUBLEBET",
  WAIT: "WAIT",
};
const BlackJackFireNum = 21;

class Player {
  //platyler.type means player is user or ai or house
  constructor(name, type, gameType, chips = 400) {
    this.name = name;
    this.type = type;
    this.gameType = gameType;
    this.hand = [];
    this.chips = chips;
    this.bet = 0;
    this.winAmount = 0;
    this.gameStatus = GAMESTATUS.BETTING;
  }

  updateChips() {
    if (this.gameStatus == GAMESTATUS.BETTING) this.chips -= this.bet;
  }

  promptPlayer(userType) {
    if (userType == USERTYPE.USER) {
      if (this.gameStatus == GAMESTATUS.BETTING) {
        updateChips();
        return new GameDecision(GAMEACTION.BET, this.updateChips());
      }
      if (this.gameStatus == GAMESTATUS.DOUBLEBETTING) {
        this.updateChips();
        return new GameDecision(GAMEACTION.DOUBLEBET, this.bet * 2);
      }
      return new GameDecision(this.gameStatus, this.bet);
    }

    if (userType == USERTYPE.AI) {
      this.gameStatus = dicideAiStatus();
      if (this.gameStatus == GAMESTATUS.BETTING) {
        if (this.chips == 0) return new GameDecision(GAMEACTION.BET, 0);
        const betChips = Math.floor(this.chips / 5);
        this.bet = betChips;
        updateChips();
        return new GameDecision(GAMEACTION.BET, this.bet);
      }
      if (this.gameStatus == GAMESTATUS.ACTING)
        return new GameDecision(GAMEACTION.STAND, 0);

      if (this.gameStatus == GAMESTATUS.HITTING)
        return new GameDecision(GAMEACTION.HIT, 0);

      return null;
    }

    if (userType == USERTYPE.HOUSE) {
      if (this.gameStatus == GAMESTATUS.BETTING) {
        this.gameStatus = GAMESTATUS.WAITING;
        return new GameDecision(GAMEACTION.WAIT, 0);
      }

      if (this.gameStatus == GAMESTATUS.HITTING) {
        return new GameDecision(GAMEACTION.HIT, this.bet);
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
    if (handScore > BlackJackFireNum && aceCount) handScore -= 10;
    return handScore;
  }
}

function dicideAiStatus() {
  const maxIndex = GAMESTATUS.length - 1;
  const index = Math.floor(Math.random() * maxIndex);

  //return status exept for WAITING
  return GAMESTATUS[index] == GAMESTATUS.WAITING
    ? GAMESTATUS[index - 1]
    : GAMESTATUS[index];
}

import { GAMESTATUS, PLAYERTYPE } from "./player.js";
export const GAMEPHASE = {
  BETTING: "BETTING",
  ACTING: "ACTING",
  ROUNDOVER: "ROUNDOVER",
  GAMEOVER: "GAMEOVER",
};
export class Table {
  //betDenominations means the amount of chips player can select to bet
  constructor(gameType, betDenominations = [5, 20, 50, 100]) {
    this.gameType = gameType;
    this.betDenominations = betDenominations;
    this.deck = new Deck(this.gameType);
    this.players = [];
    this.house = new Player("house", PLAYERTYPE.HOUSE, this.gameType);
    this.players.push(this.house);

    this.gamePhase = "betting";
    this.resultsLog = [];
    this.turnCounter = 0;
  }
  //table  does Player.promptPlayer() and get GameDecision
  //according to GameDecision, table changes Player's status
  evaluateMove(player) {
    gameDecision = player.promptPlayer();
    player.setGameStatus(gameDecision.action);
    player.setBet(gameDecision.amount);
    if (player.gameStatus == GAMESTATUS.HITTING) player.hit();
    if (player.gameStatus == GAMESTATUS.DOUBLEBETTING) player.doubleBet();
    if (player.gameStatus == GAMESTATUS.GAMEOVER)
      player.reduceChipsAfterGameOver();
  }

  blackjackEvaluateAndGetRoundResults() {
    let log = "";
    for (let player of this.players.length) {
      log += player.name;
      log += player.gameStatus;
    }
    // this.resultsLog.push(log);
    return log;
  }

  blackjackAssignPlayerHands() {
    for (let player of this.players.length) {
      if (player.type == PLAYERTYPE.HOUSE) {
        player.hand.push(this.deck.drawOne());
      } else {
        player.hand.push(this.deck.drawOne());
        player.hand.push(this.deck.drawOne());
      }
    }
  }

  /*
       return null : テーブル内のすべてのプレイヤーの状態を更新し、手札を空の配列に、ベットを0に設定します。
    */
  blackjackinitForNewGame() {
    this.gameType = gameType;
    this.deck = new Deck(this.gameType);
    this.gamePhase = GAMEPHASE.BETTING;
    this.resultsLog = [];
    this.turnCounter = 0;
    for (let player of this.players.length) player.initForNewGame();
  }
  getTurnPlayer() {
    let playerIndex = this.turnCounter % (this.players.length + 1);
    return (turnPlayer = this.players[playerIndex - 1]);
  }

  haveTurn() {
    let turnPlayer = this.getTurnPlayer();
    if (this.gamePhase == GAMEPHASE.BETTING) {
      if (turnPlayer.type == PLAYERTYPE.HOUSE) {
      } else if (
        turnPlayer.type == PLAYERTYPE.USER ||
        turnPlayer.type == PLAYERTYPE.AI
      ) {
        this.evaluateMove(turnPlayer);
      }
      if (this.onLastPlayer()) this.gamePhase = GAMEPHASE.ACTING;

      if (this.gamePhase == GAMEPHASE.ACTING) {
        if (this.allActionsCompleted()) this.gamePhase = ROUNDOVER;
        else this.evaluateMove(turnPlayer);
      }
      if (this.gamePhase == GAMEPHASE.ROUNDOVER) {
        this.gamePhase = "betting";
        this.blackjackinitForNewGame();
      }
      this.turnCounter++;
    }
  }

  onLastPlayer() {
    let playerIndex = this.turnCounter % (this.players.length + 1);
    return playerIndex == this.players.length - 1 ? true : false;
  }

  allPlayerActionsResolved() {
    const resolvedStatusList = [
      GAMESTATUS.STAND,
      GAMESTATUS.GAMEOVER,
      GAMESTATUS.SURRENDER,
    ];
    for (let player of this.players)
      if (resolvedStatusList.includes(player)) return true;
    return false;
  }
}

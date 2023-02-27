import { PLAYERGAMESTATUS } from "../config.js";
import { GAMEPHASE, PLAYERTYPE, BlackJackFireNum } from "../config.js";
import { Deck } from "./deck.js";
import { Player } from "./player.js";

export class Table {
  //betDenominations means the amount of chips player can select to bet
  constructor(username, gameType, betDenominations = [5, 20, 50, 100]) {
    this.gameType = gameType;
    this.betDenominations = betDenominations;
    this.deck = new Deck(this.gameType);
    this.players = [];
    this.house = new Player("house", PLAYERTYPE.HOUSE, this.gameType);
    this.gamePhase = GAMEPHASE.BETTING;
    this.resultsLog = [];
    this.turnCounter = 0;

    this.players.push(this.house);
    this.players.push(new Player(username, PLAYERTYPE.USER));
    this.players.push(new Player("AI1", PLAYERTYPE.AI));
    this.players.push(new Player("AI2", PLAYERTYPE.AI));
  }
  //table  does Player.promptPlayer() and get GameDecision
  //according to GameDecision, table changes Player's gameStatus
  evaluateMove(gameDecision) {
    let turnPlayer = this.getTurnPlayer();

    if (turnPlayer.isBlackJack()) {
      turnPlayer.gameStatus = PLAYERGAMESTATUS.BLACKJACK;
      if (turnPlayer.type == PLAYERTYPE.HOUSE)
        turnPlayer.gameStatus = PLAYERGAMESTATUS.STAND;
    }
    if (gameDecision.action == PLAYERGAMESTATUS.BET) {
      turnPlayer.bet = gameDecision.amount;
      turnPlayer.gameStatus = PLAYERGAMESTATUS.WAIT;
    }
    if (
      gameDecision.action == PLAYERGAMESTATUS.HIT ||
      gameDecision.action == PLAYERGAMESTATUS.DOUBLE
    ) {
      turnPlayer.gameStatus = gameDecision.action;
      turnPlayer.hand.push(this.deck.drawOne());
      if (gameDecision.action === PLAYERGAMESTATUS.DOUBLE) {
        turnPlayer.betAmount *= 2;
      }
      if (turnPlayer.isBlackJack())
        turnPlayer.gameStatus = PLAYERGAMESTATUS.BLACKJACK;

      if (turnPlayer.isGameOver())
        turnPlayer.gameStatus = PLAYERGAMESTATUS.GAMEOVER;

      if (turnPlayer.playerType === PLAYERTYPE.HOUSE)
        turnPlayer.gameStatus = PLAYERGAMESTATUS.STAND;
    }

    if (gameDecision.action === PLAYERGAMESTATUS.SURRENDER)
      turnPlayer.gameStatus = PLAYERGAMESTATUS.SURRENDER;
    if (gameDecision.action === PLAYERGAMESTATUS.STAND)
      turnPlayer.gameStatus = PLAYERGAMESTATUS.STAND;

    if (gameDecision.action === PLAYERGAMESTATUS.WAIT)
      turnPlayer.gameStatus = PLAYERGAMESTATUS.WAIT;
  }

  blackjackEvaluateAndGetRoundResults() {
    for (let player of this.players) {
      if (player.isBlackJack()) {
        player.chips += player.bet * 1.5;
        player.result = PLAYERGAMESTATUS.WIN;
        this.resultLog.push(
          `${player.name} is win +${player.bet} chips. Total chips: ${player.chips}.`
        );
      }
      if (player.playerType === PLAYERTYPE.HOUSE) {
        if (player.isGameOver()) player.gameStatus = PLAYERTYPE.GAMEOVER;
        if (player.isBlackJack()) player.gameStatus = PLAYERTYPE.BLACKJACK;
      }

      if (player.gameStatus === PLAYERGAMESTATUS.SURRENDER) {
        player.chips -= player.bet;
        player.result = PLAYERGAMESTATUS.GAMEOVER;
        this.resultLog.push(
          `${player.name} is surrender. Total chips: ${player.chips}.`
        );
      }
      if (this.house.gameStatus === PLAYERGAMESTATUS.BLACKJACK) {
        if (player.gameStatus === PLAYERGAMESTATUS.BLACKJACK) {
          player.result = PLAYERGAMESTATUS.PUSH;
          this.resultLog.push(`${player.name} is push. ${player.chips}.`);
        }
        player.chips -= player.bet;
        player.result = PLAYERGAMESTATUS.GAMEOVER;
        this.resultLog.push(
          `${player.name} is lose -${player.bet} chips. Total chips: ${player.chips}.`
        );
      }

      if (this.house.gameStatus === PLAYERGAMESTATUS.GAMEOVER) {
        if (player.gameStatus !== PLAYERGAMESTATUS.GAMEOVER) {
          player.chips += player.bet;
          player.result = PLAYERGAMESTATUS.WIN;
          this.resultLog.push(
            `${player.name} is win +${player.bet} chips. Total chips: ${player.chips}.`
          );
        }

        player.result = PLAYERGAMESTATUS.PUSH;
        this.resultLog.push(
          `${player.name} is push. Total chips: ${player.chips}.`
        );
      }

      if (this.house.getHandScore() === player.getHandScore()) {
        player.result = PLAYERGAMESTATUS.PUSH;
        this.resultLog.push(
          `${player.name} is push. Total chips: ${player.chips}.`
        );
      }
      if (
        this.house.getHandScore() > player.getHandScore() ||
        player.gameStatus === PLAYERGAMESTATUS.GAMEOVER
      ) {
        player.chips -= player.betAmount;
        player.result = PLAYERGAMESTATUS.GAMEOVER;
        this.resultLog.push(
          `${player.name} is lose -${player.betAmount} chips. Total chips: ${player.chips}.`
        );
      }
    }
  }

  blackjackAssignPlayerHands() {
    for (let player of this.players) {
      if (player.playerType === PLAYERTYPE.HOUSE) {
        this.house.gameStatus === PLAYERGAMESTATUS.WAIT;
      }
      player.hand.push(this.deck.drawOne());
      player.hand.push(this.deck.drawOne());
    }
  }

  clearPlayerHandsAndBet() {
    this.deck = new Deck(this.gameType);
    this.gamePhase = GAMEPHASE.BETTING;
    this.resultsLog = [];
    this.turnCounter = 0;
    for (let player of this.players.length) player.initForNewGame();
  }

  getTurnPlayer() {
    return this.players[this.turnCounter % this.players.length];
  }

  haveTurn() {
    if (this.players[1].chips === 0) {
      this.gamePhase = GAMEPHASE.GAMEOVER;
      return;
    }

    if (this.allPlayerActionsResolved()) {
      this.gamePhase = GAMEPHASE.ROUNDOVER;
      this.blackjackEvaluateAndGetRoundResults();
      return;
    }

    let turnPlayer = this.getTurnPlayer();
    if (
      turnPlayer.gameStatus != PLAYERGAMESTATUS.BLACKJACK &&
      turnPlayer.gameStatus != PLAYERGAMESTATUS.GAMEOVER
    )
      this.evaluateMove(turnPlayer.promptPlayer(turnPlayer.gameStatus));

    if (this.onLastPlayer() && this.gamePhase === GAMEPHASE.BETTING) {
      this.gamePhase = GAMEPHASE.ACTING;
      this.blackjackAssignPlayerHands();
    }
    this.turnCounter++;
  }

  onLastPlayer() {
    return this.turnCounter % this.players.length == this.players.length - 1;
  }

  allPlayerActionsResolved() {
    const resolvedStatusList = [
      PLAYERGAMESTATUS.STAND,
      PLAYERGAMESTATUS.GAMEOVER,
      PLAYERGAMESTATUS.SURRENDER,
      PLAYERGAMESTATUS.BLACKJACK,
      PLAYERGAMESTATUS.PUSH,
    ];
    for (let player of this.players)
      if (resolvedStatusList.includes(player)) return true;
    return false;
  }

  getUser() {
    return this.players.filter((player) => player.type == PLAYERTYPE.USER)[0];
  }
}

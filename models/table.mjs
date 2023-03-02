import { GAMEPHASE, PLAYERTYPE, PLAYERACTION, GAMERESULT } from "../config.mjs";
import { Deck } from "./deck.mjs";
import { Player } from "./player.mjs";

export class Table {
  //betDenominations means the amount of chips player can select to bet
  constructor(gameType, betDenominations = [5, 20, 50, 100]) {
    this.gameType = gameType;
    this.betDenominations = betDenominations;
    this.deck = new Deck(this.gameType);
    this.players = [];
    this.house = new Player("house", PLAYERTYPE.HOUSE, this.gameType);
    this.gamePhase = GAMEPHASE.BETTING;
    this.gameResult = null;
    this.resultsLog = [];
    this.turnCounter = 0;
    this.players.push(this.house);
    this.isRoundOver = false;
    this.isGameOver = false;
  }

  clearTableForNewGame() {
    this.initDeck();
    this.turnCounter = 0;
    this.gameResult = null;
    this.gamePhase = GAMEPHASE.BETTING;
    this.isRoundOver = false;
    this.isGameOver = false;

    for (let player of this.players) player.initForNewGame();

    this.assignPlayersHand();
  }

  assignPlayersHand() {
    for (let player of this.players) {
      this.hit(player);
      this.hit(player);
    }
  }

  hit(player) {
    player.hand.push(this.deck.drawOne());
    if (player.isGameOver()) {
      player.action = PLAYERACTION.ROUNDOVER;
    }
  }

  stand(player) {
    player.action = PLAYERACTION.ROUNDOVER;
  }

  getHouse() {
    return this.house;
  }

  getTurnPlayer() {
    return this.players[this.turnCounter % this.players.length];
  }

  getUser() {
    for (let player of this.players)
      if (player.type == PLAYERTYPE.USER) return player;
  }

  initDeck() {
    this.deck.resetDeck();
    this.deck.shuffleDeck();
  }

  setIsRoundOver() {
    for (let player of this.players)
      if (player.action != PLAYERACTION.ROUNDOVER) return;

    this.isRoundOver = true;
  }

  evalateGameResult() {
    this.setGameResult();
    for (let player of this.players) {
      if (this.gameResult == GAMERESULT.WIN) {
        if (player.isBlackJack()) player.chips += Math.floor(player.bet * 1.5);
        else player.chips += player.bet;
      }
      if (this.gameResult == GAMERESULT.LOSE) player.chips -= player.bet;
    }
    this.setIsGameOver();
  }

  setIsGameOver() {
    if (this.getUser().chips < 5) this.isGameOver = true;
  }

  setGameResult() {
    const house = this.getHouse();
    const user = this.getUser();

    if (user.getHandScore() > house.getHandScore())
      this.gameResult = GAMERESULT.WIN;
    else if (user.getHandScore() == house.getHandScore())
      this.gameResult = GAMERESULT.PUSH;
    else this.gameResult = GAMERESULT.LOSE;

    if (
      (house.isBlackJack() && user.isBlackJack()) ||
      (house.isGameOver() && user.isGameOver())
    )
      this.gameResult = GAMERESULT.PUSH;

    if (house.isBlackJack()) this.gameResult = GAMERESULT.LOSE;
    if (user.isBlackJack()) this.gameResult = GAMERESULT.WIN;
    if (house.isGameOver()) this.gameResult = GAMERESULT.WIN;
    if (user.isGameOver()) this.gameResult = GAMERESULT.LOSE;
  }

  setPlayersActionRoundOver() {
    for (let player of this.players)
      if (player.isBlackJack() || player.isGameOver())
        player.action = PLAYERACTION.ROUNDOVER;
  }

  isUserBlackJack() {
    if (this.getUser().isBlackJack()) return true;
    return false;
  }

  onLastPlayer(player) {
    if (player == this.players[this.players.length - 1]) return true;
    return false;
  }
}

import { PLAYERGAMESTATUS } from "../config.js";
import { GAMEPHASE, PLAYERTYPE, BlackJackFireNum } from "../config.js";
import { Deck } from "./deck.js";
import { Player } from "./player.js";

export class Table {
  //betDenominations means the amount of chips player can select to bet
  constructor(gameType, betDenominations = [5, 20, 50, 100]) {
    this.gameType = gameType;
    this.betDenominations = betDenominations;
    this.deck = new Deck(this.gameType);
    this.players = [];
    this.house = new Player("house", PLAYERTYPE.HOUSE, this.gameType);
    this.gamePhase = GAMEPHASE.BETTING;
    this.resultsLog = [];
    this.turnCounter = 0;

    const user = new Player("user", PLAYERTYPE.USER, this.gameType);
    this.players.push(this.house);
    this.players.push(user);
  }

  assignPlayersHand() {
    for (let player of this.players) {
      player.hand = [];
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
}

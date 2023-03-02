import { View } from "./view.mjs";
import { PLAYERACTION, PLAYERTYPE, GAMETYPE } from "./config.mjs";

export class Controller {
  static startNewTable(table) {
    for (let player of table.players) player.initForNewTable();
    this.startGame(table);
  }
  static startGame(table) {
    table.clearTableForNewGame();
    View.renderInitView(table);
  }

  static processAfterRoundOver(table) {
    table.evalateGameResult();
    table.resultsLog.push(table.gameResult);
    View.showHouseScore(table);
    View.renderResultView(table);
  }

  static onHitBtn(table) {
    table.getUser().action = PLAYERACTION.HIT;
    this.turnControl(table);
  }

  static onStandBtn(table) {
    table.getUser().action = PLAYERACTION.STAND;
    this.turnControl(table);
  }

  static onBetBtn(table, betDenomination) {
    let user = table.getUser();
    if (user.canBet(betDenomination)) user.bet += betDenomination;
    View.renderInitView(table);
  }

  static turnControl(table) {
    for (let player of table.players) this.havePlayerTurn(table);
    this.processAfterRound(table);

    if (table.isRoundOver || table.getHouse().isGameOver())
      this.processAfterRoundOver(table);

    if (
      table.getUser().action == PLAYERACTION.ROUNDOVER &&
      !table.isRoundOver &&
      !table.getHouse().isGameOver()
    )
      this.turnControl(table);
  }

  static processAfterRound(table) {
    table.setPlayersActionRoundOver();
    table.setIsRoundOver();
    View.updateTableView(table);
  }

  static havePlayerTurn(table) {
    let turnPlayer = table.getTurnPlayer();
    table.turnCounter++;

    if (turnPlayer.type != PLAYERTYPE.USER)
      turnPlayer.action = this.dicideAction(turnPlayer);
    if (turnPlayer.action == PLAYERACTION.HIT) table.hit(turnPlayer);
    if (turnPlayer.action == PLAYERACTION.STAND) table.stand(turnPlayer);
  }

  static dicideAction(house) {
    if (house.action == PLAYERACTION.ROUNDOVER) return house.action;
    if (house.getHandScore() >= 17) return PLAYERACTION.STAND;
    return PLAYERACTION.HIT;
  }
}

import { GAMETYPE, PLAYERTYPE } from "./config.js";
import { View } from "./view.js";
import { Table } from "./models/table.js";

window.onload = function () {
  startGame();
};

function startGame() {
  let table = new Table(GAMETYPE.BLACKJACK);
  table.initDeck();
  table.assignPlayersHand();
  View.renderInitView();
  View.appendCards(table);

  document
    .getElementById("hitBtn")
    .addEventListener("click", table.hit(table.getUser()));
  document
    .getElementById("standBtn")
    .addEventListener("click", table.stand(table.getUser()));
}

import { Controller } from "./controller.mjs";
import { View } from "./view.mjs";
import { GAMEPHASE, DIVS } from "./config.mjs";
export class AddEventListener {
  static addActionButtonsEventListener(table) {
    document
      .getElementById("hitBtn")
      .addEventListener("click", () => Controller.onHitBtn(table));
    document
      .getElementById("standBtn")
      .addEventListener("click", () => Controller.onStandBtn(table));
  }

  static addBetButtonsEventListener(table) {
    for (let betDenomination of table.betDenominations) {
      document
        .getElementById(`${betDenomination}`)
        .addEventListener("click", () => {
          Controller.onBetBtn(table, betDenomination);
        });
    }
  }

  static addOnActingBtnEventListener(table) {
    document.getElementById("onActingBtn").addEventListener("click", () => {
      DIVS.buttonsDiv.innerHTML = "";
      DIVS.onActingBtnDiv.innerHTML = "";
      table.gamePhase = GAMEPHASE.ACTING;
      View.updateTableView(table);
    });
  }
}

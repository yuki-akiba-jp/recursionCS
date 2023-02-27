import { PLAYERACTION, PLAYERTYPE } from "./config.js";
import { Controller } from "./controller.js";
import { DIVS } from "./config.js";

export class ActionView {
  static renderActionBtn() {
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    actionsAndBetsDiv.innerHTML = `
        <div id ="actionsDiv" class="d-flex flex-wrap w-70 p-3 justify-content-center"></div>
        `;
    PLAYERACTION.forEach((action) => {
      const actionBtn = this.createActionBtn(action);
      actionsAndBetsDiv.append(actionBtn);
    });
  }
  static createActionBtn(action) {
    let actionBtn = document.createElement("div");
    actionBtn.classList.add("py-2 mx-2");
    actionBtn.innerHTML = `
        <button class="text-dark btn btn-light px-5 py-1" id="${action}">${action}</button>
      `;

    actionBtn.addEventListener("click", () => {
      table.haveTurn;
      Controller.controlTable(table, action);
    });
  }
}

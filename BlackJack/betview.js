import { PLAYERACTION, PLAYERTYPE } from "./config.js";
import { Controller } from "./controller.js";
import { DIVS } from "./config.js";

export class BetView {
  static renderBetBtn(table) {
    let betsDiv = document.getElementById("betsDiv");

    let betBtnDiv = document.createElement("div");
    let colorHash = this.getColorHash(table.betDenominations);
    betBtnDiv.classList.add(
      "py-2",
      "h-60",
      "d-flex",
      "justify-content-between"
    );
    for (let betDenomination of table.betDenominations) {
      betBtnDiv.innerHTML += `
    <div>
      <div class="input-group">
        <span class="input-group-btn">
          <button
            type="button"
            class="btn ${colorHash[betDenomination]} rounded-circle p-0 btn-lg"
            style="width: 3rem; height: 3rem betValue"
            value="${betDenomination}"
          >
            ${betDenomination}
          </button>
        </span>
      </div>
    </div>
            `;
    }

    betsDiv.append(betBtnDiv);

    let betValueBtns = betsDiv.querySelectorAll(".betValue");

    for (let betValueBtn of betValueBtns) {
      betValueBtn.addEventListener("click", () => {
        Controller.onClickBetValueBtn(table, betValueBtn.value);
      });
    }
  }
  static getColorHash(betDenominations) {
    //->Array
    let hash = {};
    let color = ["btn-danger", "btn-primary", "btn-success", "btn-dark"];
    for (let i = 0; i < betDenominations.length; i++) {
      let currentColor = color[i];
      if (i >= currentColor.length) currentColor = color[i - 4];
      if (hash[betDenominations[i]] == undefined)
        hash[betDenominations[i]] = currentColor;
    }
    return hash;
  }

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

    actionBtn.addEventListener("click", function () {
      table.haveTurn(action);
      Controller.controlTable(table, action);
    });
  }
}

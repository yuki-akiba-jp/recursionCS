import {
  PLAYERTYPE,
  HIDDENCARDURL,
  DIVS,
  GAMEPHASE,
  GAMERESULT,
} from "./config.mjs";
import { AddEventListener } from "./addeventlister.mjs";
import { Card } from "./models/card.mjs";
import { Controller } from "./controller.mjs";
export class View {
  static renderInitView(table) {
    DIVS.playersDiv.innerHTML = "";
    DIVS.houseScore.innerHTML = "?";

    for (let player of table.players) {
      if (player.type == PLAYERTYPE.HOUSE) continue;

      DIVS.playersDiv.innerHTML += `
      <div id="${player.name}">
        <h2>${player.name}: <span id="${this.getPlayerScoreDivName(player)}">${
        table.gamePhase == GAMEPHASE.BETTING ? "?" : player.getHandScore()
      }</span></h2>
        <h5>chips: ${player.chips}</h5>
        <h5>bet: ${player.bet}</h5>
        <div id="${this.getPlayerCardsDivName(player)}" class="cards"></div>
      </div>
    `;
    }

    this.renderCards(table);
    this.renderButtons(table);

    if (table.isUserBlackJack() && table.gamePhase != GAMEPHASE.BETTING)
      Controller.processAfterRoundOver(table);
  }

  static createCardImg(card) {
    let cardImg = document.createElement("img");
    cardImg.src = card.imgUrl;
    return cardImg;
  }

  static clearCards(table) {
    document.getElementById("houseCards").innerHTML = "";
    for (let player of table.players)
      document.getElementById(this.getPlayerCardsDivName(player)).innerHTML =
        "";
  }
  static updateTableView(table) {
    this.renderScoreDivs(table);
    this.renderCards(table);
    this.renderButtons(table);
  }

  static renderScoreDivs(table) {
    for (let player of table.players) {
      if (player == table.getHouse() && !table.isRoundOver) continue;
      document.getElementById(this.getPlayerScoreDivName(player)).innerHTML =
        player.getHandScore();
    }
  }

  static renderButtons(table) {
    if (table.gamePhase == GAMEPHASE.BETTING) {
      this.renderBetButtons(table);
      this.renderOnActingBtn(table);
    }
    if (table.gamePhase == GAMEPHASE.ACTING) this.renderActionButtons(table);
  }

  static renderBetButtons(table) {
    DIVS.buttonsDiv.innerHTML = "";
    for (let betDenomination of table.betDenominations) {
      DIVS.buttonsDiv.innerHTML += `
      <button id="${betDenomination}" class="betBtn">${betDenomination}</button>
    `;
    }
    AddEventListener.addBetButtonsEventListener(table);
  }

  static renderOnActingBtn(table) {
    DIVS.onActingBtnDiv.innerHTML = `<button id="onActingBtn">finish bet</button> `;

    AddEventListener.addOnActingBtnEventListener(table);
  }
  static renderActionButtons(table) {
    DIVS.buttonsDiv.innerHTML = `
      <button id="hitBtn">Hit</button>
      <button id="standBtn">stand</button>
    `;
    AddEventListener.addActionButtonsEventListener(table);
  }

  static renderCards(table) {
    this.clearCards(table);

    for (let player of table.players) {
      for (let card of player.hand) {
        let cardImg = this.createCardImg(card);

        if (this.isHiddenCard(table, player, card))
          cardImg = this.createCardImg(new Card(null, null, HIDDENCARDURL));
        document
          .getElementById(this.getPlayerCardsDivName(player))
          .append(cardImg);
      }
    }
  }

  static isHiddenCard(table, player, card) {
    if (table.gamePhase == GAMEPHASE.BETTING) return true;

    if (table.isRoundOver) return false;

    if (player.type == PLAYERTYPE.HOUSE) {
      if (this.isFirstHouseCard(table, card)) return true;
    }

    if (player.type == PLAYERTYPE.AI) {
      return false;
    }
    return false;
  }

  static isFirstHouseCard(table, card) {
    if (card.imgUrl == table.house.hand[0].imgUrl) return true;
    return false;
  }

  static renderResultView(table) {
    if (table.isGameOver) {
      this.renderGameOverView(table);
      return;
    }

    DIVS.resultDiv.innerHTML = `
    <button type="button" class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
      id="resultModalBtn"
      hidden
    >
    </button>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Result</h5>
            <button
              type="button"
              class="btn-close"
              id="closeModalBtn"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h1>YOU ${table.gameResult}</h1>
          </div>
          <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  >
               Close
             </button>
            <button type="button" class="btn btn-primary" id="nextGameBtn">nextGame</button>
          </div>
        </div>
      </div>
    </div>
    `;

    this.renderCards(table);
    let nextGameBtn = document.getElementById("nextGameBtn");
    nextGameBtn.addEventListener("click", () => {
      document.getElementById("closeModalBtn").click();
      Controller.startGame(table);
    });

    let resultModalBtn = document.getElementById("resultModalBtn");
    resultModalBtn.click();
  }
  static getPlayerCardsDivName(player) {
    return player.name + "Cards";
  }
  static getPlayerScoreDivName(player) {
    return player.name + "Score";
  }

  static renderGameOverView(table) {
    DIVS.resultDiv.innerHTML = `
    <button type="button" class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
      id="resultModalBtn"
      hidden
    >
    </button>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Result</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              id="closeModalBtn"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h1>Game Over</h1>
          </div>
            <button type="button" class="btn btn-primary" id="nextGameBtn">nextGame</button>
          </div>
        </div>
      </div>
    </div>
    `;

    let resultModalBtn = document.getElementById("resultModalBtn");
    resultModalBtn.click();

    nextGameBtn.addEventListener("click", () => {
      document.getElementById("closeModalBtn").click();
      Controller.startNewTable(table);
    });
  }

  static showHouseScore(table) {
    DIVS.houseScore.innerHTML = `${table.getHouse().getHandScore()}`;
  }
}

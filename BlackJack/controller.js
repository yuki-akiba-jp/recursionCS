import { View } from "./view.js";
import { GAMETYPE, GAMEPHASE } from "./config.js";
import { Table } from "./models/table.js";

export class Controller {
  constructor() {
    View.createInitialPage();
    this.startBtn();
  }

  startGame(username, gameType) {
    let table = new Table(username, gameType);
    this.renderTable(table);
  }

  startBtn() {
    let gameStartBtn = document.getElementById("gameStartBtn");

    gameStartBtn.addEventListener("click", () => {
      let username = document.getElementById("username");
      let gameName = document.getElementById(GAMETYPE.BLACKJACK);
      this.startGame(username.value, gameName.value);
    });
  }

  renderTable(table) {
    const user = table.getUser();
    if (
      table.gamePhase === GAMEPHASE.GAMEOVER ||
      table.gamePhase === GAMEPHASE.ROUNDOVER
    ) {
      View.displayResult(user);
      View.createNewGameBtn(user.chips);
      View.createGameOverModal();
      let modal = new Modal(document.getElementById("gameovermodal"));
      modal.show();
      if (table.gamePhase === GAMEPHASE.GAMEOVER) {
        this.moveInitialPageBtn();
        return;
      }
      if (table.gamePhase === GAMEPHASE.ROUNDOVER) {
        this.moveNextRoundBtn(table);
        return;
      }
    }

    let page = document.getElementById("root");
    page.innerHTML = "";
    View.createMainPage(table);

    if (table.gamePhase === "acting") {
      View.faceDownCard(table);
    } else if (table.gamePhase === "evaluatingWinners") {
      View.faceUpCard(table);
    }

    //userの時はbet,actionViewを表示して入力を待ってからrender
    if (table.getTurnPlayer().playerType === "user") {
      if (table.gamePhase === "betting") {
        View.createBetPhase(table);
        this.chipBtn(table);
        this.betBtn(table);
        this.resetBetBtn(table);
        return;
      } else if (
        table.gamePhase === "acting" &&
        (table.getTurnPlayer().status === "wait" ||
          table.getTurnPlayer().status === "hit")
      ) {
        if (table.getTurnPlayer().getHandScore() === 21) {
          table.getTurnPlayer().status === "blackjack";
        } else {
          View.createActionPhase(table);
          this.actionBtn(table);
          if (table.turnCounter > 5) {
            View.disabledSecondActionBtn(table);
          }
          return;
        }
      }
    }

    setTimeout(() => {
      table.haveTurn();
      this.renderTable(table);
    }, 1500);
  }

  getBetAmount(table) {
    table.haveTurn(table.getTurnPlayer().betAmount);
    this.renderTable(table);
  }

  betBtn(table) {
    document.getElementById("betbtn").addEventListener("click", () => {
      this.getBetAmount(table);
    });
  }

  chipBtn(table) {
    for (let chip of table.betDenominations) {
      let chipBtn = document.getElementById(`${chip}`);
      chipBtn.addEventListener("click", () => {
        let okbtn = document.getElementById("betbtn");
        okbtn.disabled = false;
        table.getTurnPlayer().betAmount += chip;
        this.disabledBetBtn(table);
      });
    }
  }

  resetBetBtn(table) {
    document.getElementById("resetbetbtn").addEventListener("click", () => {
      table.getTurnPlayer().betAmount = 0;
      document.querySelectorAll("#betamount")[0].innerHTML = `<h4>You Bet ${
        table.getTurnPlayer().betAmount
      }</h4>`;
      let okbtn = document.getElementById("betbtn");
      okbtn.disabled = true;
      let betBtns = document.querySelector("#chips").querySelectorAll("button");
      for (let betBtn of betBtns) {
        betBtn.disabled = false;
      }
    });
  }

  disabledBetBtn(table) {
    let betBtns = document.querySelector("#chips").querySelectorAll("button");
    for (let betBtn of betBtns) {
      let curr = betBtn;
      if (
        table.getTurnPlayer().betAmount + parseInt(curr.value) >
        table.getTurnPlayer().chips
      ) {
        betBtn.disabled = true;
      }
    }
  }

  actionBtn(table) {
    for (let action of table.getTurnPlayer().actions) {
      let actionBtn = document.getElementById(`${action}`);
      actionBtn.addEventListener("click", () => {
        table.haveTurn(action);
        this.renderTable(table);
      });
    }
  }

  moveNextRoundBtn(table) {
    document.getElementById("Next").addEventListener("click", () => {
      table.blackjackClearPlayerHandsAndBets();
      this.renderTable(table);
    });
  }

  moveInitialPageBtn() {
    document.getElementById("New").addEventListener("click", () => {
      document.querySelectorAll("#root")[0].innerHTML = "";
      new Controller();
    });
  }
}

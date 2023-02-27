import { PLAYERTYPE, GAMEPHASE, PLAYERGAMESTATUS } from "./config.js";
import { DIVS } from "./config.js";

export class View {
  static renderBetBtn(table) {
    let betsDiv = document.getElementById("betsDiv");

    let betBtnDiv = document.createElement("div");
    let colorHash = View.setBtnColor(table.betDenominations);
    betBtnDiv.classList.add(
      "py-2",
      "h-60",
      "d-flex",
      "justify-content-between"
    );
    for (let i = 0; i < table.betDenominations.length; i++) {
      let bet = table.betDenominations[i];
      betBtnDiv.innerHTML += `
            <div>
                <div class="input-group" >
                    <span class="input-group-btn">
                        <button type="button" class="btn ${colorHash[bet]} rounded-circle p-0 btn-lg" style="width:3rem;height:3rem;" id="betValue" value=${bet}>${bet}</button>
                    </span>
                </div>
            </div>
            `;
    }

    let dealResetDiv = document.createElement("div");
    dealResetDiv.classList.add("d-flex", "justify-content-between", "m-2");
    dealResetDiv.innerHTML = `            
        <button type="submit" class="w-30 rem5 text-center btn btn-primary" id="deal">DEAL</button>
        <button type="button" class="w-30 rem5 text-center btn btn-primary" id="reset">RESET</button>
        <button type="submit" class="w-30 rem5 text-center btn btn-primary" id="allIn">ALL IN</button>
        `;
    betsDiv.append(betBtnDiv, dealResetDiv);

    let select = betsDiv.querySelectorAll("#betValue");
    let player = table.players.filter((x) => x.type == "user")[0];

    for (let i = 0; i < select.length; i++) {
      select[i].addEventListener("click", function () {
        Controller.clickBetBtn(select[i].value, player);
        View.updateBetInfo(table);
        View.renderBetBtn(table);
      });
    }

    let deal = betsDiv.querySelectorAll("#deal")[0];
    deal.addEventListener("click", function () {
      let minimumBet = table.getMinimumBet();
      if (player.bet < minimumBet) alert("Minimum bet is $" + minimumBet + ".");
      else {
        player.chips += player.bet;
        Controller.controlTable(table);
      }
    });

    let reset = betsDiv.querySelectorAll("#reset")[0];
    reset.addEventListener("click", function () {
      player.resetPlayerBet();
      View.updateBetInfo(table);
      View.renderBetBtn(table);
    });

    let allIn = betsDiv.querySelectorAll("#allIn")[0];
    allIn.addEventListener("click", function () {
      let allBet = player.chips;
      player.playerAllin(allBet);
      View.updateBetInfo(table);
      View.renderBetBtn(table);
    });
  }

  static setBtnColor(betDenominations) {
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

  static updateBetInfo(player) {
    let betBtnDiv = document.getElementById("betsDiv");
    betBtnDiv.innerHTML = "";
    View.renderBetInfo(player);
  }

  static updateActionBetInfo(table, player) {
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    actionsAndBetsDiv.innerHTML = "";
    View.renderActionBtn(table, player);
  }

  static renderActionBtn(table, player) {
    // let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    // actionsAndBetsDiv.innerHTML = `
    this.config.loginPage.innerHTML = `
        <div id ="actionsDiv" class="d-flex flex-wrap w-70 p-3 justify-content-center">
            <div class="py-2 mx-2">
                <a class="text-dark btn btn-light px-5 py-1" id="surrenderBtn">Surrender</a>
            </div>
            <div class="py-2 mx-2">
                <a class="btn btn-success px-5 py-1" id="standBtn">Stand</a>
            </div>
            <div class="py-2 mx-2">
                <a class="btn btn-warning px-5 py-1" id="hitBtn">Hit</a>
            </div>
            <div class="py-2 mx-2">
                <a class="btn btn-danger px-5 py-1" id="doubleBtn">Double</a>
            </div>            
        </div>
        `;

    let actionList = ["surrender", "stand", "hit", "double"];
    actionList.forEach(function (action) {
      let actionBtn = document.getElementById(action + "Btn");
      actionBtn.addEventListener("click", function () {
        table.haveTurn(action);
        Controller.controlTable(table, action);
      });
    });
  }

  //  static updatePlayerInfo(table) {
  //    let houseCardsDiv = document.getElementById("houseCardsDiv");
  //    let playersDiv = document.getElementById("playersDiv");
  //    houseCardsDiv.innerHTML = "";
  //    playersDiv.innerHTML = "";
  //    View.renderHouseComponent(table);
  //    View.renderPlayerStatusPage(table);
  //  }

  //  static renderResult(table) {
  //    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
  //    let userData = table.players.filter((user) => user.type == "user");
  //    let gameResult = userData[0].gameResult.toUpperCase();
  //    let splitResult = userData[0].splitResult;
  //    let insurance = userData[0].insurance;
  //    let div = View.createNextGameBtnDiv();

  //    actionsAndBetsDiv.innerHTML = "";
  //    if (splitResult != 0) {
  //      for (let i = 0; i < splitResult.length; i++) {
  //        let p = document.createElement("p");
  //        p.classList.add("m-0", "text-white", "text-left", "rem3");
  //        p.innerText = `Split ${i + 1}: ${splitResult[i].toUpperCase()}`;
  //        div.append(p);
  //      }
  //      actionsAndBetsDiv.append(div);
  //    } else if (table.userInsurance) {
  //      let insuranceP = document.createElement("p");
  //      let gameResultP = document.createElement("p");
  //      gameResultP.classList.add("m-0", "text-white", "text-left", "rem3");
  //      gameResultP.innerText = `${gameResult}`;

  //      insuranceP.classList.add("rem1", "text-white", "text-left");
  //      if (table.house.isBlackJack())
  //        insuranceP.innerText = `Insurance +${insurance * 2}`;
  //      else insuranceP.innerText = `Insurance -${insurance}`;

  //      div.append(gameResultP, insuranceP);
  //      actionsAndBetsDiv.append(div);
  //    } else {
  //      let p = document.createElement("p");
  //      p.classList.add("m-0", "text-white", "text-center", "rem3");
  //      p.innerText = `${gameResult}`;
  //      div.append(p);
  //      actionsAndBetsDiv.append(div);
  //    }
  //    let nextGameBtn = actionsAndBetsDiv.querySelectorAll("#nextGame")[0];
  //    nextGameBtn.addEventListener("click", function () {
  //      table.haveTurn(table);
  //      table.blackjackAssignPlayerHands();
  //      Controller.controlTable(table);
  //    });
  //  }

  //  static createNextGameBtnDiv() {
  //    let div = document.createElement("div");
  //    let nextGame = document.createElement("a");
  //    div.classList.add(
  //      "d-flex",
  //      "flex-column",
  //      "justify-content-center",
  //      "align-items-center",
  //      "col-5"
  //    );
  //    nextGame.classList.add("text-white", "btn", "btn-primary", "px-5", "py-1");
  //    nextGame.id = "nextGame";
  //    nextGame.innerText = `Next Game`;
  //    div.append(nextGame);
  //    return div;
  //  }

  //  //render log result each round
  //  // static renderLogResult(table) {
  //  //   let resultLogDiv = document.getElementById("resultLogDiv");
  //  //   let div = document.createElement("div");
  //  //   div.classList.add("text-white", "w-50");
  //  //   div.innerHTML += `
  //  //       <p>rounnd ${table.resultsLog.length + 1}</p>
  //  //       `;
  //  //   div.append(table.blackjackEvaluateAndGetRoundResults());
  //  //   resultLogDiv.append(div);
  //  // }

  //  //render all logs when gameover
  //  //static renderAllLog(table) {
  //  //  let resultLogDiv = document.getElementById("resultLogDiv");
  //  //  let div = document.createElement("div");
  //  //  div.classList.add("text-white", "w-50");
  //  //  for (let i = 0; i < table.resultsLog.length; i++) {
  //  //    div.innerHTML += `
  //  //          <p>rounnd ${i + 1}</p>
  //  //          `;
  //  //    div.append(table.resultsLog[i]);
  //  //  }
  //  //  resultLogDiv.append(div);
  //  //}

  //  static renderGameOver() {
  //    DIVS.gameDiv.innerHTML = `
  //        <div class="d-flex flex-column justify-content-center align-items-center col-5">
  //            <p class="m-0 text-white text-center rem3">GAME OVER</p>
  //        </div>
  //        <div class="d-flex justify-content-around m-2 col-2">
  //            <button type="submit" class="text-white btn btn-primary w-30 rem5" id="newGameBtn">New Game</button>
  //        </div>
  //        `;
  //    // let newGameBtn = document.getElementById("newGameBtn")
  //    // newGameBtn.addEventListener("click", function () {
  //    //   View.displayNone(View.config.mainPage);
  //    //   View.displayBlock(View.config.loginPage);
  //    //   Controller.startGame();
  //    // });
  //  }
}

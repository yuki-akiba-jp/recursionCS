export class View {
  static config = {
    gamePage: document.getElementById("gameDiv"),
    loginPage: document.getElementById("loginPage"),
    mainPage: document.getElementById("mainPage"),
    suitImgURL: {
      S: "https://recursionist.io/img/spade.png",
      H: "https://recursionist.io/img/heart.png",
      C: "https://recursionist.io/img/clover.png",
      D: "https://recursionist.io/img/diamond.png",
      "?": "https://recursionist.io/img/questionMark.png",
    },
  };

  static displayNone(ele) {
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
  }

  static displayBlock(ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
  }

  static renderLoginPage() {
    View.config.loginPage.innerHTML = "";
    let container = document.createElement("div");
    container.innerHTML = `
        <p class="text-white">Welcome to Card Game!</p>
        <div class="my-2">
            <input type="text" placeholder="name" value="">
        </div>
        <div class="my-2">
            <select class="w-100">
                <option value="blackjack">Blackjack </option>
                <option value="poker">Poker </option>
            </select>
        </div>
        <div class="my-2">
            <button type="submit" class="btn btn-success" id="startGame">Start Game</button>
        <div>
        `;
    View.config.loginPage.append(container);
  }

  static renderTable(table) {
    View.config.mainPage.innerHTML = "";
    let container = document.createElement("div");
    container.classList.add("col-12", "d-flex", "flex-column");
    container.innerHTML = `
            <div id="houesCardDiv" class="pt-5">
            </div>
    
            <!-- Players Div -->
            <div id="playersDiv" class="d-flex m-3 justify-content-center">
            </div><!-- end players -->  
            <!-- actionsAndBetsDiv -->
            <div id="actionsAndBetsDiv" class="d-flex pb-5 pt-4 d-flex flex-column align-items-center">
                <!-- betsDiv -->
                <div id="betsDiv" class="d-flex flex-column w-50 col-3">
                </div><!-- end betsDiv-->
            </div><!-- end actionsAndBetsDiv-->
            <div id="resultLogDiv" class="d-flex pb-5 pt-4 justify-content-center text-white overflow-auto" style="max-height: 120px;">
            </div>
        `;
    View.config.mainPage.append(container);
    View.renderHouseStatusPage(table);
    View.renderPlayerStatusPage(table);
    let isMask;
    if (table.gamePhase != "betting") isMask = false;
    else isMask = true;
    View.renderCards(table, isMask);
    if (table.getTurnPlayer().getSplitYes)
      View.renderSplitStatus(table, table.getTurnPlayer());
  }

  static renderBetInfo(table) {
    let betsDiv = document.getElementById("betsDiv");
    let player = table.players.filter((x) => x.type == "user")[0];
    betsDiv.innerHTML += `
        <p class="m-0 text-center text-white rem3">Bet: $${player.bet}</p>
        <p class="m-0 text-center text-white rem2">Current Money: $${player.chips}</p>
        `;
  }

  static renderBetBtn(table) {
    let betsDiv = document.getElementById("betsDiv");

    let betBtnDiv = document.createElement("div");
    let colerHash = View.setBtnColor(table.betDenominations);
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
                        <button type="button" class="btn ${colerHash[bet]} rounded-circle p-0 btn-lg" style="width:3rem;height:3rem;" id="betValue" value=${bet}>${bet}</button>
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

  static renderHouseStatusPage(table) {
    let houesCardDiv = document.getElementById("houesCardDiv");
    houesCardDiv.innerHTML = "";
    let houseCardsDiv = table.house.name + "CardsDiv";
    houesCardDiv.innerHTML += `
        <p class="m-0 text-center text-white rem3">${table.house.name}</p>
        <div class="text-white d-flex m-0 p-0 flex-column justify-content-center align-items-center">
            <p class="rem1 text-left">Status:${table.house.gameStatus}&nbsp</a>
        </div>
            <!-- House Card Row -->
        <div id=${houseCardsDiv} class="d-flex justify-content-center pt-3 pb-2">   
        </div>
        `;
  }

  static renderPlayerStatusPage(table) {
    let playersDiv = document.getElementById("playersDiv");
    playersDiv.innerHTML = "";
    let allPlayers = table.players;
    for (let i = 0; i < allPlayers.length; i++) {
      let playerDiv = allPlayers[i].name + "PlayerDiv";
      let cardsDiv = allPlayers[i].name + "CardsDiv";
      playersDiv.innerHTML += `
            <div id=${playerDiv} class="d-flex flex-column w-50">
                <p class="m-0 text-white text-center rem3">${allPlayers[i].name}</p>
    
                <!-- playerInfoDiv -->
                <div class="text-white d-flex m-0 p-0 flex-column justify-content-center align-items-center">
                    <p class="rem1 text-left">Status:${allPlayers[i].gameStatus}&nbsp</a>
                    <p class="rem1 text-left">Bet:${allPlayers[i].bet}&nbsp</a>
                    <p class="rem1 text-left">Chips:${allPlayers[i].chips}&nbsp</a>
                </div>
    
                <!-- cardsDiv -->
                <div id=${cardsDiv} class="d-flex justify-content-center">
                </div><!-- end Cards -->
            </div><!-- end player -->        
            `;
    }
  }

  static renderCardDiv(card, ele, isMask) {
    let target = document.getElementById(ele);
    let suit = isMask ? "?" : card.suit;
    let rank = isMask ? "?" : card.rank;
    target.innerHTML += `
        <div class="bg-white border rounded mx-2">
            <div class="text-center">
                <img src=${View.config.suitImgURL[suit]} alt="" width="50" height="50">
            </div>
            <div class="text-center">
                <p class="m-0 ">${rank}</p>
            </div>
        </div>
        `;
  }

  static renderCards(table, flag) {
    let allPlayers = table.players;
    let houseCardsDiv = table.house.name + "CardsDiv";
    let houseCards = table.house.hand;
    if (table.house.gameStatus == "Waiting for actions") {
      View.renderCardDiv(houseCards[0], houseCardsDiv, false);
      View.renderCardDiv(houseCards[1], houseCardsDiv, true);
    } else {
      houseCards.forEach((card) => {
        View.renderCardDiv(card, houseCardsDiv, flag);
      });
    }
    for (let i = 0; i < allPlayers.length; i++) {
      let cards = allPlayers[i].hand;
      let ele = allPlayers[i].name + "CardsDiv";
      cards.forEach((card) => {
        View.renderCardDiv(card, ele, flag);
      });
    }
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
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    actionsAndBetsDiv.innerHTML = `
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

  static disableBtnAfterFirstAction() {
    let surrenderBtn = document.getElementById("surrenderBtn");
    let doubleBtn = document.getElementById("doubleBtn");
    surrenderBtn.classList.add("disabled");
    doubleBtn.classList.add("disabled");
  }

  static updatePlayerInfo(table) {
    let houesCardDiv = document.getElementById("houesCardDiv");
    let playersDiv = document.getElementById("playersDiv");
    houesCardDiv.innerHTML = "";
    playersDiv.innerHTML = "";
    View.renderHouseStatusPage(table);
    View.renderPlayerStatusPage(table);
  }

  static renderResult(table) {
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    let userData = table.players.filter((user) => user.type == "user");
    let gameResult = userData[0].gameResult.toUpperCase();
    let splitResult = userData[0].splitResult;
    let insurance = userData[0].insurance;
    let div = View.createNextGameBtnDiv();

    actionsAndBetsDiv.innerHTML = "";
    if (splitResult != 0) {
      for (let i = 0; i < splitResult.length; i++) {
        let p = document.createElement("p");
        p.classList.add("m-0", "text-white", "text-left", "rem3");
        p.innerText = `Split ${i + 1}: ${splitResult[i].toUpperCase()}`;
        div.append(p);
      }
      actionsAndBetsDiv.append(div);
    } else if (table.userInsurance) {
      let insuranceP = document.createElement("p");
      let gameResultP = document.createElement("p");
      gameResultP.classList.add("m-0", "text-white", "text-left", "rem3");
      gameResultP.innerText = `${gameResult}`;

      insuranceP.classList.add("rem1", "text-white", "text-left");
      if (table.house.isBlackJack())
        insuranceP.innerText = `Insurance +${insurance * 2}`;
      else insuranceP.innerText = `Insurance -${insurance}`;

      div.append(gameResultP, insuranceP);
      actionsAndBetsDiv.append(div);
    } else {
      let p = document.createElement("p");
      p.classList.add("m-0", "text-white", "text-center", "rem3");
      p.innerText = `${gameResult}`;
      div.append(p);
      actionsAndBetsDiv.append(div);
    }
    let nextGameBtn = actionsAndBetsDiv.querySelectorAll("#nextGame")[0];
    nextGameBtn.addEventListener("click", function () {
      table.haveTurn(table);
      table.blackjackAssignPlayerHands();
      Controller.controlTable(table);
    });
  }

  static createNextGameBtnDiv() {
    let div = document.createElement("div");
    let nextGame = document.createElement("a");
    div.classList.add(
      "d-flex",
      "flex-column",
      "justify-content-center",
      "align-items-center",
      "col-5"
    );
    nextGame.classList.add("text-white", "btn", "btn-primary", "px-5", "py-1");
    nextGame.id = "nextGame";
    nextGame.innerText = `Next Game`;
    div.append(nextGame);
    return div;
  }

  static renderInsurancePage(table) {
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    actionsAndBetsDiv.innerHTML += `
        <div class="d-flex flex-column justify-content-center align-items-center col-3">
            <p class="m-0 text-white text-center rem3">Insurance?</p>
        </div>
        <div class="d-flex justify-content-around m-2 col-2">
            <button type="submit" class="text-white btn btn-primary w-30 rem5" id="insuranceYes">Yes</button>
            <button type="submit" class="text-white btn btn-primary w-30 rem5" id="insuranceNo">No</button>
        </div>
        `;
    let insuranceYesBtn =
      actionsAndBetsDiv.querySelectorAll("#insuranceYes")[0];
    insuranceYesBtn.addEventListener("click", function () {
      Controller.clickInsuranceYes(table);
    });
    let insuranceNoBtn = actionsAndBetsDiv.querySelectorAll("#insuranceNo")[0];
    insuranceNoBtn.addEventListener("click", function () {
      Controller.clickInsuranceNo(table);
    });
  }

  static renderEvenMoneyPage(table) {
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    actionsAndBetsDiv.innerHTML += `
        <div class="d-flex flex-column justify-content-center align-items-center col-5">
            <p class="m-0 text-white text-center rem3">Even Money?</p>
        </div>
        <div class="d-flex justify-content-around m-2 col-2">
            <button type="submit" class="text-white btn btn-primary w-30 rem5" id="insuranceYes">Yes</button>
            <button type="submit" class="text-white btn btn-primary w-30 rem5" id="insuranceNo">No</button>
        </div>
        `;
    let insuranceYesBtn =
      actionsAndBetsDiv.querySelectorAll("#insuranceYes")[0];
    insuranceYesBtn.addEventListener("click", function () {
      Controller.clickInsuranceYes(table);
    });
    let insuranceNoBtn = actionsAndBetsDiv.querySelectorAll("#insuranceNo")[0];
    insuranceNoBtn.addEventListener("click", function () {
      Controller.clickInsuranceNo(table);
    });
  }

  //render log result each round
  static renderLogResult(table) {
    let resultLogDiv = document.getElementById("resultLogDiv");
    let div = document.createElement("div");
    div.classList.add("text-white", "w-50");
    div.innerHTML += `
        <p>rounnd ${table.resultsLog.length + 1}</p>
        `;
    div.append(table.blackjackEvaluateAndGetRoundResults());
    resultLogDiv.append(div);
  }

  //render all logs when gameover
  static renderAllLog(table) {
    let resultLogDiv = document.getElementById("resultLogDiv");
    let div = document.createElement("div");
    div.classList.add("text-white", "w-50");
    for (let i = 0; i < table.resultsLog.length; i++) {
      div.innerHTML += `
            <p>rounnd ${i + 1}</p>
            `;
      div.append(table.resultsLog[i]);
    }
    resultLogDiv.append(div);
  }

  static renderGameOver(table) {
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    actionsAndBetsDiv.innerHTML += `
        <div class="d-flex flex-column justify-content-center align-items-center col-5">
            <p class="m-0 text-white text-center rem3">GAME OVER</p>
        </div>
        <div class="d-flex justify-content-around m-2 col-2">
            <button type="submit" class="text-white btn btn-primary w-30 rem5" id="newGame">New Game</button>
        </div>
        `;
    let newGameBtn = actionsAndBetsDiv.querySelectorAll("#newGame")[0];
    newGameBtn.addEventListener("click", function () {
      View.displayNone(View.config.mainPage);
      View.displayBlock(View.config.loginPage);
      Controller.startGame();
    });
  }

  static renderSplitPage(table) {
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    actionsAndBetsDiv.innerHTML += `
        <div class="d-flex flex-column justify-content-center align-items-center col-5">
            <p class="m-0 text-white text-center rem3">Split Cards?</p>
        </div>
        <div class="d-flex justify-content-around m-2 col-2">
            <button type="submit" class="text-white btn btn-primary w-30 rem5" id="splitYes">Yes</button>
            <button type="submit" class="text-white btn btn-primary w-30 rem5" id="splitNo">No</button>
        </div>
        `;
    let insuranceYesBtn = actionsAndBetsDiv.querySelectorAll("#splitYes")[0];
    insuranceYesBtn.addEventListener("click", function () {
      Controller.clickSplitYes(table);
    });
    let insuranceNoBtn = actionsAndBetsDiv.querySelectorAll("#splitNo")[0];
    insuranceNoBtn.addEventListener("click", function () {
      Controller.clickSplitNo(table);
    });
  }

  static renderSplitStatus(table, player) {
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    let div = document.createElement("div");
    div.classList.add(
      "d-flex",
      "flex-column",
      "justify-content-center",
      "text-white"
    );
    div.innerHTML = `
        <p class="rem1 text-left">Split ${table.splitCounter}&nbsp</a>
        <p class="rem1 text-left">Remaining Split ${player.tempSplitCard.length}&nbsp</a>
        `;
    actionsAndBetsDiv.append(div);
  }
}

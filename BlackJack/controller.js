class Controller {
  static startGame() {
    View.renderLoginPage();
    let startGameBtn = View.config.gamePage.querySelectorAll("#startGame")[0];
    startGameBtn.addEventListener("click", function () {
      let userName = View.config.gamePage.querySelectorAll("input")[0].value;
      let table = new Table(
        View.config.loginPage.querySelectorAll("select")[0].value
      );
      if (userName == "") {
        alert("Please put your name");
      } else {
        Controller.changePageAndSetPlayer(table, userName);
      }
    });
  }

  static changePageAndSetPlayer(table, userName) {
    View.displayNone(View.config.loginPage);
    View.displayBlock(View.config.mainPage);
    table.setPlayerInfo(table, userName);
    //Comment out when testing
    table.blackjackAssignPlayerHands();

    //Test insurance
    //table.testInsuranceAssignPlayerHands();
    //Test even bet
    //table.testEvenMoneyAssignPlayerHands();
    //Test split
    //table.testSplitAssignPlayerHands();

    Controller.controlTable(table);
  }

  /*
        controlTable
        This is a main funcion to control the game. 
        userData will be null or user's action
    */
  static controlTable(table, userData) {
    View.renderTable(table);
    let player = table.getTurnPlayer();
    if (player.type == "user" && table.gamePhase == "betting") {
      table.haveTurn(player.bet);
      View.renderBetInfo(table);
      View.renderBetBtn(table);
    } else if (player.type == "user" && table.gamePhase == "acting") {
      if (player.gameStatus == "bet" || player.gameStatus == "hit") {
        //If a first house card is 'A' and user cards blackjack, render even money page.
        if (table.checkEvenMoney()) {
          View.renderEvenMoneyPage(table);
        }
        //If only a first house card is 'A', render insurance page.
        else if (table.checkInsurance()) {
          View.renderInsurancePage(table);
        }

        //If split card is 'A', skip actions.
        else if (player.splitAce) {
          table.haveTurn("stand");
          table.splitCounter++;
          Controller.controlTable(table);
        }

        //If user hand is blackjack or score is 21, skip actions.
        else if (player.isBlackJack() || player.getHandScore() == 21) {
          table.haveTurn("stand");
          Controller.controlTable(table);
        }
        //If both user cards are the same rank, render split page.
        else if (player.isSplit() && !player.getSplitNo) {
          View.renderSplitPage(table);
        }

        //Split second time
        else if (table.splitCounter > 0) {
          View.updatePlayerInfo(table);
          View.updateActionBetInfo(table, player);
          if (player.gameStatus != "hit") table.splitCounter++;
          View.renderSplitStatus(table, player);
          if (player.gameStatus == "hit") View.disableBtnAfterFirstAction();
          View.renderCards(table, false);
        }

        //Split first time
        else if (!table.playerSplitCompleted() || player.getSplitYes) {
          View.updatePlayerInfo(table);
          View.updateActionBetInfo(table, player);
          table.splitCounter++;
          View.renderSplitStatus(table, player);
          if (player.gameStatus == "hit") View.disableBtnAfterFirstAction();
          View.renderCards(table, false);
        }

        //If a user gameStatus is bet or hit, the user can choose actions. If the status is already "hit", only "stand" or "hit" are selectable.
        else {
          View.updatePlayerInfo(table);
          View.updateActionBetInfo(table, player);
          if (player.gameStatus == "hit") View.disableBtnAfterFirstAction();
          View.renderCards(table, false);
        }
      }
      //If a user gameStatus is "surrender", "bust", "stand" or "double", skip actions.
      else {
        //If current split turn is finshed, move next split cards.
        if (table.checkRemainingSplit()) {
          table.fileHandCards();
          table.pushTempSplitCardToHand();
          Controller.controlTable(table);
        } else {
          table.haveTurn(player.gameStatus);
          Controller.controlTable(table);
        }
      }
    } else if (table.gamePhase == "roundOver") {
      View.renderResult(table);
      View.renderLogResult(table);
    } else if (table.gamePhase == "gameOver") {
      View.renderGameOver(table);
      View.renderAllLog(table);
    }
    //AI and Dealer should be hit here.
    else
      setTimeout(function () {
        table.haveTurn(table);
        Controller.controlTable(table);
      }, 1000);
  }

  //Change a bet value for renderBetInfo
  static clickBetBtn(betCoin, player) {
    if (player.chips >= betCoin) {
      player.bet += parseInt(betCoin);
      player.chips -= betCoin;
    }
  }

  static clickInsuranceYes(table) {
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    table.getTurnPlayer().insurance += Math.floor(
      table.getTurnPlayer().bet / 2
    );
    table.getTurnPlayer().isInsurance = true;
    table.getTurnPlayer().getInsuranceYes = true;
    table.userInsurance = true;
    actionsAndBetsDiv.innerHTML = "";
    Controller.controlTable(table);
  }

  static clickInsuranceNo(table) {
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    table.getTurnPlayer().isInsurance = true;
    actionsAndBetsDiv.innerHTML = "";
    Controller.controlTable(table);
  }

  static clickSplitYes(table) {
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    table.addSplitCard();
    table.getNewCardForSplit();
    table.getTurnPlayer().getSplitYes = true;
    actionsAndBetsDiv.innerHTML = "";
    Controller.controlTable(table);
  }

  static clickSplitNo(table) {
    let actionsAndBetsDiv = document.getElementById("actionsAndBetsDiv");
    table.getTurnPlayer().getSplitNo = true;
    actionsAndBetsDiv.innerHTML = "";
    Controller.controlTable(table);
  }
}

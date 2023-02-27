import { DIVS, SUITIMGURL } from "./config.js";
export class TableView {
  static renderTable(table) {
    let container = document.createElement("div");
    container.classList.add("col-12", "d-flex", "flex-column");
    container.innerHTML = `
            <div id="houseCardsDiv" class="pt-5"></div>
            <div id="playersDiv" class="d-flex m-3 justify-content-center"></div>
            <div id="actionsAndBetsDiv" class="d-flex pb-5 pt-4 d-flex flex-column align-items-center">
              <div id="betsDiv" class="d-flex flex-column w-50 col-3"></div>
            </div>
            <div id="resultLogDiv" class="d-flex pb-5 pt-4 justify-content-center text-white overflow-auto" style="max-height: 120px;">
            </div>
        `;
    DIVS.gameDiv.append(container);
    this.renderHouseComponent(table);
    this.renderPlayerStatusPage(table);
    let isMasked;
    if (table.gamePhase != GAMEPHASE.BETTING) isMasked = false;
    else isMasked = true;
    this.appendCardToDiv(card, targetDiv, isMasked);
  }

  static renderHouseComponent(table) {
    let houseCardsDiv = document.getElementById("houseCardsDiv");
    houseCardsDiv.innerHTML = `
        <p class="m-0 text-center text-white rem3">${table.house.name}</p>
        <div class="text-white d-flex m-0 p-0 flex-column justify-content-center align-items-center">
            <p class="rem1 text-left">Status:${table.house.gameStatus}&nbsp</a>
        </div>
        <div id="houseCardsDiv" class="d-flex justify-content-center pt-3 pb-2">   
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
  static appendCardToDiv(card, targetDiv, isMasked) {
    // let target = document.getElementById(targetDiv);
    let suit = isMasked ? "?" : card.suit;
    let rank = isMasked ? "?" : card.rank;
    targetDiv.innerHTML += `
        <div class="bg-white border rounded mx-2">
            <div class="text-center">
                <img src=${SUITIMGURL[suit]} alt="" width="50" height="50">
            </div>
            <div class="text-center">
                <p class="m-0 ">${rank}</p>
            </div>
        </div>
        `;
  }
  static renderHouseCards(table) {
    const houseCardsDiv = document.getElementById("houseCardsDiv");
    let houseCards = table.house.hand;

    if (table.house.gameStatus == PLAYERGAMESTATUS.WAITING) {
      View.appendCardToDiv(houseCards[0], houseCardsDiv, false);
      View.appendCardToDiv(houseCards[1], houseCardsDiv, true);
    } else {
      houseCards.forEach((card) => {
        View.appendCardToDiv(card, houseCardsDiv, false);
      });
    }
  }

  static renderPlayerCards(player, isMasked) {
    let playerHand = player.hand;
    const targetDivName = player.name + "CardsDiv";
    const targetDiv = document.getElementById("targetDivName");
    playerHand.forEach((card) => {
      View.appendCardToDiv(card, targetDiv, isMasked);
    });
  }

  static renderCards(table, isMasked) {
    this.renderHouseCards();
    for (let player of table.players) {
      this.renderPlayerCards(player, isMasked);
    }
  }
}

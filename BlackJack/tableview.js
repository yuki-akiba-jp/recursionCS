import { DIVS, SUITIMGURL, PLAYERGAMESTATUS } from "./config.js";
import { BetView } from "./betview.js";
export class TableView {
  static renderTable(table) {
    let container = document.createElement("div");
    container.classList.add("col-12", "d-flex", "flex-column");
    container.innerHTML = `
    <div id="houseDiv" class="pt-5"></div>
    <div id="playersDiv" class="d-flex m-3 justify-content-center"></div>
    <div id="actionsAndBetsDiv" class="d-flex pb-5 pt-4 d-flex flex-column align-items-center" >
      <div id="betsDiv" class="d-flex flex-column w-50 col-3"></div>
    </div>
    <div id="resultLogDiv"
      class="d-flex pb-5 pt-4 justify-content-center text-white overflow-auto"
      style="max-height: 120px"
    ></div>
        `;
    DIVS.gameDiv.append(container);

    this.renderHouseDivComponent(table);
    this.renderPlayersDivComponent(table);
    this.renderCardsOnTable(table);
  }

  static renderHouseDivComponent(table) {
    let houseDiv = document.getElementById("houseDiv");
    houseDiv.innerHTML = `
    <p class="m-0 text-center text-white rem3">${table.house.name}</p>
    <div class="text-white d-flex m-0 p-0 flex-column justify-content-center align-items-center">
      <p class="rem1 text-left">Status:${table.house.gameStatus}&nbsp</p>
    </div>
    <div id="houseCardsDiv" class="d-flex justify-content-center pt-3 pb-2" ></div>
        `;
  }

  static renderPlayersDivComponent(table) {
    let playersDiv = document.getElementById("playersDiv");
    for (let player of table.players) {
      const playerDivName = player.name + "PlayerDiv";
      const playerCardsDivName = player.name + "cardsDiv";
      playersDiv.innerHTML += `
            <div id=${playerDivName} class="d-flex flex-column w-50">
              <p class="m-0 text-white text-center rem3">${player.name}</p>
              <div class="text-white d-flex m-0 p-0 flex-column justify-content-center align-items-center">
                <p class="rem1 text-left">Status:${player.gameStatus}&nbsp</a>
                <p class="rem1 text-left">Bet:${player.bet}&nbsp</a>
                <p class="rem1 text-left">Chips:${player.chips}&nbsp</a>
              </div>
              <div id=${playerCardsDivName} class="d-flex justify-content-center">
              </div>
            </div>
            `;
    }
  }

  static appendCardToDiv(card, targetDiv, isMasked) {
    let suit = isMasked ? "?" : card.suit;
    let rank = isMasked ? "?" : card.rank;
    targetDiv.innerHTML += `
    <div class="bg-white border rounded mx-2">
      <div class="text-center">
        <img src="${SUITIMGURL[suit]}" alt="" width="50" height="50" />
      </div>
      <div class="text-center">
        <p class="m-0">${rank}</p>
      </div>
    </div>
        `;
  }
  static renderHouseCards(table) {
    const houseCardsDiv = document.getElementById("houseCardsDiv");
    let houseCards = table.house.hand;

    if (table.house.gameStatus == PLAYERGAMESTATUS.WAITING) {
      this.appendCardToDiv(houseCards[0], houseCardsDiv, false);
      this.appendCardToDiv(houseCards[1], houseCardsDiv, true);
    } else {
      houseCards.forEach((card) => {
        this.appendCardToDiv(card, houseCardsDiv, false);
      });
    }
  }

  static renderPlayerCards(player) {
    let playerHand = player.hand;
    const targetDivName = this.getCardsDivNameFromName(player.name);
    const targetDiv = document.getElementById(targetDivName);
    playerHand.forEach((card) => {
      this.appendCardToDiv(card, targetDiv);
    });
  }

  static renderCardsOnTable(table) {
    this.renderHouseCards(table);
    for (let player of table.players) {
      this.renderPlayerCards(player);
    }
  }

  static getCardsDivNameFromName(name) {
    return name + "cardsDiv";
  }
}

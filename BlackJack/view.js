export class View {
  constructor() {}
  renderInitView() {
    document.getElementById("houseCards").innerHTML = "";
    document.getElementById("playerCards").innerHTML = "";
    document.getElementById("houseScore").innerHTML = "";
    document.getElementById("userScore").innerHTML = "";
  }

  appendCards(table) {
    for (let player of table.players) {
      for (let card of player.hand) {
        let cardImg = this.createCardImg(card);
        if (player.type == PLAYERTYPE.HOUSE) {
          document.getElementById("houseCards").append(cardImg);
        }
        document.getElementById("playerCards").append(cardImg);
      }
    }
  }
  static createCardImg(card) {
    let cardImg = document.createElement("img");
    cardImg.src = card.imgUrl;
    return cardImg;
  }
}

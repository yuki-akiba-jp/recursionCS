export const GAMETYPE = {
  BLACKJACK: "BLACKJACK",
};

export const PLAYERACTION = {
  HIT: "HIT",
  STAND: "STAND",
  ROUNDOVER: "ROUNDOVER",
};

// export const CardImgDirname = new URL("../", import.meta.url).pathname + "/cards";
export const CardImgDirname = "./cards/";

export const PLAYERTYPE = {
  USER: "USER",
  AI: "AI",
  HOUSE: "HOUSE",
};

export const GAMEPHASE = {
  BETTING: "BETTING",
  ACTING: "ACTING",
  ROUNDOVER: "ROUNDOVER",
};

export const GAMERESULT = {
  WIN: "WIN",
  LOSE: "LOSE",
  PUSH: "PUSH",
};

export const HIDDENCARDURL = "./cards/BACK.png";

export const PictureCardsRanks = ["J", "Q", "K"];
export const SUIT = ["H", "S", "C", "D"];

export const BLACKJACKNUM = 21;
export const RANK = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export const DIVS = {
  resultDiv: document.getElementById("resultDiv"),
  houseDiv: document.getElementById("houseDiv"),
  houseScore: document.getElementById("houseScore"),
  playersDiv: document.getElementById("playersDiv"),
  buttonsDiv: document.getElementById("betButtons"),
  onActingBtnDiv: document.getElementById("onActingBtnDiv"),
};

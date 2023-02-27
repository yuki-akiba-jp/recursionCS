export const GAMETYPE = {
  BLACKJACK: "BLACKJACK",
};

export const PLAYERACTION = {
  HIT: "HIT",
  STAND: "STAND",
  DOUBLE: "DOUBLE",
  SURRENDER: "SURRENDER",
  WAIT: "WAIT",
};

export const PLAYERGAMESTATUS = {
  ...PLAYERACTION,
  BET: "BET",
  PUSH: "PUSH",
  WIN: "WIN",
  GAMEOVER: "GAMEOVER",
  BLACKJACK: "BLACKJACK",
};

export const PLAYERTYPE = {
  USER: "USER",
  AI: "AI",
  HOUSE: "HOUSE",
};

export const GAMEPHASE = {
  BETTING: "BETTING",
  ACTING: "ACTING",
  ROUNDOVER: "ROUNDOVER",
  GAMEOVER: "GAMEOVER",
};

export const PictureCardsRanks = ["J", "Q", "K"];
export const SUIT = ["H", "S", "C", "D"];

export const SUITIMGURL = {
  S: "https://recursionist.io/img/spade.png",
  H: "https://recursionist.io/img/heart.png",
  C: "https://recursionist.io/img/clover.png",
  D: "https://recursionist.io/img/diamond.png",
  "?": "https://recursionist.io/img/questionMark.png",
};

export const BlackJackFireNum = 21;
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
  gameDiv: document.getElementById("gameDiv"),
  authDiv: document.getElementById("authDiv"),
};

import { URL } from "url";

export const GAMETYPE = {
  BLACKJACK: "BLACKJACK",
};

export const PLAYERACTION = {
  HIT: "HIT",
  STAND: "STAND",
  ROUNDOVER: "ROUNDOVER",
};

export const CardImgDirname = new URL(".", import.meta.url).pathname + "/cards";

export const PLAYERTYPE = {
  USER: "USER",
  AI: "AI",
  HOUSE: "HOUSE",
};

export const GAMEPHASE = {
  BETTING: "BETTING",
  ROUNDOVER: "ROUNDOVER",
};

export const PictureCardsRanks = ["J", "Q", "K"];
export const SUIT = ["H", "S", "C", "D"];

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

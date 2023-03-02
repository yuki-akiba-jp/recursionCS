import { Controller } from "./controller.mjs";
import { PLAYERTYPE, GAMETYPE } from "./config.mjs";
import { Table } from "./models/table.mjs";
import { Player } from "./models/player.mjs";

let table = new Table(GAMETYPE.BLACKJACK);
let ai1 = new Player("ai1", PLAYERTYPE.AI, GAMETYPE.BLACKJACK);
let ai2 = new Player("ai2", PLAYERTYPE.AI, GAMETYPE.BLACKJACK);
let user = new Player("user", PLAYERTYPE.USER, GAMETYPE.BLACKJACK);
table.players = [table.house, ai1, user, ai2];
Controller.startNewTable(table);

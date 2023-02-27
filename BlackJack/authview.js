import { DIVS } from "./config.js";
import { Controller } from "./controller.js";

export class AuthView {
  static renderAuthPage() {
    let container = document.createElement("div");
    container.innerHTML = `
        <p class="text-white">Welcome to Card Game!</p>
        <div class="my-2">
            <input id="username" type="text" placeholder="name" value="user">
        </div>
        <div class="my-2">
            <select class="w-100">
                <option value="blackjack">BlackJack </option>
                <option value="poker">Poker </option>
            </select>
        </div>
        <div class="my-2">
            <button type="submit" class="btn btn-success" id="startGameBtn">Start Game</button>
        <div>
        `;
    DIVS.authDiv.append(container);
    let startGameBtn = document.getElementById("startGameBtn");
    startGameBtn.addEventListener("click", () => {
      const username = document.getElementById("username").value;
      Controller.startGame(username);
    });
  }
}

import { DIVS } from "./config.js";
export class AuthView {
  static renderAuthPage() {
    DIVS.loginDiv.innerHTML = "";
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
    DIVS.authDiv.append(container);
  }
}

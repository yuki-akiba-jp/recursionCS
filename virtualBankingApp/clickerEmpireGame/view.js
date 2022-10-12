import { config } from "./config.js";
export class View {
  static createLoginPage() {
    let container = document.createElement("div");
    container.innerHTML = `
        <div
      class="vh-100 bg-gray align-items-center justify-content-center d-flex"
    >
      <div class="bg-white col-3">
        <form>
          <div class="mb-3">
            <label for="username" class="form-label">username</label>
            <input type="text" class="form-control" id="username" />
            <div id="emailHelp" class="form-text"></div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" />
          </div>
          <div class="buttons mb-3">
            <button type="submit" class="btn btn-outline-primary mr-3"> login </button>
            <button type="submit" class="btn btn-primary">register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
    `;
    config.loginPage.append(container);
  }
  static createMainPage() {}
  static createProductPage() {}
}

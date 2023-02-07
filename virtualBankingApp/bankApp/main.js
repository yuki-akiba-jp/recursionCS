const createTopPage = () => {
  let page = document.createElement("div");
  page.classList.add(
    "bg-gray",
    "vh-100",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  page.innerHTML = `
    <div
      id="cardWrapper"
      class="d-flex col-md-7 col-10 align-items-center justify-content-center"
    >
      <div id="loginCard" class="bg-white col-12 text-center">
        <h2>Please type your information below</h2>

        <form>
          <div id="name" class="form-row pb-3">
            <div class="col">
              <input
                type="text"
                class="form-control col"
                placeholder="first name"
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control col"
                placeholder="last name"
              />
            </div>
          </div>
          <div id="bankID" class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Enter your bank ID"
            />
          </div>
          <div id="firstDeposit" class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Enter your first deposit"
            />
          </div>
        </form>
        <button type="submit" class="btn btn-primary col-12">Submit</button>
      </div>
    </div>
  `;
  return page;
};

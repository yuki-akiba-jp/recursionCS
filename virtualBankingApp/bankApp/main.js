const createPageContainer = () => {
  let pageContainer = document.createElement("div");
  pageContainer.classList.add(
    "bg-gray",
    "vh-100",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  return pageContainer;
};

const createTopPage = () => {
  let pageContainer = createPageContainer();
  pageContainer.innerHTML = `
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
  return pageContainer;
};

const createSecondPage = () => {
  let pageContainer = createPageContainer();
  pageContainer.innerHTML = `
  <div
    id="userPageWrapper"
    class="d-flex col-md-7 col-10 align-items-center justify-content-center"
  >
    <div id="userpage" class="bg-green col-12 text-white">
      <div id="userInfo" class="text-right py-1">
        <div id="username" class="py-1">your name: name</div>
        <div id="deposit" class="py-1">your bankID: id</div>
        <div id="username" class="py-1">your firstDeposit: deposit</div>
      </div>
      <div id="balance" class="d-flex py-2 bg-red my-3">
        <p class="text-left col-8 rem1p5">Available Balance</p>
        <p class="text-right col-4 rem1p5">$2000</p>
      </div>

      <div
        id="buttons"
        class="justify-content-center flex-wrap d-flex text-center mt-3 py-3"
      >
        <div class="col-lg-4 col-12">
          <div id="withdrawBtn" class="bg-blue py-3 hover mx-1">
            <h5>WITHDRAWAL</h5>
            <i class="fas fa-coins fa-3x"></i>
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div id="depositBtn" class="bg-blue py-3 hover">
            <h5>DEPOSIT</h5>
            <i class="fas fa-wallet fa-3x"></i>
          </div>
        </div>

        <div class="col-lg-4 col-12">
          <div id="comebackBtn" class="bg-blue py-3 hover">
            <h5>COME BACK LATER</h5>
            <i class="fas fa-home fa-3x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
};

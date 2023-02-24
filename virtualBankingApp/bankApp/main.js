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
    <div id="loginCard" class="bg-white col-12 text-center ">
      <h2 class="mt-3">Please type your information below</h2>

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
      <button type="submit" class="btn btn-primary col-12 mb-3">Submit</button>
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
  return pageContainer;
};

//deposit page
const createThirdPage = () => {
  let pageContainer = createPageContainer();
  const dollers = [1, 5, 10, 20, 50, 100];
  pageContainer.innerHTML += `<div id="deposit-page" class="bg-white col-md-7 col-10 d-flex align-items-center justify-content-center">`;
  for (let doller of dollers) {
    pageContainer.innerHTML += `
      <div class="form-group row mt-3 col-10">
        <label for="${doller}$" class="col-2">$${doller}</label>
        <div class="col-10">
          <input
            id="${doller}$"
            class="form-control text-right"
            placeholder="0"
            type="number"
          />
        </div>
      </div>
    `;
  }
  pageContainer.innerHTML += `
    </div>
`;
  return pageContainer;
};
document.getElementById("target").append(createTopPage());
document.getElementById("target").append(createSecondPage());
document.getElementById("target").append(createThirdPage());

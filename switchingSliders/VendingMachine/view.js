class View {
  static createButtons() {
    let htmlString = "";
    for (let i = 1; i <= charactors.length; i++) {
      htmlString += `
                <div class='col-3 text-center py-2 px-2'>
                    <button class='btn btn-light col-12'>${i}</button>
                </div>    
            `;
    }

    config.btnCon.innerHTML = `
            <div class='col-12 px-0 d-flex flex-wrap py-2'>
                ${htmlString}
            </div>
        `;

    for (let i = 1; i <= charactors.length; i++) {
      document
        .getElementById("btnContainer")
        .querySelectorAll(".btn")
        [i - 1].addEventListener("click", function () {
          Controller.slideJump(i);
        });
    }
  }

  static createInfoContainer(charactor) {
    config.infoCon.innerHTML = `
            <div class='col-12 px-0 pl-2'>
                <p class='m-0'>Name : ${charactor.name}</p>
            </div>
        `;
  }

  static createSlider() {
    config.sliderCon.classList.add(
      "col-md-7",
      "col-12",
      "p-2",
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );

    config.sliderCon.innerHTML = `
            <div id='sliderShow' class="col-12 d-flex ">
                <div id='main' class="main full-width" data-index='0'></div>
                <div id='extra' class="extra full-width"></div>
            </div>
        `;
  }
}

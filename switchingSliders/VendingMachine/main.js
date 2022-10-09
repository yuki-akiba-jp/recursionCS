class Charactor {
  constructor(name, imgUrl) {
    this.name = name;
    this.imgUrl = imgUrl;
  }
}

const charactors = [
  new Charactor("lufy", "./pngs/lufy.png"),
  new Charactor("nami", "./pngs/nami.png"),
  new Charactor("chopper", "./pngs/chopper.png"),
  new Charactor("lucci", "./pngs/lucci.png"),
  new Charactor("franky", "./pngs/franky.png"),
  new Charactor("brook", "./pngs/brook.png"),
  new Charactor("sanji", "./pngs/sanji.png"),
  new Charactor("robin", "./pngs/robin.png"),
  new Charactor("jinbe", "./pngs/jinbe.png"),
  new Charactor("lufy", "./pngs/lufy.png"),
  new Charactor("nami", "./pngs/nami.png"),
  new Charactor("chopper", "./pngs/chopper.png"),
  new Charactor("lucci", "./pngs/lucci.png"),
  new Charactor("franky", "./pngs/franky.png"),
  new Charactor("brook", "./pngs/brook.png"),
  new Charactor("sanji", "./pngs/sanji.png"),
  new Charactor("robin", "./pngs/robin.png"),
  new Charactor("jinbe", "./pngs/jinbe.png"),
];

initializeApp();

const config = {
  sliderCon: document.getElementById("slider"),
  logoCon: document.getElementById("logoContainer"),
  infoCon: document.getElementById("infoContainer"),
  btnCon: document.getElementById("btnContainer"),
};

class Controller {
  static slideJump(input) {
    input--;
    let main = document.getElementById("main");
    let index = parseInt(main.getAttribute("data-index"));

    let currentElement = document.createElement("div");
    currentElement.classList.add("d-flex", "justify-content-center");

    if (index == -1) {
      currentElement.innerHTML += `
                <img class='col-10 imgFit' src="${charactors[0].imgUrl}" alt="">
            `;
    } else {
      currentElement.innerHTML += `
                <img class='col-10 imgFit' src="${charactors[index].imgUrl}" alt="">
            `;
    }

    let animationType = Algorithm.chooseRotation(
      index,
      input,
      charactors.length
    );

    index = input;

    let nextElement = document.createElement("div");
    nextElement.classList.add("d-flex", "justify-content-center");
    nextElement.innerHTML = `
            <img class='col-10 imgFit' src="${charactors[index].imgUrl}" alt="">
        `;

    config.infoCon.innerHTML = "";
    View.createInfoContainer(charactors[index]);

    main.setAttribute("data-index", index.toString());
    this.animateMain(currentElement, nextElement, animationType);
  }

  static animateMain(currentElement, nextElement, animationType) {
    let main = document.getElementById("main");
    let extra = document.getElementById("extra");

    main.innerHTML = "";
    main.append(nextElement);

    extra.innerHTML = "";
    extra.append(currentElement);

    main.classList.add("expand-animation");
    extra.classList.add("deplete-animation");

    let sliderShow = document.getElementById("sliderShow");

    if (animationType === "right") {
      sliderShow.innerHTML = "";
      sliderShow.append(extra);
      sliderShow.append(main);
    } else if (animationType === "left") {
      sliderShow.innerHTML = "";
      sliderShow.append(main);
      sliderShow.append(extra);
    }
  }
}

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

class Algorithm {
  static chooseRotation(curr, input, length) {
    let distance = curr - input;

    if (
      (distance < 0 && Math.abs(distance) > length / 2) ||
      (distance > 0 && Math.abs(distance) < length / 2)
    )
      return "left";
    else return "right";
  }
}

function initializeApp() {
  const target = document.getElementById("target");

  target.innerHTML = `
        <div class='vh-100 d-flex justify-content-center align-items-center'>
            <div class='col-lg-8 col-md-11 col-12 bg-pink d-flex flex-wrap'>
                <div id='slider'>
                </div>
                <div class='col-md-5 col-12 py-2'>
                    <div id='logoContainer'>
                    </div>
                    <div id='infoContainer'>
                    </div> 
                    
                    <div id='btnContainer'>
                    </div>
                    <div id='companyContainer'>
                    </div>
                </div>
            </div>
        </div>
    `;
}

View.createSlider();
View.createButtons();

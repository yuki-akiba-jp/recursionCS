initializeApp();

const config = {
  sliderCon: document.getElementById("slider"),
  logoCon: document.getElementById("logoContainer"),
  infoCon: document.getElementById("infoContainer"),
  btnCon: document.getElementById("btnContainer"),
};

class Animal {
  constructor(name, price, imgUrl) {
    this.name = name;
    this.price = price;
    this.imgUrl = imgUrl;
  }
}

let zoo = [
  new Animal(
    "Tiger",
    100,
    "https://cdn.pixabay.com/photo/2015/12/18/13/46/tiger-1098607__340.jpg"
  ),
  new Animal(
    "Elephant",
    200,
    "https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636__480.jpg"
  ),
  new Animal(
    "Parrot",
    30,
    "https://cdn.pixabay.com/photo/2018/09/22/17/05/parrot-3695678__340.jpg"
  ),
  new Animal(
    "Lemurs",
    15,
    "https://cdn.pixabay.com/photo/2015/10/28/15/05/lemurs-1010643__340.jpg"
  ),
  new Animal(
    "Ibis",
    75,
    "https://cdn.pixabay.com/photo/2018/11/11/16/51/ibis-3809147__340.jpg"
  ),
  new Animal(
    "Panda",
    90,
    "https://cdn.pixabay.com/photo/2019/08/21/16/03/panda-4421395__340.jpg"
  ),
  new Animal(
    "Zebra",
    120,
    "https://cdn.pixabay.com/photo/2020/10/13/10/20/zebra-5651454__480.jpg"
  ),
  new Animal(
    "Rabbit",
    25,
    "https://cdn.pixabay.com/photo/2018/06/28/00/11/mara-mammal-3502921__340.jpg"
  ),
  new Animal(
    "Giraffe",
    150,
    "https://cdn.pixabay.com/photo/2019/07/27/06/21/giraffe-4366005__340.jpg"
  ),
  new Animal(
    "Raccoon",
    45,
    "https://cdn.pixabay.com/photo/2018/07/14/17/46/raccoon-3538081__340.jpg"
  ),
  new Animal(
    "Frog",
    5,
    "https://cdn.pixabay.com/photo/2016/04/17/16/37/frog-1335022__340.jpg"
  ),
  new Animal(
    "Iguana",
    40,
    "https://cdn.pixabay.com/photo/2017/02/05/11/43/iguana-2039719__340.jpg"
  ),
  new Animal(
    "Adler",
    55,
    "https://cdn.pixabay.com/photo/2017/10/20/21/45/adler-2872995__340.jpg"
  ),
  new Animal(
    "Wolf",
    60,
    "https://cdn.pixabay.com/photo/2019/09/17/14/24/wolf-4483675__340.jpg"
  ),
  new Animal(
    "Crocodile",
    250,
    "https://cdn.pixabay.com/photo/2014/01/14/18/31/nile-crocodile-245013__340.jpg"
  ),
  new Animal(
    "Ape",
    20,
    "https://cdn.pixabay.com/photo/2019/07/24/14/17/monkey-4360298__340.jpg"
  ),
  new Animal(
    "Ostrich",
    140,
    "https://cdn.pixabay.com/photo/2019/09/25/15/58/ostrich-4504017__340.jpg"
  ),
  new Animal(
    "Rhinoceros",
    170,
    "https://cdn.pixabay.com/photo/2019/09/04/09/48/rhinoceros-4451152__340.jpg"
  ),
  new Animal(
    "Icebear",
    210,
    "https://cdn.pixabay.com/photo/2017/08/14/20/33/polar-bear-2641842__340.jpg"
  ),
  new Animal(
    "Cheetah",
    190,
    "https://cdn.pixabay.com/photo/2018/06/14/22/22/cheetah-3475778__340.jpg"
  ),
  new Animal(
    "Koala",
    30,
    "https://cdn.pixabay.com/photo/2013/01/14/12/21/koala-74908__340.jpg"
  ),
  new Animal(
    "Penguin",
    25,
    "https://cdn.pixabay.com/photo/2016/09/29/16/40/king-penguin-1703294__340.jpg"
  ),
];

class Controller {
  // input 1 - 9
  static slideJump(input) {
    input--;
    let main = document.getElementById("main");
    let index = parseInt(main.getAttribute("data-index"));

    let currentElement = document.createElement("div");
    currentElement.classList.add("d-flex", "justify-content-center");

    if (index == -1) {
      currentElement.innerHTML += `
                <img class='col-10 imgFit' src="${zoo[0].imgUrl}" alt="">
            `;
    } else {
      currentElement.innerHTML += `
                <img class='col-10 imgFit' src="${zoo[index].imgUrl}" alt="">
            `;
    }

    let animationType = Algorithm.chooseRotation(index, input, zoo.length);

    index = input;

    let nextElement = document.createElement("div");
    nextElement.classList.add("d-flex", "justify-content-center");
    nextElement.innerHTML = `
            <img class='col-10 imgFit' src="${zoo[index].imgUrl}" alt="">
        `;

    config.infoCon.innerHTML = "";
    View.createInfoContainer(zoo[index]);

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
    for (let i = 1; i <= zoo.length; i++) {
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

    for (let i = 1; i <= zoo.length; i++) {
      document
        .getElementById("btnContainer")
        .querySelectorAll(".btn")
        [i - 1].addEventListener("click", function () {
          Controller.slideJump(i);
        });
    }
  }

  static createInfoContainer(obj) {
    config.infoCon.innerHTML = `
            <div class='col-12 px-0 pl-2'>
                <p class='m-0'>Name : ${obj.name}</p>
                <p class='m-0'>Price : $${obj.price}</p>

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

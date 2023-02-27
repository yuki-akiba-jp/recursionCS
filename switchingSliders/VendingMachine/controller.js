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

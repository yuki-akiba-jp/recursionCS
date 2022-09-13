const target = document.getElementById("target");
const sliderItems = document.querySelectorAll(
  "#target .slider-data .slider-item"
);

let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");

sliderShow.classList.add("col-12", "d-flex", "flex-nowrap", "overflow-hiddens");
main.classList.add("main", "full-width");
extra.classList.add("extra", "full-width");

main.append(sliderItems[0]);

sliderShow.append(main);
sliderShow.append(extra);
target.append(sliderShow);

let controls = document.createElement("div");
controls.classList.add("offset-5", "mt-2");

let leftBtn = document.createElement("button");
leftBtn.classList.add("btn", "btn-light");
leftBtn.innerHTML = "<";

let rightBtn = document.createElement("button");
rightBtn.classList.add("btn", "btn-light");
rightBtn.innerHTML = ">";

controls.append(leftBtn);
controls.append(rightBtn);
target.append(controls);

main.setAttribute("data-index", "0");

// animationTypeというパラメータを追加します。
function slideJump(steps, animationType) {
  let index = parseInt(main.getAttribute("data-index"));
  let currentElement = sliderItems.item(index);

  index += steps;

  if (index < 0) index = sliderItems.length - 1;
  else if (index >= sliderItems.length) index = 0;

  let nextElement = sliderItems.item(index);

  main.setAttribute("data-index", index.toString());

  // animateMain関数の呼び出し
  animateMain(currentElement, nextElement, animationType);
}

function animateMain(currentElement, nextElement, animationType) {
  main.innerHTML = "";
  main.append(nextElement);

  extra.innerHTML = "";
  extra.append(currentElement);

  main.classList.add("expand-animation");
  extra.classList.add("deplete-animation");

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

rightBtn.addEventListener("click", function () {
  slideJump(-1, "left");
});

leftBtn.addEventListener("click", function () {
  slideJump(+1, "right");
});

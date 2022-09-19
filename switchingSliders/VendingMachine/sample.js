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

class Page {
  static createButtons() {
    let right = document.querySelector(".right");
    right.innerHTML = "";
    for (let index in charactors) {
      right.innerHTML += `
        <div class="d-flex col-4 py-2 px-2 justify-content-center">
          <button class="btn btn-primary col-4" type="submit">${index}</button>
        </div>

    `;
    }
    console.log(right);
  }

  static createLeft() {
    let left = document.querySelector(".left");
    let main = document.createElement("div");
    let extra = document.createElement("div");
    left.append(main, extra);

    let img = document.createElement("img");
    img.src = charactors[0].imgUrl;
    main.append(img);
    main.classList.add(
      "col-12",
      "justify-content-center",
      "d-flex",
      "deplete-animation"
    );
    let imgextra = document.createElement("img");
    imgextra.src = charactors[1].imgUrl;
    extra.append(imgextra);
    extra.classList.add(
      "col-12",
      "justify-content-center",
      "d-flex",
      "expand-animation"
    );
  }
}

let target = document.querySelector("#target");
target.innerHTML = `
<div class="vh-100 d-flex justify-content-center align-items-center  bg-primary">
    <div class="container d-flex col-8   bg-pink">
      <div class="left col-6 bg-danger d-flex"></div>
      <div class="right col-6 d-flex bg-secondary flex-wrap">
</div>
</div>
</div>
`;
Page.createButtons();
Page.createLeft();

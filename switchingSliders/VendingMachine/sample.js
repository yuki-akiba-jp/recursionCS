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

const config = {
  slider: document.getElementById("slider"),
  infoContainer: document.getElementById("infoContainer"),
  btnContainer: document.getElementById("infoContainer"),
  main: document.getElementById("main"),
};

function changeCharactors(currentIndex) {
  currentIndex--;
}
function createTemplate() {
  const target = document.getElementById("target");

  target.innerHTML = `
        <div class='vh-100 d-flex justify-content-center align-items-center'>
            <div class='col-lg-8 col-md-11 col-12 bg-pink d-flex flex-wrap'>
                <div id='slider'>
                </div>
                <div class='col-md-5 col-12 py-2'>
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

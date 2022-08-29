class motivationalSpeechWallPaper {
  constructor(text, colorCode, imageUrl, topCenterBottom, leftCenterBottom) {
    this.text = text;
    this.colorCode = colorCode;
    this.imageUrl = imageUrl;
    this.topCenterBottom = topCenterBottom;
    this.leftCenterBottom = leftCenterBottom;
  }
  generatePaper() {
    let paper = document.createElement("div");
    paper.classList.add("container", "d-flex", "justify-content-center");

    paper.innerHTML = `
                <div class="vh-75 p-md-5 p-3 my-5 col-md-8 col-12 d-flex imgBackground ${
                  this.leftCenterBottomTable[this.leftCenterBottom]
                } ${
      this.topCenterBottomTable[this.topCenterBottom]
    }" style="background-image: url('${this.imageUrl}');">
                    <div class="col-8">
                        <h3 class="paperText" style="color:#${
                          this.colorCode
                        }";>${this.text}</h3>
                    </div>
                </div>
            `;
    let domObj = document.getElementById("target");
    domObj.append(paper);
    return domObj;
  }
  topCenterBottomTable = {
    top: "align-items-start",
    center: "align-items-center",
    bottom: "align-items-end",
  };

  leftCenterBottomTable = {
    left: "justify-content-start",
    center: "justify-content-center",
    right: "justify-content-end",
  };
}

let domObj = document.getElementById("target");

let paper1 = new motivationalSpeechWallPaper(
  "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. - Antoine de Saint",
  "2c3e50",
  "https://cdn.pixabay.com/photo/2020/06/12/03/06/magnifying-glass-5288877__340.jpg",
  "top",
  "right"
);

let paper2 = new motivationalSpeechWallPaper(
  "The scientist discovers a new type of material or energy and the engineer discovers a new use for it. - Gordon Lindsay Glegg",
  "007bff",
  "https://cdn.pixabay.com/photo/2018/02/23/04/38/laptop-3174729_1280.jpg",
  "bottom",
  "left"
);

let paper3 = new motivationalSpeechWallPaper(
  "Scientists study the world as it is, engineers create the world that never has been. - Theodore von Karman",
  "ecf0f1",
  "https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg",
  "top",
  "right"
);
let papers = [paper1, paper2, paper3];
papers.map((paper) => {
  paper.generatePaper();
});

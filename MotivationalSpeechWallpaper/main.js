class WallPaper {
  constructor(text, color, picuturUrl, verticalLocation, horizontalLocation) {
    this.text = text;
    this.color = "#" + color;
    this.picuturUrl = picuturUrl;
    this.verticalLocation = this.getVerticalProperty(verticalLocation);
    this.horizontalLocation = this.getHorizontalProperty(horizontalLocation);
  }
  getVerticalProperty(verticalLocation) {
    let location = "";
    if (verticalLocation == "top") {
      location = "start";
    } else if (verticalLocation == "center") {
      location = "center";
    } else {
      location = "end";
    }
    return "align-items-" + location;
  }
  getHorizontalProperty(horizontalLocation) {
    let location = "";
    if (horizontalLocation == "left") {
      location = "start";
    } else if (horizontalLocation == "center") {
      location = "center";
    } else {
      location = "end";
    }
    return "justify-content-" + location;
  }
}

function createWallPaper(paperObj) {
  let paperContainer = document.createElement("div");
  paperContainer.classList.add("container", "d-flex", "justify-content-center");
  let paper = document.createElement("div");
  paper.classList.add(
    "vh-75",
    "d-flex",
    "p-5",
    "my-5",
    "col-8",
    "paper",
    paperObj.horizontalLocation,
    paperObj.verticalLocation
  );
  paper.style.backgroundImage = "url(" + paperObj.picuturUrl + ")";

  let paperText = document.createElement("div");
  paperText.classList.add("d-flex", "col-8", "paperText");
  paperText.innerHTML = paperObj.text;
  paperText.style.color = paperObj.color;
  paper.append(paperText);
  paperContainer.append(paper);

  return paperContainer;
}
let wallPaper1 = new WallPaper(
  "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. - Antoine de Saint",
  "1B4F72",
  "https://cdn.pixabay.com/photo/2020/06/12/03/06/magnifying-glass-5288877__340.jpg",
  "top",
  "right"
);

let wallPaper2 = new WallPaper(
  "The scientist discovers a new type of material or energy and the engineer discovers a new use for it. - Gordon Lindsay Glegg",
  "007bff",
  "https://cdn.pixabay.com/photo/2018/02/23/04/38/laptop-3174729_1280.jpg",
  "center",
  "left"
);

let wallPaper3 = new WallPaper(
  "Scientists study the world as it is, engineers create the world that never has been. - Theodore von Karman",
  "ecf0f1",
  "https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg",
  "center",
  "center"
);

let wallPaperList = [wallPaper1, wallPaper2, wallPaper3];
let papers = document.querySelector("#papers");
for (let WallPaper of wallPaperList) {
  papers.append(createWallPaper(WallPaper));
}

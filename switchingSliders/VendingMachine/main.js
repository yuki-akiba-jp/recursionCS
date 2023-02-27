import { View } from "./view.js";
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

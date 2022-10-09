
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

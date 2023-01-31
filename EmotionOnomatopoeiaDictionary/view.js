import { EmotionObject } from "./emotionobject.js";
import { emotions } from "./emotions.js";
import { dictionary, pictureDictionary } from "./dictionarys.js";
export class View {
  static createEmotionPanel(emotionObject) {
    let emotionPanel = document.createElement("div");

    // emotionPanel.setAttribute("id", emotionObject.emotion);
    emotionPanel.classList.add(
      "emotion",
      "d-flex",
      "col-3",
      "m-3",
      "p-3",
      "flex-column",
      "justify-content-center",
      "align-items-center",
      "text-white"
    );
    let atag = document.createElement("a");
    atag.setAttribute("href", "#" + emotionObject.emotion);
    emotionPanel.append(atag);

    emotionPanel.style.backgroundColor = emotionObject.color;
    emotionPanel.innerHTML += `
      <h1>${emotionObject.emotion}</h1>
      <h1 class="py-1">🥳</h1>
      <h5 class="py-1  ">${emotionObject.description}</h5>
    `;
    return emotionPanel;
  }
  static createEmotionsPart() {
    let emotionsPart = document.createElement("div");
    emotionsPart.classList.add(
      "container",
      "d-flex",
      "justify-content-center",
      "flex-wrap"
    );
    for (let emotionObject of emotions) {
      emotionsPart.append(this.createEmotionPanel(emotionObject));
    }
    document.getElementById("target").append(emotionsPart);
  }
  static createWordCard(word) {
    let wordCard = document.createElement("div");
    wordCard.classList.add("bg-white", "d-flex", "col-5", "my-2");
    wordCard.innerHTML = `
<div class="col-8">
  <h3 class="py-1">${word}</h3>
  <h5>${dictionary[word]}</h5>
</div>
<div class="col-4 d-flex align-items-center py-1">
  <img
    class=""
    src="${pictureDictionary[word]}"
  />
</div>
    `;
    return wordCard;
  }
  static createOnomatopeiaContainer(emotionObject) {
    let onomatopoeiaContainer = document.createElement("div");
    onomatopoeiaContainer.style.backgroundColor = emotionObject.color;
    onomatopoeiaContainer.classList.add("d-flex", "col-12", "flex-wrap");
    onomatopoeiaContainer.setAttribute("id", emotionObject.emotion);
    onomatopoeiaContainer.innerHTML = `
  <div class="col-12 px-0">
    <h1>${emotionObject.emotion}</h1>
    <h3>${emotionObject.description}</h3>
  </div>
  `;
    let wordCards = document.createElement("div");
    wordCards.classList.add(
      "container",
      "d-flex",
      "justify-content-between",
      "flex-wrap"
    );
    for (let word of emotionObject.onomatopoeia) {
      wordCards.append(this.createWordCard(word));
    }
    onomatopoeiaContainer.append(wordCards);
    return onomatopoeiaContainer;
  }
  static createOnomatopeiaPart() {
    let onomatopoeiaPart = document.createElement("div");
    for (let emotionObject of emotions) {
      onomatopoeiaPart.append(this.createOnomatopeiaContainer(emotionObject));
    }
    document.getElementById("target").append(onomatopoeiaPart);
  }
  static createTopPage() {
    this.createEmotionsPart();
    this.createOnomatopeiaPart();
  }
}

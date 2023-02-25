const URL = "https://api.recursionist.io/random-words";
async function fetchPromiseRanInt(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("data is below");
      afterProcess(data);
    });
}

fetchPromiseRanInt(URL);

function afterProcess(data) {
  // 配列を1つの文字列へ
  let sentence = data.join(" ");
  console.log(sentence);

  // htmlに挿入します。
  let parent = document.getElementById("#target1");
  parent.innerHTML = `
        <div class="card p-2">
            <h4>Sentence From the server:</h4>
                <p class="mt-3">${sentence}</p>
        </div>
    `;
}

let btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  const minNum = document.getElementById("min").value;
  const maxNum = document.getElementById("max").value;
  fetchPromiseRanInt(getNewUrl(minNum, maxNum));
});

function getNewUrl(min, max) {
  let res = URL;
  const labelstring = ["min", "max"];
  const numbersString = [min, max];
  for (let index = 0; index < labelstring.length; index++) {
    if (index) {
      res += "&" + labelstring[index] + "=" + numbersString[index];
    } else {
      res += "?" + labelstring[index] + "=" + numbersString[index];
    }
  }
  return res;
}

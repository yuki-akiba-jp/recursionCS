const config = {
  url: "https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=ISBN:",
  parentId: "target",
};

function logBookCall(isbn) {
  fetch(config.url + isbn)
    .then((response) => response.json())
    .then(function (data) {
      for (let bookKey in data) {
        let currentBook = data[bookKey];
        console.log(currentBook);
      }
    });
}

// データを確認
// logBookCall("0451526538");
logBookCall("9780739360385");
//
let searchBtn = document.getElementById("searchBtn");
const inputField = document.getElementById("inputISBN");

searchBtn.addEventListener("click", () => {
  fetch(config.url + inputField.value)
    .then((res) => res.json())
    .then((data) => {
      if (Object.keys(data).length === 0 && data.constructor === Object)
        document.getElementById("target").innerHTML = "<h1>Not Found</h1>";
      else {
        for (let key in data) {
          let currentBook = data[key];
          let target = document.getElementById("target");
          target.innerHTML = `
      result
      <div class="col-12 d-flex">
        <div id="left" class="col-4">
          <img src=${currentBook.cover.medium} />
        </div>
        <div id="right" class="col-8">
          <p class="title">Title: ${currentBook.title}</p>
          <p>Author: ${currentBook.authors[0].name}</p>
          <p>Statement: ${currentBook.by_statement}</p>
        </div>
      </div>

      <div class="col-12 props">
        <p class="bg-lightblue">pages:  ${currentBook.number_of_pages}</p>
        <p>Publisher:   ${currentBook.authors[0].name}</p>
        <p class="bg-lightblue">date:   ${currentBook.publish_date}</p>
       <tr>
          <p scope="row">Categories</p>
          <td>${parseDataOL(currentBook.subjects)}</td>
       </tr>
      </div> `;
        }
      }
    });
});
function parseDataOL(data) {
  let parsed = "";
  for (let i = 0; i < data.length - 1; i++) {
    parsed += data[i].name + ",";
  }
  return parsed + data[data.length - 1].name;
}

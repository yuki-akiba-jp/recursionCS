let targetElement = document.getElementById("target-p");
const customEvent = new Event("myUniqueEvent");

function randomFunction(event) {
  console.log("The event just ran!!!!!");

  // イベントに関する追加情報をログに記録します。このイベントオブジェクトは常にいくつかのメンバ変数を含み、その中にはtarget,timestamp,typeメンバが含まれます。

  // イベントが発生した要素
  console.log(event.target);

  // 現在のドキュメントの生成からイベントが作成された時点までの時間（ミリ秒単位）
  console.log(event.timeStamp);

  // イベントタイプ
  console.log(event.type);

  // eventのデータ型
  console.log(typeof event);
}

targetElement.addEventListener("myUniqueEvent", randomFunction);

targetElement.dispatchEvent(customEvent);

// ブラウザに表示されているテキストをクリックしてみましょう。
targetElement.addEventListener("click", function (e) {
  console.log(e.timeStamp);
});

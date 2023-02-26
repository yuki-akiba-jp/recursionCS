export class Table {
  /*
       String gameType : {"blackjack"}から選択。
       Array betDenominations : プレイヤーが選択できるベットの単位。デフォルトは[5,20,50,100]。
       return Table : ゲームフェーズ、デッキ、プレイヤーが初期化されたテーブル
    */
  constructor(gameType, betDenominations = [5, 20, 50, 100]) {
    this.gameType = gameType;
    this.betDenominations = betDenominations;
    this.deck = new Deck(this.gameType);
    this.players = [];
    this.house = new Player("house", "house", this.gameType);
    this.gamePhase = "betting";
    this.resultsLog = [];
  }
  /*
        Player player : テーブルは、Player.promptPlayer()を使用してGameDecisionを取得し、GameDecisionとgameTypeに応じてPlayerの状態を更新します。
        return Null : このメソッドは、プレーヤの状態を更新するだけです。

        EX:
        プレイヤーが「ヒット」し、手札が21以上の場合、gameStatusを「バスト」に設定し、チップからベットを引きます。
    */
  evaluateMove(Player) {
    //TODO: ここから挙動をコードしてください。
  }

  /*
       return String : 新しいターンが始まる直前の全プレイヤーの状態を表す文字列。
        NOTE: このメソッドの出力は、各ラウンドの終了時にテーブルのresultsLogメンバを更新するために使用されます。
    */
  blackjackEvaluateAndGetRoundResults() {
    //TODO: ここから挙動をコードしてください。
  }

  /*
       return null : デッキから2枚のカードを手札に加えることで、全プレイヤーの状態を更新します。
       NOTE: プレイヤーのタイプが「ハウス」の場合は、別の処理を行う必要があります。
    */
  blackjackAssignPlayerHands() {
    //TODO: ここから挙動をコードしてください。
  }

  /*
       return null : テーブル内のすべてのプレイヤーの状態を更新し、手札を空の配列に、ベットを0に設定します。
    */
  blackjackClearPlayerHandsAndBets() {
    //TODO: ここから挙動をコードしてください。
  }

  /*
       return Player : 現在のプレイヤー
    */
  getTurnPlayer() {
    //TODO: ここから挙動をコードしてください。
  }

  /*
       Number userData : テーブルモデルの外部から渡されるデータです。 
       return Null : このメソッドはテーブルの状態を更新するだけで、値を返しません。
    */
  haveTurn(userData) {
    //TODO: ここから挙動をコードしてください。
  }

  /*
        return Boolean : テーブルがプレイヤー配列の最初のプレイヤーにフォーカスされている場合はtrue、そうでない場合はfalseを返します。
    */
  onFirstPlayer() {
    //TODO: ここから挙動をコードしてください。
  }

  /*
        return Boolean : テーブルがプレイヤー配列の最後のプレイヤーにフォーカスされている場合はtrue、そうでない場合はfalseを返します。
    */
  onLastPlayer() {
    //TODO: ここから挙動をコードしてください。
  }

  /*
        全てのプレイヤーがセット{'broken', 'bust', 'stand', 'surrender'}のgameStatusを持っていればtrueを返し、持っていなければfalseを返します。
    */
  allPlayerActionsResolved() {
    //TODO: ここから挙動をコードしてください。
  }
}

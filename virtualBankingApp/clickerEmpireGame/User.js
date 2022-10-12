export class User {
  constructor(name, initialMoney, money) {
    this.name = name;
    this.initialMoney = initialMoney;
    this.money = money;
  }
  getMoney() {
    return this.money;
  }
}

class Account {
  constructor(data) {
    this._name = data.name;
    this._type = data.type;
  }

  get loanAmount() {
    if (this._type.type === 'vip') {
      return 20000;
    } else {
      return 10000;
    }
  }
}

class AccountType {
  constructor(type) {
    this._type = type;
  }

  get type() {
    return this._type;
  }
}
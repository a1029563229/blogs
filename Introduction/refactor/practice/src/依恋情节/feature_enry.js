class Account {
  constructor(data) {
    this._name = data.name;
    this._type = data.type;
  }

  get loanAmount() {
    return this._type.loanAmount;
  }
}

class AccountType {
  constructor(type) {
    this._type = type;
  }

  get type() {
    return this._type;
  }

  get loanAmount() {
    if (this.type === 'vip') {
      return 20000;
    } else {
      return 10000;
    }
  }
}

module.exports = {
    Account,
    AccountType
}
class Person {
  constructor(name) {
    this._name = name;
    this._telephoneNumber = new TelephoneNumber();
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return this._telephoneNumber.toString();
  }

  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }

  set officeAreaCode(arg) {
    this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
  }

  get officeNumber() {
    return this._telephoneNumber.number;
  }

  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
  }
}

class TelephoneNumber {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }

  get areaCode() {
    return this._areaCode;
  }

  get number() {
    return this._number;
  }

  toString() {
    return `(${this._areaCode}) ${this._number}`;
  }
}

module.exports = Person;
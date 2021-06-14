class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }

  get officeAreaCode() {
    return this._officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }

  get officeNumber() {
    return this._officeNumber;
  }

  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}

const person = new Person('jack');
person.officeAreaCode = '+86';
person.officeNumber = 18726182811;
console.log(`person's name is ${person.name}, telephoneNumber is ${person.telephoneNumber}`);
// person's name is jack, telephoneNumber is (+86) 18726182811
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get department() {
    return this._department;
  }
  set department(arg) {
    this._department = arg;
  }
}

class Department {
  get code() {
    return this._code;
  }
  set code(arg) {
    this._code = arg;
  }
  get manager() {
    return this._manager;
  }
  set manager(arg) {
    this._manager = arg;
  }
}
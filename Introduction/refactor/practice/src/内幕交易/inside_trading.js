class Person {
  constructor(name, department) {
    this._name = name;
    this._department = department;
  }
  get name() {
    return this._name;
  }
  get departmentCode() {
    return this._department.code;
  }
  set departmentCode(arg) {
    this._department.code = arg;
  }
  get manager() {
    return this._department._manager;
  }
  set manager(arg) {
    this._department._manager = arg;
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

module.exports = {
    Person,
    Department
};

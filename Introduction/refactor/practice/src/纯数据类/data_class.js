class Category {
  constructor(data) {
    this._name = data.name;
    this._level = data.level;
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get level() {
    return this._level;
  }

  set level(arg) {
    this._level = arg;
  }

  toString() {
    return `${this._level}.${this._name}`;
  }
}

class Product {
  constructor(data) {
    this._name = data._name;
    this._category = data.category;
  }

  get category() {
    return this._category.toString();
  }
}

module.exports = {
  Product,
  Category
};

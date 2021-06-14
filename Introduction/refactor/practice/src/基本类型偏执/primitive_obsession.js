class Product {
  constructor(data) {
    this._name = data.name;
    this._price = new Price(data.price);
    /* ... */
  }

  get name() {
    return this.name;
  }

  /* ... */

  get price() {
    return this._price.toString();
  }

  get priceCount() {
    return this._price.count;
  }

  get priceUnit() {
    return this._price.unit;
  }

  get priceCnyCount() {
    return this._price.cnyCount;
  }

  get priceSuffix() {
    return this._price.suffix;
  }
}

class Price {
  constructor(value) {
    this._value = value;
  }

  toString() {
    return `${this.count} ${this.suffix}`;
  }

  get count() {
    return parseFloat(this._value.slice(1));
  }

  get unit() {
    switch (this._value.slice(0, 1)) {
      case '￥':
        return 'cny';
      case '$':
        return 'usd';
      case 'k':
        return 'hkd';
      default:
        throw new Error('un support unit');
    }
  }

  get cnyCount() {
    switch (this.unit) {
      case 'cny':
        return this.count;
      case 'usd':
        return this.count * 7;
      case 'hkd':
        return this.count * 0.8;
      default:
        throw new Error('un support unit');
    }
  }

  get suffix() {
    switch (this.unit) {
      case 'cny':
        return '元';
      case 'usd':
        return '美元';
      case 'hkd':
        return '港币';
      default:
        throw new Error('un support unit');
    }
  }
}

module.exports = Product;
class Product {
  constructor(data) {
    this._name = data.name;
    this._price = createPrice(data.price);
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

  get suffix() {
    throw new Error('un support unit');
  }
}

class CnyPrice extends Price {
  constructor(props) {
    super(props);
  }

  get unit() {
    return 'cny';
  }

  get cnyCount() {
    return this.count;
  }

  get suffix() {
    return '元';
  }
}

class UsdPrice extends Price {
  constructor(props) {
    super(props);
  }

  get unit() {
    return 'usd';
  }

  get cnyCount() {
    return this.count * 7;
  }

  get suffix() {
    return '美元';
  }
}

class HkdPrice extends Price {
  constructor(props) {
    super(props);
  }

  get unit() {
    return 'hkd';
  }

  get cnyCount() {
    return this.count * 0.8;
  }

  get suffix() {
    return '港币';
  }
}

function createPrice(value) {
  switch (value.slice(0, 1)) {
    case '￥':
      return new CnyPrice(value);
    case '$':
      return new UsdPrice(value);
    case 'k':
      return new HkdPrice(value);
    default:
      throw new Error('un support unit');
  }
}

module.exports = Product;

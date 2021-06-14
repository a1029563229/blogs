class Product {
  constructor(data) {
    this._name = data.name;
    this._price = data.price;
    /* ... */
  }

  get name() {
    return this.name;
  }

  /* ... */

  get price() {
    return `${this.priceCount} ${this.priceSuffix}`;
  }

  get priceCount() {
    return parseFloat(this._price.slice(1));
  }

  get priceUnit() {
    switch (this._price.slice(0, 1)) {
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

  get priceCnyCount() {
    switch (this.priceUnit) {
      case 'cny':
        return this.priceCount;
      case 'usd':
        return this.priceCount * 7;
      case 'hkd':
        return this.priceCount * 0.8;
      default:
        throw new Error('un support unit');
    }
  }

  get priceSuffix() {
    switch (this.priceUnit) {
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
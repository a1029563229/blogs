class Range {
  constructor(min, max) {
    this._min = min;
    this._max = max;
  }

  outside(num) {
    return num < this._min || num > this._max;
  }

  inside(num) {
    return num > this._min && num < this._max;
  }
}

function priceOutSideRange(products, range) {
  return products.filter(r => range.outside(r.price));
}

function priceInsideRange(products, range) {
  return products.filter(r => range.inside(r.price));
}

module.exports = {
  Range,
  priceOutSideRange,
  priceInsideRange
};

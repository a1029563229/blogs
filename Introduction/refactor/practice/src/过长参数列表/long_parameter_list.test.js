const { Range, priceOutSideRange, priceInsideRange } = require('./long_parameter_list');

describe('test priceRange', () => {
  test('priceOutSideRange should return correct result when input correct outside conditional', () => {
    const products = [
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 },
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ];
    const range = new Range(1, 10);

    const result = priceOutSideRange(products, range);

    expect(result).toStrictEqual([
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ]);
  });

  test('priceInsideRange should return correct result when input correct inside conditional', () => {
    const products = [
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 },
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ];
    const range = new Range(1, 10);

    const result = priceInsideRange(products, range);

    expect(result).toStrictEqual([
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 }
    ]);
  });
});

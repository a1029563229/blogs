const Product = require('./primitive_obsession');

describe('test Product price', () => {
  const products = [
    { name: 'apple', price: '$6' },
    { name: 'banana', price: '￥7' },
    { name: 'orange', price: 'k15' },
    { name: 'cookie', price: '$0.5' }
  ];

  test('Product.price should return correct price when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).price);

    expect(result).toStrictEqual(['6 美元', '7 元', '15 港币', '0.5 美元']);
  });

  test('Product.price should return correct priceCount when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).priceCount);

    expect(result).toStrictEqual([6, 7, 15, 0.5]);
  });

  test('Product.price should return correct priceUnit when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).priceUnit);

    expect(result).toStrictEqual(['usd', 'cny', 'hkd', 'usd']);
  });

  test('Product.price should return correct priceCnyCount when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).priceCnyCount);

    expect(result).toStrictEqual([42, 7, 12, 3.5]);
  });

  test('Product.price should return correct priceSuffix when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).priceSuffix);

    expect(result).toStrictEqual(['美元', '元', '港币', '美元']);
  });
});

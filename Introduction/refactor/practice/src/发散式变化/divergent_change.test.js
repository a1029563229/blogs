const getPrice = require('./divergent_change');

describe('test price 2', () => {
  test('getPrice should return normal price when input correct order quantity < 500', () => {
    const input = {
      quantity: 20,
      itemPrice: 10
    };

    const result = getPrice(input);

    expect(result).toBe(220);
  });

  test('getPrice should return discount price when input correct order quantity > 500', () => {
    const input = {
      quantity: 1000,
      itemPrice: 10
    };

    const result = getPrice(input);

    expect(result).toBe(9850);
  });
});

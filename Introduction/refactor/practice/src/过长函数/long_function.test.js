const printOwing = require('./long_function');

describe('test printOwing', () => {
  let collections = [];
  console.log = message => {
    collections.push(message);
  };

  afterEach(() => {
    collections = [];
  });

  test('printOwing should return correct struct when input correct struct', () => {
    const input = {
      customer: 'jack',
      orders: [{ amount: 102 }, { amount: 82 }, { amount: 87 }, { amount: 128 }]
    };

    printOwing(input);

    const today = new Date(Date.now());
    const dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30).toLocaleDateString();
    expect(collections).toStrictEqual([
      '***********************',
      '**** Customer Owes ****',
      '***********************',
      'name: jack',
      'amount: 399',
      'due: ' + dueDate
    ]);
  });

  test('printOwing should return correct struct when input correct struct 2', () => {
    const input = {
      customer: 'dove',
      orders: [{ amount: 63 }, { amount: 234 }, { amount: 12 }, { amount: 1351 }]
    };

    printOwing(input);

    const today = new Date(Date.now());
    const dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30).toLocaleDateString();
    expect(collections).toStrictEqual([
      '***********************',
      '**** Customer Owes ****',
      '***********************',
      'name: dove',
      'amount: 1660',
      'due: ' + dueDate
    ]);
  });
});

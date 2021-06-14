const reportLines = require('./lazy_element');

describe('test reportLines', () => {
  test('reportLines should return correct array struct when input aCustomer', () => {
    const input = {
      name: 'jack',
      location: 'tokyo'
    };

    const result = reportLines(input);

    expect(result).toStrictEqual([
      ['name', 'jack'],
      ['location', 'tokyo']
    ]);
  });

  test('reportLines should return correct array struct when input aCustomer', () => {
    const input = {
      name: 'jackli',
      location: 'us'
    };

    const result = reportLines(input);

    expect(result).toStrictEqual([
      ['name', 'jackli'],
      ['location', 'us']
    ]);
  });
});

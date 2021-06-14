const acquireCityData = require('./loop');

describe('test acquireCityData', () => {
  test('acquireCityData should return India city when input India', () => {
    const input =
      ',,+00\nMumbai,India,+91 22\n , , \nTianjing,China,+022\n , , \nKolkata,India,+91 33\nBeijing,China,+010\nHyderabad,India,+91 40';

    const result = acquireCityData(input, 'India');

    expect(result).toStrictEqual([
      {
        city: 'Mumbai',
        phone: '+91 22'
      },
      {
        city: 'Kolkata',
        phone: '+91 33'
      },
      {
        city: 'Hyderabad',
        phone: '+91 40'
      }
    ]);
  });

  test('acquireCityData should return China city when input China', () => {
    const input =
      ',,+00\nMumbai,India,+91 22\n , , \nTianjing,China,+022\n , , \nKolkata,India,+91 33\nBeijing,China,+010\nHyderabad,India,+91 40';

    const result = acquireCityData(input, 'China');

    expect(result).toStrictEqual([
      {
        city: 'Tianjing',
        phone: '+022'
      },
      {
        city: 'Beijing',
        phone: '+010'
      }
    ]);
  });
});

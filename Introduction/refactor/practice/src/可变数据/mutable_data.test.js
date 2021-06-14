const { merge } = require('./mutable_data');

describe('test merge', () => {
  test('test merge should return correct struct when merge', () => {
    const baseConfig = {
      url: 'https://api.com',
      code: 'mall'
    };

    const testSpecialConfig = {
      url: 'https://test-api.com',
      code: 'test-mall'
    };

    const result = merge(baseConfig, testSpecialConfig);

    expect(result).toStrictEqual({
      url: 'https://test-api.com',
      code: 'test-mall'
    });
  });

  test('test merge should return original struct when merge', () => {
    const baseConfig = {
      url: 'https://api.com',
      code: 'mall'
    };

    const testSpecialConfig = {
      url: 'https://test-api.com',
      code: 'test-mall'
    };

    merge(baseConfig, testSpecialConfig);

    expect(baseConfig).toStrictEqual({
      url: 'https://api.com',
      code: 'mall'
    });
  });
});

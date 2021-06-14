const { Product, Category } = require('./data_class');

describe('test Category', () => {
  test('Product.category should return correct data when input category', () => {
    const input = {
      level: 1,
      name: '水果'
    };

    const result = new Product({ name: '苹果', category: new Category(input) }).category;

    expect(result).toBe('1.水果');
  });

  test('Product.category should return correct data when input category', () => {
    const input = {
      level: 2,
      name: '热季水果'
    };

    const result = new Product({ name: '苹果', category: new Category(input) }).category;

    expect(result).toBe('2.热季水果');
  });
});

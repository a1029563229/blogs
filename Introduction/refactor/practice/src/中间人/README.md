## 中间人（Middle Man）

```js
class Product {
  constructor(data) {
    this._name = data.name;
    this._price = createPrice(data.price);
    /* ... */
  }

  get name() {
    return this.name;
  }

  /* ... */

  get price() {
    return this._price.toString();
  }

  get priceCount() {
    return this._price.count;
  }

  get priceUnit() {
    return this._price.unit;
  }

  get priceCnyCount() {
    return this._price.cnyCount;
  }

  get priceSuffix() {
    return this._price.suffix;
  }
}
```

“嗯，这个 `Product` + `Price` 又被我翻出来了，因为经过了两次重构后，它还是存在一些坏味道。”

“现在我要访问 `Product` 价格相关的信息，都是直接通过 `Product` 访问，而 `Product` 负责提供 `price` 的很多接口。随着 `Price` 类的新特性越来越多，更多的转发函数就会使人烦躁，而现在已经有点让人烦躁了。”

“这个 `Product` 类已经快完全变成一个中间人了，那我现在希望调用方应该直接使用 `Price` 类。我们先来写两个测试用例。”老耿开始写代码。

```js
describe('test Product price', () => {
  const products = [
    { name: 'apple', price: '$6' },
    { name: 'banana', price: '￥7' },
    { name: 'orange', price: 'k15' },
    { name: 'cookie', price: '$0.5' }
  ];

  test('Product.price should return correct price when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).price.toString());

    expect(result).toStrictEqual(['6 美元', '7 元', '15 港币', '0.5 美元']);
  });

  test('Product.price should return correct priceCount when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).price.count);

    expect(result).toStrictEqual([6, 7, 15, 0.5]);
  });

  test('Product.price should return correct priceUnit when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).price.unit);

    expect(result).toStrictEqual(['usd', 'cny', 'hkd', 'usd']);
  });

  test('Product.price should return correct priceCnyCount when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).price.cnyCount);

    expect(result).toStrictEqual([42, 7, 12, 3.5]);
  });

  test('Product.price should return correct priceSuffix when input products', () => {
    const input = [...products];

    const result = input.map(item => new Product(item).price.suffix);

    expect(result).toStrictEqual(['美元', '元', '港币', '美元']);
  });
});
```

“写完的测试用例也是不能直接运行的，接下来我们调整 `Product` 类，把中间人移除。”

```js
class Product {
  constructor(data) {
    this._name = data.name;
    this._price = createPrice(data.price);
    /* ... */
  }

  get name() {
    return this.name;
  }

  /* ... */

  get price() {
    return this._price;
  }
}
```

“调整完成后，直接运行测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-12_10-05-59.jpg)

“测试用例通过了，别忘了把使用到 `Product` 的地方都检查一遍。”

“很难说什么程度的隐藏才是合适的。但是有隐藏委托关系和删除中间人，就可以在系统运行过程中不断进行调整。随着代码的变化，“合适的隐藏程度” 这个尺度也相应改变。”

“我们来看看重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_10-00-07.jpg)

“我们继续下一个吧。”
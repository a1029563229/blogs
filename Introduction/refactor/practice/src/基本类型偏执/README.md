## 基本类型偏执（Primitive Obsession）

```js
class Product {
  constructor(data) {
    this._name = data.name;
    this._price = data.price;
    /* ... */
  }

  get name() {
    return this.name;
  }

  /* ... */

  get price() {
    return `${this.priceCount} ${this.priceSuffix}`;
  }

  get priceCount() {
    return parseFloat(this._price.slice(1));
  }

  get priceUnit() {
    switch (this._price.slice(0, 1)) {
      case '￥':
        return 'cny';
      case '$':
        return 'usd';
      case 'k':
        return 'hkd';
      default:
        throw new Error('un support unit');
    }
  }

  get priceCnyCount() {
    switch (this.priceUnit) {
      case 'cny':
        return this.priceCount;
      case 'usd':
        return this.priceCount * 7;
      case 'hkd':
        return this.priceCount * 0.8;
      default:
        throw new Error('un support unit');
    }
  }

  get priceSuffix() {
    switch (this.priceUnit) {
      case 'cny':
        return '元';
      case 'usd':
        return '美元';
      case 'hkd':
        return '港币';
      default:
        throw new Error('un support unit');
    }
  }
}
```

“我们来看看这个 `Product`（产品）类，大家应该也看出来了这个类的一些坏味道，`price` 字段作为一个基本类型，在 `Product` 类中被各种转换计算，然后输出不同的格式，`Product` 类需要关心 `price` 的每一个细节。”

“在这里，`price` 非常值得我们为它创建一个属于它自己的基本类型 - `Price`。”

“在重构之前，先把测试用例覆盖完整。”老耿开始写代码。

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
```

“测试用例写完以后运行一下，看看效果。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-10_07-56-22.jpg)

“这个重构手法也比较简单，先新建一个 `Price` 类，先把 `price` 和相关的行为搬移到 `Price` 类中，然后再委托给 `Product` 类即可。我们先来实现 `Price` 类。”

```js
class Price {
  constructor(value) {
    this._value = value;
  }

  toString() {
    return `${this.count} ${this.suffix}`;
  }

  get count() {
    return parseFloat(this._value.slice(1));
  }

  get unit() {
    switch (this._value.slice(0, 1)) {
      case '￥':
        return 'cny';
      case '$':
        return 'usd';
      case 'k':
        return 'hkd';
      default:
        throw new Error('un support unit');
    }
  }

  get cnyCount() {
    switch (this.unit) {
      case 'cny':
        return this.count;
      case 'usd':
        return this.count * 7;
      case 'hkd':
        return this.count * 0.8;
      default:
        throw new Error('un support unit');
    }
  }

  get suffix() {
    switch (this.unit) {
      case 'cny':
        return '元';
      case 'usd':
        return '美元';
      case 'hkd':
        return '港币';
      default:
        throw new Error('un support unit');
    }
  }
}
```

“此时，`Product` 类我还没有修改，但是如果你觉得你搬移函数的过程中容易手抖不放心的话，可以运行一下测试用例。”

“接下来是重构 `Product` 类，将原有跟 `price` 相关的逻辑，使用中间人委托来调用。”

```js
class Product {
  constructor(data) {
    this._name = data.name;
    this._price = new Price(data.price);
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

“重构完成后，运行测试用例。” 老耿按下运行键。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-10_08-09-23.jpg)

“测试用例运行通过了，别忘了提交代码。”

“很多人对基本类型都有一种偏爱，他们普遍觉得基本类型要比类简洁，但是，别让这种偏爱演变成了 `偏执`。有些时候，我们需要走出传统的洞窟，进入炙手可热的对象世界。”

“这个案例演示了一种很常见的场景，相信你们以后也可以识别基本类型偏执这种坏味道了。”

小李小王疯狂点头。

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-43-54.jpg)

“那我们继续吧。”
## 过长参数列表（Long Parameter List）

```js
// range.js
function priceRange(products, min, max, isOutSide) {
  if (isOutSide) {
    return products
      .filter(r => r.price < min || r.price > max);
  } else {
    return products
      .filter(r => r.price > min && r.price < max);
  }
}

// a.js
const range = { min: 1, max: 10 }
const outSidePriceProducts = priceRange(
  [ /* ... */ ],
  range.min,
  range.max,
  true
)

// b.js
const range = { min: 5, max: 8 }
const insidePriceProducts = priceRange(
  [ /* ... */ ],
  range.min,
  range.max,
  false
)
```

“第一眼看过去，`priceRange` 是过滤商品的函数，仔细看的话会发现，主要比对的是 `product.price` 字段和传入的参数 `min` 与 `max` 之间的大小对比关系。如果 `isOutSide` 为 `true` 的话，则过滤出价格区间之外的商品，否则过滤出价格区间之内的商品。”

“第一眼看过去，这个函数的参数实在是太多了，这会让客户端调用方感到很疑惑。还好参数 `isOutSide` 的命名还算不错，不然这个函数会看起来更深奥。”

小李忍不住插了句：“我每次调用 `priceRange` 函数的时候都要去看一眼这个函数的实现，我老是忘记最后一个参数的规则。”

“我和小李的看法是一样的。”老耿点了点头：“我也不喜欢标记参数，因为它们让人难以理解到底有哪些函数可以调用、应该怎么调用。使用这样的函数，我还得弄清标记参数有哪些可用的值。”

“既然小李也已经发现这个问题了，那我们就从这个 `isOutSide` 参数下手，进行优化。老规矩，我们先针对现有的代码写两个测试用例。” 老耿开始写代码。

```js
describe('test priceRange', () => {
  test('priceRange should return correct result when input correct outside conditional', () => {
    const products = [
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 },
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ];
    const range = { min: 1, max: 10 };
    const isOutSide = true;

    const result = priceRange(products, range.min, range.max, isOutSide);

    expect(result).toStrictEqual([
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ]);
  });

  test('priceRange should return correct result when input correct inside conditional', () => {
    const products = [
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 },
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ];
    const range = { min: 5, max: 8 };
    const isOutSide = false;

    const result = priceRange(products, range.min, range.max, isOutSide);

    expect(result).toStrictEqual([
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 }
    ]);
  });
});
```

“运行一下单元测试...嗯，是可以通过的。那接下来就可以进行参数精简了，我们先把刚才小李提的那个问题解决，就是标记参数，我们针对 `priceRange` 再提炼两个函数。”

“我们先修改我们的单元测试代码，按我们期望调用的方式修改。”

```js
const priceRange = require('./long_parameter_list');

describe('test priceRange', () => {
  test('priceOutSideRange should return correct result when input correct outside conditional', () => {
    const products = [
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 },
      { name: 'orange', price: 15 },
      { name: 'cookie', price: 0.5 }
    ];
    const range = { min: 1, max: 10 };

    const result = priceOutSideRange(products, range.min, range.max);

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
    const range = { min: 5, max: 8 };

    const result = priceInsideRange(products, range.min, range.max);

    expect(result).toStrictEqual([
      { name: 'apple', price: 6 },
      { name: 'banana', price: 7 }
    ]);
  });
});
```

“我把 `priceRange` 的 `isOutSide` 标记参数移除了，并且使用 `priceOutsideRange` 和 `priceInsideRange` 两个方法来实现原有的功能。这时候还不能运行测试用例，因为我们的代码还没改呢。同样的，把代码调整成符合用例调用的方式。”

```js
function priceRange(products, min, max, isOutSide) {
  if (isOutSide) {
    return products.filter(r => r.price < min || r.price > max);
  } else {
    return products.filter(r => r.price > min && r.price < max);
  }
}

function priceOutSideRange(products, min, max) {
  return priceRange(products, min, max, true);
}

function priceInsideRange(products, min, max) {
  return priceRange(products, min, max, false);
}
```

“代码调整完成后，我们来运行一下测试用例。好的，通过了！”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-09_06-52-27.jpg)

“嗯，我想到这里以后，可以更进一步，把 `priceRange` 的函数进一步抽离，就像这样。”

```js
function priceRange(products, min, max, isOutSide) {
  if (isOutSide) {
    return products.filter(r => r.price < min || r.price > max);
  } else {
    return products.filter(r => r.price > min && r.price < max);
  }
}

function priceOutSideRange(products, min, max) {
  return products.filter(r => r.price < min || r.price > max);
}

function priceInsideRange(products, min, max) {
  return products.filter(r => r.price > min && r.price < max);
}
```

“拆解完成后，记得运行一下测试用例... ok，通过了”

“在测试用例通过后，就可以开始准备迁移工作了。把原来调用 `priceRange` 的地方替换成新的调用，然后再把 `priceRange` 函数安全删除，就像这样。”

```js
// range.js
function priceOutSideRange(products, min, max) {
  return products.filter(r => r.price < min || r.price > max);
}

function priceInsideRange(products, min, max) {
  return products.filter(r => r.price > min && r.price < max);
}

// a.js
const range = { min: 1, max: 10 }
const outSidePriceProducts = priceOutSideRange(
  [ /* ... */ ],
  range.min,
  range.max
)

// b.js
const range = { min: 5, max: 8 }
const insidePriceProducts = priceInsideRange(
  [ /* ... */ ],
  range.min,
  range.max
)
```

“这么做以后，原来让人疑惑的标记参数就被移除了，取而代之的是两个语义更加清晰的函数。”

“接下来，我们要继续做一件有价值的重构，那就是将数据组织成结构，因为这样让数据项之间的关系变得明晰。比如 `range` 的 `min` 和 `max` 总是在调用中被一起使用，那这两个参数就可以组织成结构。我先修改我的测试用例以适应最新的改动，就像这样。”

```js
//...
const range = { min: 1, max: 10 };

const result = priceOutSideRange(products, range);

expect(result).toStrictEqual([
  { name: 'orange', price: 15 },
  { name: 'cookie', price: 0.5 }
]);

//...
const range = { min: 5, max: 8 };

const result = priceInsideRange(products, range);

expect(result).toStrictEqual([
  { name: 'apple', price: 6 },
  { name: 'banana', price: 7 }
]);
```

“测试用例修改完成后，来修改一下我们的函数。”

```js
// range.js
function priceOutSideRange(products, range) {
  return products.filter(r => r.price < range.min || r.price > range.max);
}

function priceInsideRange(products, range) {
  return products.filter(r => r.price > range.min && r.price < range.max);
}

// a.js
const range = { min: 1, max: 10 }
const outSidePriceProducts = priceOutSideRange(
  [ /* ... */ ],
  range
)

// b.js
const range = { min: 5, max: 8 }
const insidePriceProducts = priceInsideRange(
  [ /* ... */ ],
  range
)
```

“修改完成后，运行我们的测试用例，顺利通过，别忘了提交代码。”说完，老耿打了个 `Commit`。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-09_07-04-30.jpg)

“这一步重构又精简了一个参数，这是这项重构最直接的价值。而这项重构真正的意义在于，它会催生代码中更深层次的改变。一旦识别出新的数据结构，我就可以重组程序的行为来使用这些结构。这句话实际应用起来是什么意思呢？我还是拿这个案例来举例。”

“我们会发现 `priceOutSideRange` 和 `priceInsideRange` 的函数命名已经足够清晰，但是内部对 `range` 范围的判定还是需要花费一定时间理解，而 `range` 作为我们刚识别出来的一种结构，可以继续进行重构，就像这样。”

```js
// range.js
class Range {
  constructor(min, max) {
    this._min = min;
    this._max = max;
  }

  outside(num) {
    return num < this._min || num > this._max;
  }

  inside(num) {
    return num > this._min && num < this._max;
  }
}

function priceOutSideRange(products, range) {
  return products.filter(r => range.outside(r.price));
}

function priceInsideRange(products, range) {
  return products.filter(r => range.inside(r.price));
}

// a.js
const outSidePriceProducts = priceOutSideRange(
  [ /* ... */ ],
  new Range(1, 10)
)

// b.js
const insidePriceProducts = priceInsideRange(
  [ /* ... */ ],
  new Range(5, 8)
)
```

“修改测试用例也传入 `Range` 对象，然后运行测试用例...ok，通过了。测试通过后再提交代码。”

“这样一来，让 `priceOutSideRange` 和 `priceInsideRange` 函数内部也更加清晰了。同时，`range` 被组织成了一种新的数据结构，这种结构可以在任何计算区间的地方使用。”

“我们来看看重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-20-02.jpg)

“我们继续。”
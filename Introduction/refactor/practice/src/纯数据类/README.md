## 纯数据类（Data Class）

```js
class Category {
  constructor(data) {
    this._name = data.name;
    this._level = data.level;
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get level() {
    return this._level;
  }

  set level(arg) {
    this._level = arg;
  }
}

class Product {
  constructor(data) {
    this._name = data._name;
    this._category = data.category;
  }

  get category() {
    return `${this._category.level}.${this._category.name}`;
  }
}
```

“`Category` 是个纯数据类，像这样的纯数据类，直接使用字面量对象似乎也没什么问题。”

“但是，纯数据类常常意味着行为被放在了错误的地方。比如在 `Product` 有一个应该属于 `Category` 的行为，就是转化为字符串，如果把处理数据的行为从其他地方搬移到纯数据类里来，就能使这个纯数据类有存在的意义。”

“我们先写两个简单的测试用例。”老耿开始写代码。

```js
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
```

“测试用例写完以后，运行一下... ok，通过了。接下来，我们把本应该属于 `Category` 的行为，挪进来。”

```js
class Category {
  constructor(data) {
    this._name = data.name;
    this._level = data.level;
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get level() {
    return this._level;
  }

  set level(arg) {
    this._level = arg;
  }

  toString() {
    return `${this._level}.${this._name}`;
  }
}

class Product {
  constructor(data) {
    this._name = data._name;
    this._category = data.category;
  }

  get category() {
    return this._category.toString();
  }
}
```

“然后我们运行一下测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-12_10-44-19.jpg)

“用例运行成功了，别忘了提交代码。” 老耿打了个 commit。

“我们需要为纯数据赋予行为，或者使用纯数据类来控制数据的读写。否则的话，纯数据类并没有太大存在的意义，应该作为冗赘元素被移除。”

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_10-08-24.jpg)

“那我们继续下一个。”
## 重复的 switch（Repeated switch）

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

“刚才我们提炼了 `Price` 类后，现在发现 `Price` 类有个问题，你们看出来了吗？” 老耿看着小李小王。

小李摇了摇头，小王也没说话。

“重复的 `switch` 语句，每当看到代码里有 `switch` 语句时，就要提高警惕了。当看到重复的 `switch` 语句时，这种坏味道就冒出来了。” 老耿接着说道。 

“重复的 switch 的问题在于：每当你想增加一个选择分支时，必须找到所有的 switch，并逐一更新。”

“并且这种 `switch` 结构是非常脆弱的，频繁的修改 `switch` 语句可能还可能会引发别的问题，相信你们也遇到过这种情况。”

小李此时似乎想起了什么，补充道：“这里的 `switch` 语句还好，有些地方的 `switch` 语句写的太长了，每次理解起来也很困难，所以容易改出问题。”

“小李说的不错，那我们现在来重构这个 `Price`。这里我偷个懒，测试用例接着用之前 `Product` 的测试用例，你们可以在实际项目中针对 `Price` 写用例，测试用例的粒度越小，越容易定位问题。”

“我们先创建一个工厂函数，同时将 `Product` 类的实例方法也使用工厂函数创建。”老耿开始写代码。

```js
class Product {
  constructor(data) {
    this._name = data.name;
    this._price = createPrice(data.price);
    /* ... */
  }

  /* ... */
}

function createPrice(value) {
  return new Price(value);
}
```

“运行一下测试用例... ok，通过了。那我们下一步，把 `Price` 作为超类，创建一个子类 `CnyPrice`，继承于 `Price`，同时修改工厂函数，在货币类型为 `￥` 时，创建并返回 `CnyPrice` 类。”

```js
class CnyPrice extends Price {
  constructor(props) {
    super(props);
  }
}

function createPrice(value) {
  switch (value.slice(0, 1)) {
    case '￥':
      return new CnyPrice(value);
    default:
      return new Price(value);
  }
}
```

“运行一下测试用例... ok，通过了。那我们下一步，把 `Price` 超类中，所有关于 `cny` 的条件逻辑的函数，在 `CnyPrice` 中进行重写。”

```js
class CnyPrice extends Price {
  constructor(props) {
    super(props);
  }

  get unit() {
    return 'cny';
  }

  get cnyCount() {
    return this.count;
  }

  get suffix() {
    return '元';
  }
}
```

“重写完成后，运行一下测试用例... ok，通过了，下一步再把 `Price` 类中，所有关于 `cny` 的条件分支都移除。”

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

“移除完成后，运行一下测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-10_08-31-53.jpg)

“运行通过，接下来我们如法炮制，把 `UsdPrice` 和 `HkdPrice` 也创建好，最后再将超类中的条件分支逻辑相关代码都移除。” 老耿继续写代码。

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

  get suffix() {
    throw new Error('un support unit');
  }
}

class CnyPrice extends Price {
  constructor(props) {
    super(props);
  }

  get unit() {
    return 'cny';
  }

  get cnyCount() {
    return this.count;
  }

  get suffix() {
    return '元';
  }
}

class UsdPrice extends Price {
  constructor(props) {
    super(props);
  }

  get unit() {
    return 'usd';
  }

  get cnyCount() {
    return this.count * 7;
  }

  get suffix() {
    return '美元';
  }
}

class HkdPrice extends Price {
  constructor(props) {
    super(props);
  }

  get unit() {
    return 'hkd';
  }

  get cnyCount() {
    return this.count * 0.8;
  }

  get suffix() {
    return '港币';
  }
}

function createPrice(value) {
  switch (value.slice(0, 1)) {
    case '￥':
      return new CnyPrice(value);
    case '$':
      return new UsdPrice(value);
    case 'k':
      return new HkdPrice(value);
    default:
      throw new Error('un support unit');
  }
}
```

“重构完成后，运行测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-10_08-38-35.jpg)

“ok，运行通过，别忘了提交代码。”

“这样一来，修改对应的货币逻辑并不影响其他的货币逻辑，并且添加一种新的货币规则也不会影响到其他货币逻辑，修改和添加特性都变得简单了。”

“复杂的条件逻辑是编程中最难理解的东西之一，最好可以将条件逻辑拆分到不同的场景，从而拆解复杂的条件逻辑。这种拆分有时用条件逻辑本身的结构就足以表达，但使用类和多态能把逻辑的拆分表述得更清晰。”

“就像我刚才演示的那样。”

“我们来看一下重构前后的对比。“

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-47-54.jpg)

“那我们继续吧。”
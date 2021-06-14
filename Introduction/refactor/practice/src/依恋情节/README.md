## 依恋情节（Feature Envy）

```js
class Account {
  constructor(data) {
    this._name = data.name;
    this._type = data.type;
  }

  get loanAmount() {
    if (this._type.type === 'vip') {
      return 20000;
    } else {
      return 10000;
    }
  }
}

class AccountType {
  constructor(type) {
    this._type = type;
  }

  get type() {
    return this._type;
  }
}
```

“这段代码是账户 `Account` 和账户类型 `AccountType`，如果账户的类型是 `vip`，贷款额度 `loanAmount` 就有 20000，否则就只有 10000。”

“在获取贷款额度时，`Account` 内部的 `loanAmount` 方法和另一个类 `AccountType` 的内部数据交流格外频繁，远胜于在自己所处模块内部的交流，这就是依恋情结的典型情况。”

“我们先写两个测试用例吧。”老耿开始写代码。

```js
describe('test Account', () => {
  test('Account should return 20000 when input vip type', () => {
    const input = {
      name: 'jack',
      type: new AccountType('vip')
    };

    const result = new Account(input).loanAmount;

    expect(result).toBe(20000);
  });

  test('Account should return 20000 when input normal type', () => {
    const input = {
      name: 'dove',
      type: new AccountType('normal')
    };

    const result = new Account(input).loanAmount;

    expect(result).toBe(10000);
  });
});
```

“测试用例可以直接运行... ok，通过了。”

“接下来，我们把 `loanAmount` 搬移到真正属于它的地方。”

```js
class Account {
  constructor(data) {
    this._name = data.name;
    this._type = data.type;
  }

  get loanAmount() {
    return this._type.loanAmount;
  }
}

class AccountType {
  constructor(type) {
    this._type = type;
  }

  get type() {
    return this._type;
  }

  get loanAmount() {
    if (this.type === 'vip') {
      return 20000;
    } else {
      return 10000;
    }
  }
}
```

“在搬移完成后，`loanAmount` 访问的都是自身模块的数据，不再依恋其他模块。我们运行一下测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-13_09-09-27.jpg)

“ok，测试通过了，别忘了提交代码。”老耿提交了一个 commit。

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-35-43.jpg)

“我们继续下一个。”
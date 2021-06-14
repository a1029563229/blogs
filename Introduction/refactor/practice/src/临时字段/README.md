## 临时字段（Temporary Field）

```js
class Site {
  constructor(customer) {
    this._customer = customer;
  }

  get customer() {
    return this._customer;
  }
}

class Customer {
  constructor(data) {
    this._name = data.name;
    this._billingPlan = data.billingPlan;
    this._paymentHistory = data.paymentHistory;
  }

  get name() {
    return this._name;
  }
  get billingPlan() {
    return this._billingPlan;
  }
  set billingPlan(arg) {
    this._billingPlan = arg;
  }
  get paymentHistory() {
    return this._paymentHistory;
  }
}

// Client 1
{
  const aCustomer = site.customer;
  // ... lots of intervening code ...
  let customerName;
  if (aCustomer === 'unknown') customerName = 'occupant';
  else customerName = aCustomer.name;
}

// Client 2
{
  const plan = aCustomer === 'unknown' ? registry.billingPlans.basic : aCustomer.billingPlan;
}

// Client 3
{
  if (aCustomer !== 'unknown') aCustomer.billingPlan = newPlan;
}

// Client 4
{
  const weeksDelinquent = aCustomer === 'unknown' ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;
}
```

“这一段代码是，我们的线下商城服务点，在老客户搬走新客户还没搬进来的时候，会出现暂时没有客户的情况。在每个查询客户信息的地方，都需要判断这个服务点有没有客户，然后再根据判断来获取有效信息。”

“`aCustomer === 'unknown'` 这是个特例情况，在这个特例情况下，就会使用到很多临时字段，或者说是特殊值字段。这种重复的判断不仅会来重复代码的问题，也会非常影响核心逻辑的代码可读性，造成理解的困难。”

“这里，我要把所有的重复判断逻辑都移除掉，保持核心逻辑代码的纯粹性。然后，我要把这些临时字段收拢到一个地方，进行统一管理。我们先写两个测试用例。”

```js
describe('test Site', () => {
  test('Site should return correct data when input Customer', () => {
    const input = {
      name: 'jack',
      billingPlan: { num: 100, offer: 50 },
      paymentHistory: { weeksDelinquentInLastYear: 28 }
    };

    const result = new Site(new Customer(input)).customer;

    expect({
      name: result.name,
      billingPlan: result.billingPlan,
      paymentHistory: result.paymentHistory
    }).toStrictEqual(input);
  });

  test('Site should return empty data when input NullCustomer', () => {
    const input = {
      name: 'jack',
      billingPlan: { num: 100, offer: 50 },
      paymentHistory: { weeksDelinquentInLastYear: 28 }
    };

    const result = new Site(new NullCustomer(input)).customer;

    expect({
      name: result.name,
      billingPlan: result.billingPlan,
      paymentHistory: result.paymentHistory
    }).toStrictEqual({
      name: 'occupant',
      billingPlan: { num: 0, offer: 0 },
      paymentHistory: { weeksDelinquentInLastYear: 0 }
    });
  });
});
```

“嗯，这次又是 TDD，第一个用例是可以运行的，运行是可以通过的。”

“接下来，我按这个思路去实现 `NullCustomer`，这个实现起来其实很简单。”

```js
class NullCustomer extends Customer {
  constructor(data) {
    super(data);
    this._name = 'occupant';
    this._billingPlan = { num: 0, offer: 0 };
    this._paymentHistory = {
      weeksDelinquentInLastYear: 0
    };
  }
}
```

“实现完成后，运行一下测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-12_09-35-35.jpg)

“我引入了这个特例对象后，我只需要在初始化 `Site` 的时候判断老客户搬出新客户还没有搬进来的情况，决定初始化哪一个 `Customer`，而不用在每个调用的地方都判断一次，还引入那么多临时字段了。”

“如果写出来的话，就像是这样一段伪代码。”

```js
// initial.js
const site = customer === 'unknown' ? new Site(new NullCustomer()) : new Site(new Customer(customer));

// Client 1
{
  const aCustomer = site.customer;
  // ... lots of intervening code ...
  const customerName = aCustomer.name;
}

// Client 2
{
  const plan = aCustomer.billingPlan;
}

// Client 3
{
}

// Client 4
{
  const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
}
```

“在这里我就不对你们的代码做实际修改了，你们下去以后自己调整一下吧。”

小李小王疯狂点头。

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-55-50.jpg)

“我们继续下一个。”

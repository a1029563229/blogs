## 异曲同工的类（Alternative Classes with Different Interfaces）

```js
class Employee {
  constructor(name, id, monthlyCost) {
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() {
    return this._monthlyCost;
  }
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department {
  constructor(name, staff) {
    this._name = name;
    this._staff = staff;
  }
  get staff() {
    return this._staff.slice();
  }
  get name() {
    return this._name;
  }
  get totalMonthlyCost() {
    return this.staff.map(e => e.monthlyCost).reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this.staff.length;
  }
  get totalAnnualCost() {
    return this.totalMonthlyCost * 12;
  }
}
```

“这里有一个坏味道，和重复代码有异曲同工之妙，叫做异曲同工的类。这里我以经典的 `Employee` 案例来讲解一下。”

“在这个案例中，`Employee` 类和 `Department` 都有 `name` 字段，也都有月度成本 `monthlyCost` 和年度成本 `annualCost` 的概念，可以说这两个类其实在做类似的事情。”

“我们可以用提炼超类来组织这种异曲同工的类，来消除重复行为。”

“在此之前，根据我们最后想要实现的效果，我们先编写两个测试用例。”

```js
describe('test Employee and Department', () => {
  test('Employee annualCost should return 600 when input monthlyCost 50', () => {
    const input = {
      name: 'Jack',
      id: 1,
      monthlyCost: 50
    };

    const result = new Employee(input.name, input.id, input.monthlyCost).annualCost;

    expect(result).toBe(600);
  });

  test('Department annualCost should return 888 when input different staff', () => {
    const input = {
      name: 'Dove',
      staff: [{ monthlyCost: 12 }, { monthlyCost: 41 }, { monthlyCost: 24 }, { monthlyCost: 32 }, { monthlyCost: 19 }]
    };

    const result = new Department(input.name, input.staff).annualCost;

    expect(result).toBe(1536);
  });
});
```

“这个测试用例现在运行也是失败的，因为我们还没有把 `Department` 改造完成。接下来，我们先把 `Employee` 和 `Department` 相同的字段和行为提炼出来，提炼成一个超类 `Party`。”

```js
class Party {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get monthlyCost() {
    return 0;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}
```

“这两个类相同的字段有 `name`，还有计算年度成本 `annualCost` 的方式，因为使用到了 `monthlyCost` 字段，所以我把这个字段也提炼出来，先返回个默认值 0。”

“接下来对 `Employee` 类进行精简，将提炼到超类的部分进行继承。”

```js
class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() {
    return this._monthlyCost;
  }
  get id() {
    return this._id;
  }
}
```

“再接下来对 `Department` 类进行改造，继承 `Party` 类，然后进行精简。”

```js
class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }
  get staff() {
    return this._staff.slice();
  }
  get monthlyCost() {
    return this.staff.map(e => e.monthlyCost).reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this.staff.length;
  }
}
```

“这样就完成了改造，运行一下测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-13_07-45-21.jpg)

“测试通过了。记得把其他使用到这两个类的地方改造完成后再提交代码。”

“如果看见两个异曲同工的类在做相似的事，可以利用基本的继承机制把它们的相似之处提炼到超类。”

“有很多时候，合理的继承关系是在程序演化的过程中才浮现出来的：我发现了一些共同元素，希望把它们抽取到一处，于是就有了继承关系。所以，先尝试用小而快的重构手法，重构后再发现新的可重构结构。”

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_10-06-33.jpg)

“我们继续下一个。”
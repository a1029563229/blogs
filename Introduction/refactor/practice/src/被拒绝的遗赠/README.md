## 被拒绝的遗赠（Refuse Bequest）

```js
class Party {
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

  get monthlyCost() {
    return 0;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}

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

class Department extends Party {
  constructor(name) {
    super(name);
  }
  get monthlyCost() {
    return this.staff.map(e => e.monthlyCost).reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this.staff.length;
  }
}
```

“关于这个坏味道，我想改造一下之前那个 `Employee` 和 `Department` 的例子来进行讲解。”

“这个例子可以看到，我把 `staff` 字段从 `Department` 上移到了 `Party` 类，但其实 `Employee` 类并不关心 `staff` 这个字段。这就是 `被拒绝的遗赠` 坏味道。”

“重构手法也很简单，就是把 `staff` 字段下移到真正需要它的子类 `Department` 中就可以了，就像我刚完成提炼超类那时的样子。”

“如果超类中的某个字段或函数只与一个或少数几个子类有关，那么最好将其从超类中挪走，放到真正关心它的子类中去。”

“十有八九这种坏味道很淡，需要对业务熟悉程度较高才能发现。”

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_10-11-25.jpg)

“那我们继续下一个。”
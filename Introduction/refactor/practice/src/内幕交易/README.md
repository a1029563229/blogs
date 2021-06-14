## 内幕交易（Insider Trading）

```js
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get department() {
    return this._department;
  }
  set department(arg) {
    this._department = arg;
  }
}

class Department {
  get code() {
    return this._code;
  }
  set code(arg) {
    this._code = arg;
  }
  get manager() {
    return this._manager;
  }
  set manager(arg) {
    this._manager = arg;
  }
}
```

“在这个案例里，如果要获取 `Person` 的部门代码 `code` 和部门领导 `manager` 都需要先获取 `Person.department`。这样一来，调用者需要额外了解 `Department` 的接口细节，如果 `Department` 类修改了接口，变化会波及通过 `Person` 对象使用它的所有客户端。”

“我们都喜欢在模块之间建起高墙，极其反感在模块之间大量交换数据，因为这会增加模块间的耦合。在实际情况里，一定的数据交换不可避免，但我必须尽量减少这种情况，并把这种交换都放到明面上来。”

“接下来，我们按照我们期望程序运行的方式，来编写两个测试用例。”

```js
describe('test Person', () => {
   test('Person should return 88 when input Department code 88', () => {
       const inputName = 'jack'
       const inputDepartment = new Department();
       inputDepartment.code = 88;
       inputDepartment.manager = 'Tom';

       const result = new Person(inputName, inputDepartment).departmentCode;

       expect(result).toBe(88);
   });

   test('Person should return Tom when input Department manager Tom', () => {
       const inputName = 'jack'
       const inputDepartment = new Department();
       inputDepartment.code = 88;
       inputDepartment.manager = 'Tom';

       const result = new Person(inputName, inputDepartment).manager;

       expect(result).toBe('Tom');
   });
});
```

“在测试用例中，我们可以直接通过 `Person` 得到这个人的部门代码 `departmentCode` 和部门领导 `manager` 了，那接下来，我们把 `Person` 类进行重构。”

```js
class Person {
  constructor(name, department) {
    this._name = name;
    this._department = department;
  }
  get name() {
    return this._name;
  }
  get departmentCode() {
    return this._department.code;
  }
  set departmentCode(arg) {
    this._department.code = arg;
  }
  get manager() {
    return this._department._manager;
  }
  set manager(arg) {
    this._department._manager = arg;
  }
}
```

“这里我直接将修改一步到位，但是你们练习的时候还是要一小步一小步进行重构，发现问题就可以直接回退代码。”老耿语重心长的说道。

小李小王疯狂点头。

“我们回来看代码，在代码里，我把委托关系进行了隐藏，从而客户端对 `Department` 类的依赖。这么一来，即使将来委托关系发生变化，变化也只会影响服务对象 - `Person` 类，而不会直接波及所有客户端。”

“我们运行一下测试代码。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-13_08-43-55.jpg)

“运行通过了，在所有代码替换完成前，可以先保留对 `department` 的访问，在所有代码都修改完成后，再完全移除，提交代码。”

“我们来看看重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_10-01-47.jpg)

“我们继续下一个。”
## 数据泥团（Data Clumps）

```js
class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }

  get officeAreaCode() {
    return this._officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }

  get officeNumber() {
    return this._officeNumber;
  }

  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}

const person = new Person('jack');
person.officeAreaCode = '+86';
person.officeNumber = 18726182811;
console.log(`person's name is ${person.name}, telephoneNumber is ${person.telephoneNumber}`);
// person's name is jack, telephoneNumber is (+86) 18726182811
```

“这个 Person 类记录了用户的名字（name），电话区号（officeAreaCode）和电话号码（officeNumber），这里有一个不是很刺鼻的坏味道。”

“如果我把 `officeNumber` 字段删除，那 `officeAreaCode` 就失去了意义。这说明这两个字段总是一起出现的，除了 `Person` 类，其他用到电话号码的地方也是会出现这两个字段的组合。”

“这个坏味道叫做数据泥团，主要体现在数据项喜欢成群结队地待在一块儿。你常常可以在很多地方看到相同的三四项数据：两个类中相同的字段、许多函数签名中相同的参数，这些总是绑在一起出现的数据真应该拥有属于它们自己的对象。”

“老规矩，我们先写两个测试用例。”老耿开始写代码

```js
describe('test Person', () => {
  test('person.telephoneNumber should return (+86) 18726182811 when input correct struct', () => {
    const person = new Person('jack');
    person.officeAreaCode = '+86';
    person.officeNumber = 18726182811;

    const result = person.telephoneNumber;

    expect(person.officeAreaCode).toBe('+86');
    expect(person.officeNumber).toBe(18726182811);
    expect(result).toBe('(+86) 18726182811');
  });

  test('person.telephoneNumber should return (+51) 15471727172 when input correct struct', () => {
    const person = new Person('jack');
    person.officeAreaCode = '+51';
    person.officeNumber = 15471727172;

    const result = person.telephoneNumber;

    expect(person.officeAreaCode).toBe('+51');
    expect(person.officeNumber).toBe(15471727172);
    expect(result).toBe('(+51) 15471727172');
  });
});
```

“运行一下测试用例... ok，测试通过了，准备开始重构了。”

“我们先新建一个 `TelephoneNumber` 类，用于分解 `Person` 类所承担的责任。”

```js
class TelephoneNumber {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }

  get areaCode() {
    return this._areaCode;
  }

  get number() {
    return this._number;
  }

  toString() {
    return `(${this._areaCode}) ${this._number}`;
  }
}
```

“这时候，我们再调整一下我们的 `Person` 类，使用新的数据结构。”

```js
class Person {
  constructor(name) {
    this._name = name;
    this._telephoneNumber = new TelephoneNumber();
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return this._telephoneNumber.toString();
  }

  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }

  set officeAreaCode(arg) {
    this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
  }

  get officeNumber() {
    return this._telephoneNumber.number;
  }

  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
  }
}
```

“重构完成，我们运行测试代码。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-10_07-19-54.jpg)

“测试用例运行通过了，别忘了提交代码。”

“在这里我选择新建一个类，而不是简单的记录结构，是因为一旦拥有新的类，你就有机会让程序散发出一种芳香。得到新的类以后，你就可以着手寻找其他坏味道，例如“依恋情节”，这可以帮你指出能够移至新类中的种种行为。这是一种强大的动力：有用的类被创建出来，大量的重复被消除，后续开发得以加速，原来的数据泥团终于在它们的小社会中充分发挥价值。”

“比如这里，`TelephoneNumber` 类被提炼出来后，就可以去消灭那些使用到 `telephoneNumber` 的重复代码，并且根据使用情况进一步优化，我就不做展开了。”

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-37-52.jpg)

“我们继续讲下一个坏味道。”

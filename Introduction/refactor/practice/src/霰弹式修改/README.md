## 霰弹式修改（Shotgun Surgery）

```js
// File Reading.js
const reading = {customer: "ivan", quantity: 10, month: 5, year: 2017};
function acquireReading() { return reading };
function baseRate(month, year) {
    /* */
}

// File 1
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

// File 2
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
function taxThreshold(year) { /* */ }

// File 3
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
```

“接下来要说的就是 `发散式变化` 的反例 —— `霰弹式修改`。这个要找一个软件里的案例需要花点时间，这里我直接拿《重构》原书的一个例子来作讲解。”

“其实这个问题和重复代码有点像，重复代码经常会引起霰弹式修改的问题。”

“像上面的演示代码，如果 `reading` 的部分逻辑发生了改变，对这部分逻辑的修改需要跨越好几个文件调整。”

“如果每遇到某种变化，你都必须在许多不同的类或文件内做出许多小修改，你所面临的坏味道就是霰弹式修改。如果需要修改的代码散布四处，你不但很难找到它们，也很容易错过某个重要的修改。”

“这里我来对这段代码进行重构，由于源代码也不是很完整，这里我只把修改的思路提一下，就不写测试代码了。”老耿开始写代码。

```js
// File Reading.js
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }

  get customer() {
    return this._customer;
  }

  get quantity() {
    return this._quantity;
  }

  get month() {
    return this._month;
  }

  get year() {
    return this._year;
  }

  get baseRate() {
    /* ... */
  }

  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }

  get taxableCharge() {
    return Math.max(0, base - taxThreshold());
  }

  get taxThreshold() {
    /* ... */
  }
}

const reading = new Reading({ customer: 'ivan', quantity: 10, month: 5, year: 2017 });
```

“在修改完成后，所有和 `reading` 相关的逻辑都放在一起管理了，并且我把它组合成一个类以后还有一个好处。那就是类能明确地给这些函数提供一个共用的环境，在对象内部调用这些函数可以少传许多参数，从而简化函数调用，并且这样一个对象也可以更方便地传递给系统的其他部分。”

“如果你们在编码过程中，有遇到我刚才提到的那些问题，那就是一种坏味道。下次就可以用类似的重构手法进行重构了，当然，别忘了写测试用例。”老耿对着小李二人说道。

小李小王疯狂点头。

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-33-15.jpg)

“那我们继续。”
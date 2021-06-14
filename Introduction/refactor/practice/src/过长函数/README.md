## 过长函数（Long Function）

```js
function printOwing(invoice) {
  let outstanding = 0;
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
  // calculate outstanding
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  // record due date
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  //print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
```

“嗯，这个函数看起来是用来打印用户白条信息的。这个函数实现细节和命名方面倒是没有太多问题，但是这里有一个坏味道，那就是 —— 过长的函数。”

“函数越长，就越难理解。而更好的阐释力、更易于分享、更多的选择——都是由小函数来支持的。”

“对于识别这种坏味道，有一个技巧。那就是，如果你需要花时间浏览一段代码才能弄清它到底在干什么，那么就应该将其提炼到一个函数中，并根据它所做的事为其命名。”

“像这个函数就是那种需要花一定时间浏览才能弄清楚在做什么的，不过好在这个函数还有些注释。”

“还是老方法，我们先写两个测试用例。”老耿开始敲代码。

```js
describe('test printOwing', () => {
  let collections = [];
  console.log = message => {
    collections.push(message);
  };

  afterEach(() => {
    collections = [];
  });

  test('printOwing should return correct struct when input correct struct', () => {
    const input = {
      customer: 'jack',
      orders: [{ amount: 102 }, { amount: 82 }, { amount: 87 }, { amount: 128 }]
    };

    printOwing(input);

    expect(collections).toStrictEqual([
      '***********************',
      '**** Customer Owes ****',
      '***********************',
      'name: jack',
      'amount: 399',
      'due: 7/8/2021'
    ]);
  });

  test('printOwing should return correct struct when input correct struct 2', () => {
    const input = {
      customer: 'dove',
      orders: [{ amount: 63 }, { amount: 234 }, { amount: 12 }, { amount: 1351 }]
    };

    printOwing(input);

    expect(collections).toStrictEqual([
      '***********************',
      '**** Customer Owes ****',
      '***********************',
      'name: dove',
      'amount: 1660',
      'due: 7/8/2021'
    ]);
  });
});
```

“测试用例写完以后运行一下。“

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_08-51-58.jpg)

“接下来的提取步骤就很简单了，因为代码本身是有注释的，我们只需要参考注释的节奏来进行提取就好了，依旧是小步慢跑，首先调整函数执行的顺序，将函数分层。”

```js
function printOwing(invoice) {
  // print banner
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');

  // calculate outstanding
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // record due date
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  // print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
```

“进行函数分层后，先运行一遍测试用例，防止调整顺序的过程中，影响了函数功能... ok，测试通过了。”

“被调整顺序后的函数就变得非常简单了，接下来我们分四步提取就可以了”

“第一步，提炼 `printBanner` 函数，然后运行测试用例。”

```js
function printBanner() {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

function printOwing(invoice) {
  printBanner();

  // calculate outstanding
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // record due date
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  // print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
```

“我们在提取的过程中，把注释也去掉了，因为确实不需要了，函数名和注释的内容一样。”

“第二步，提炼 `calOutstanding` 函数 ，然后运行测试用例。”

```js
function printBanner() {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

function calOutstanding(invoice) {
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  return outstanding;
}

function printOwing(invoice) {
  printBanner();

  let outstanding = calOutstanding(invoice);

  // record due date
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  // print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
```

“第三步，提炼 `recordDueDate` 函数，然后运行测试用例。”

```js
function printBanner() {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

function calOutstanding(invoice) {
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  return outstanding;
}

function recordDueDate(invoice) {
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function printOwing(invoice) {
  printBanner();

  let outstanding = calOutstanding(invoice);

  recordDueDate(invoice);

  // print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
```

“第四步，提炼 `printDetails` 函数，然后运行测试用例。”

```js
function printBanner() {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

function calOutstanding(invoice) {
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  return outstanding;
}

function recordDueDate(invoice) {
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}

function printOwing(invoice) {
  printBanner();
  let outstanding = calOutstanding(invoice);
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}
```

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_09-04-52.jpg)

“测试用例通过后，别忘了提交代码。”

“然后我们再来审视一下这个重构后的 `printOwing` 函数，简单的四行代码，清晰的描述了函数所做的事情，这就是小函数的魅力！”

“说到底，让小函数易于理解的关键还是在于良好的命名。如果你能给函数起个好名字，阅读代码的人就可以通过名字了解函数的作用，根本不必去看其中写了些什么。这可以节约大量的时间，也能减少你们结对编程的时间。”老耿面带微笑看着小李和小王。

小李小王相视一笑，觉得有点不好意思。

“我们来看看重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-17-02.jpg)

“我们继续。”老耿马不停蹄。
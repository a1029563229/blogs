## 冗赘的元素（Lazy Element）

```js
function reportLines(aCustomer) {
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomerData(out, aCustomer) {
  out.push(["name", aCustomer.name]);
  out.push(["location", aCustomer.location]);
}
```

“有些函数不能明确的说存在什么问题，但是可以优化。比如这个函数，能给代码增加结构，设计之初可能是为了支持变化、促进复用或者哪怕只是提供更好的名字，但在这里看来真的不需要这层额外的结构。因为，它的名字就跟实现代码看起来一模一样。”

“有些时候也并不完全是因为过度设计，也可能是因为随着重构的进行越变越小，最后只剩了一个函数。”

“这里我直接用内联函数把它优化掉。先写两个测试用例。”老耿开始写代码。

```js
describe('test reportLines', () => {
  test('reportLines should return correct array struct when input aCustomer', () => {
    const input = {
      name: 'jack',
      location: 'tokyo'
    };

    const result = reportLines(input);

    expect(result).toStrictEqual([
      ['name', 'jack'],
      ['location', 'tokyo']
    ]);
  });

  test('reportLines should return correct array struct when input aCustomer', () => {
    const input = {
      name: 'jackli',
      location: 'us'
    };

    const result = reportLines(input);

    expect(result).toStrictEqual([
      ['name', 'jackli'],
      ['location', 'us']
    ]);
  });
});
```

“运行一下测试用例... ok，没有问题，那我们开始重构吧。” 老耿开始写代码。

```js
function reportLines(aCustomer) {
  const lines = [];
  lines.push(["name", aCustomer.name]);
  lines.push(["location", aCustomer.location]);
  return lines;
}
```

“ok，很简单，重构完成了，我们运行测试用例。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-12_08-41-00.jpg)

“用例测试通过了。如果你想再精简一点，可以再修改一下。”

```js
function reportLines(aCustomer) {
  return [
    ['name', aCustomer.name],
    ['location', aCustomer.location]
  ];
}
```

“运行测试用例... 通过了，提交代码。”

“在重构的过程中会发现越来越多可以重构的新结构，就像我刚才演示的那样。”

“像这类的冗赘的元素存在并没有太多的帮助，所以，让它们慷慨赴义去吧。”

“我们来看看重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-51-18.jpg)

“我们继续。”
## 神秘命名（Mysterious Name）

```js
function countOrder(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(basePrice * 0.1, 100);
  return basePrice - quantityDiscount + shipping;
}

const orderPrice = countOrder(order);
```

“上面的这段 `countOrder` 函数是做什么的？看到函数名的第一感觉不太清晰，统计订单？订单商品数量吗？还是统计什么？但是，看到函数内部实现后，我明白了这是个统计订单总价格的函数。这就是其中一个坏味道 —— `神秘命名`，当代码中这样的坏味道多了之后，花在猜谜上的时间就会越来越多了。”

“我们现在来对这段代码进行重构，我们需要先添加单元测试代码。这里我只做演示，写两个测试用例。”

老耿很快针对这段代码，使用著名的 `jest` 框架写出了下面两个测试用例。

```js
describe('test price', () => {
  test('countOrder should return normal price when input correct order quantity < 500', () => {
    const input = {
      quantity: 20,
      itemPrice: 10
    };

    const result = countOrder(input);

    expect(result).toBe(220);
  });

  test('countOrder should return discount price when input correct order quantity > 500', () => {
    const input = {
      quantity: 1000,
      itemPrice: 10
    };

    const result = countOrder(input);

    expect(result).toBe(9850);
  });
});
```

老耿 `运行了一下测试用例`，显示测试通过后，说：“我们有了单元测试后，就可以开始准备重构工作了。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_07-06-24.jpg)

“我们先把 `countOrder` 内部的实现提炼成新函数，命名为 `getPrice`，这个名字不一定是最合适的名字，但是会比之前的要好。”老耿使用 `Ide` 很容易就把这一步完成了。

```js
function getPrice(order) {
    const basePrice = order.quantity * order.itemPrice;
    const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    const shipping = Math.min(basePrice * 0.1, 100);
    return basePrice - quantityDiscount + shipping;
}

function countOrder(order) {
    return getPrice(order);
}

const orderPrice = countOrder(order);
```

“这一步看起来没什么问题，但是我们还是先 `运行一下测试用例`。”老耿按下了执行用例快捷键，用例跑了起来，并且很快就通过了测试。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_07-06-24.jpg)

“这一步说明我们的修改没有问题，下一步我们修改测试用例，将测试用例调用的 `countOrder` 方法都修改为调用 `getPrice` 方法，再次 `运行修改后的测试用例`。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_07-07-52.jpg)

老耿指着修改后的测试用例：“再次运行后，`getPrice` 也通过了测试，那接下来，我们就可以把调用 `countOrder` 方法的地方，都修改为调用 `getPrice` 方法，就像这样。”

```js
function getPrice(order) {
    const basePrice = order.quantity * order.itemPrice;
    const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    const shipping = Math.min(basePrice * 0.1, 100);
    return basePrice - quantityDiscount + shipping;
}

function countOrder(order) {
    return getPrice(order);
}

const orderPrice = getPrice(order);
```

“这时候我们可以看到，编辑器已经提示我们，原来的 `countOrder` 方法没有被使用到，我们可以借助 Ide 直接把这个函数删除掉。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-08_07-11-47.jpg)

“删除后，我们的重构就完成了，新的代码看起来像这样。”

```js
function getPrice(order) {
    const basePrice = order.quantity * order.itemPrice;
    const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    const shipping = Math.min(basePrice * 0.1, 100);
    return basePrice - quantityDiscount + shipping;
}

const orderPrice = getPrice(order);
```

“嗯，这个命名看起来更合适了，一眼看过去就可以知道这是个获取订单价格的函数。如果哪天又想到了更好的名字，用同样的步骤把它替换掉就好了，有单元测试就可以保证你在操作的过程中并不会出错，引发其他的问题。”

“对了，还有最重要的一步。”老耿加重了语气：“记得提交代码！”

老耿用快捷键提交了一个 `Commit` 记录，继续说道：“每一次重构完成都应该提交代码，这样就可以在下一次重构出现问题的时候，迅速回退到上一次正常工作时的状态，这一点很有用！“

大宝补充到：“这样的重构还有个好处，那就是可以保证代码随时都是可发布的状态，因为并没有影响到整体功能的运行。”

“不过想一个合适的好名字确实不容易，耿哥的意思是让我们要持续的小步的进行重构吧。”小王摸着下巴思考说道。

“阿宝和小王说的都对，在不改变软件可观察行为的前提下，持续小步的重构，保证软件随时都处于可发布的状态。这意味着我们随时都可以进行重构，最简单的重构，比如我刚才演示的那种用不了几分钟，而最长的重构也不该超过几小时。”

“我再补充一点。”大宝说道：“我们绝对不能忽视自动化测试，只有自动化测试才能保证在重构的过程中不改变软件可观察行为，这一点看似不起眼，却是最最重要的关键之处。”

“阿宝说的没错，我们至少要保证我们重构的地方有单元测试，且能通过单元测试，才能算作是重构完成。”

老耿稍作停顿后，等待大家理解自己刚才的那段话后，接着说：“看来大家都开始感受到了重构的魅力，我们最后看看这段代码重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-13-23.jpg)

“ok，那我们接着说剩下的坏味道吧。”

## 发散式变化（Divergent Change）

```js
function getPrice(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(basePrice * 0.1, 100);
  return basePrice - quantityDiscount + shipping;
}

const orderPrice = getPrice(order);
```

“这个函数是我们最早重构的函数，它的职责就是计算基础价格 - 数量折扣 + 运费。我们再来看看这个函数，如果基础价格计算规则改变，需要修改这个函数，如果折扣规则发生改变也需要修改这个函数，同理，运费计算规则也会引发它的改变。”

“如果某个模块经常因为不同的原因在不同的方向上发生变化，发散式变化就出现了。”

“测试用例已经有了，所以我们可以直接对函数进行重构。”老耿开始写代码。

```js
function calBasePrice(order) {
    return order.quantity * order.itemPrice;
}

function calDiscount(order) {
    return Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
}

function calShipping(basePrice) {
    return Math.min(basePrice * 0.1, 100);
}

function getPrice(order) {
    return calBasePrice(order) - calDiscount(order) + calShipping(calBasePrice(order));
}

const orderPrice = getPrice(order);
```

“修改完成后，我们运行之前写的测试用例... 测试通过了。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-09_09-04-48.jpg)

“修改之后的三个函数只需要关心自己职责方向的变化就可以了，而不是一个函数关注多个方向的变化。并且，单元测试粒度还可以写的更细一点，这样对排查问题的效率也有很大的提升。”

大宝适时补充了一句：“其实这就是面向对象设计原则中的 `单一职责原则`。”

“阿宝说的没错，keep simple，`每次只关心一个上下文` 这一点一直很重要。”

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-29-53.jpg)

“我们继续。”
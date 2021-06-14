## 过长的消息链（Message Chains）

```js
const result = a(b(c(1, d(f()))));
```

“这种坏味道我手写代码演示一下，比如向一个对象请求另一个对象，然后再向后者请求另一个对象，然后再请求另一个对象……这就是消息链。在实际代码中，看到的可能就是一长串取值函数或一长串临时变量。”

“这种一长串的取值函数，可以使用的重构手法就是 `提炼函数`，就像这样。”

```js
const result = goodNameFunc();

function goodNameFunc() {
  return a(b(c(1, d(f()))));
}
```

“再给提炼出来的函数，取一个好名字就行了。”

“还有一种情况，就是委托关系，需要隐藏委托关系。我就不做展开了，你们有兴趣的话去看一看重构那本书吧。“

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-57-27.jpg)

我们继续下一个。”
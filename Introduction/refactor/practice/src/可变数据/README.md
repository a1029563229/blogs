## 可变数据（Mutable Data）

```js
function merge(target, source) {
  for (const key in source) {
    target[key] = source[key];
  }
  return target;
}
```

“这个函数好像有点古老。”老耿有些疑惑。

“这个是我从之前的仓库 copy 过来的一个工具函数，用来合成对象的，一直没改过。”小王补充道。

“嗯，这个函数的问题是对 `merge` 对象的源对象 `target` 进行了修改，对数据的修改经常导致出乎意料的结果和难以发现的 bug。现在来看程序并没有因为这个函数出现问题，但如果故障只在很罕见的情况下发生，要找出故障原因就会更加困难。”

“先写两个测试用例来进行验证吧。”老耿开始写代码。

```js
describe('test merge', () => {
  test('test merge should return correct struct when merge', () => {
    const baseConfig = {
      url: 'https://api.com',
      code: 'mall'
    };

    const testSpecialConfig = {
      url: 'https://test-api.com',
      code: 'test-mall'
    };

    const result = merge(baseConfig, testSpecialConfig);

    expect(result).toStrictEqual({
      url: 'https://test-api.com',
      code: 'test-mall'
    });
  });

  test('test merge should return original struct when merge', () => {
    const baseConfig = {
      url: 'https://api.com',
      code: 'mall'
    };

    const testSpecialConfig = {
      url: 'https://test-api.com',
      code: 'test-mall'
    };

    merge(baseConfig, testSpecialConfig);

    expect(baseConfig).toStrictEqual({
      url: 'https://api.com',
      code: 'mall'
    });
  });
});
```

“运行一下... 第二个用例报错了。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-09_08-32-59.jpg)

“报错的原因就是因为对源对象进行了修改调整，从而影响了 `baseConfig` 的值。接下来我们调整一下 `merge` 函数就行了，现在 `javascript` 有很简单的方法可以修改这个函数。”

```js
function merge(target, source) {
  return {
    ...target,
    ...source
  }
}
```

“修改完成后，再次运行用例，就可以看到用例运行通过了。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-09_08-38-56.jpg)

“我刚才的重构手法其实有一整个软件开发流派 —— 函数式编程，就是完全建立在“数据永不改变”的概念基础上：如果要更新一个数据结构，就返回一份新的数据副本，旧的数据仍保持不变，这样可以避免很多因数据变化而引发的问题。”

“在刚才介绍全局数据时用到的封装变量的方法，也是对可变数据这种坏味道常见的一种解决方案。还有，如果可变数据的值能在其他地方计算出来，这就是一个特别刺鼻的坏味道。它不仅会造成困扰、bug和加班，而且毫无必要。”

“这里我就不做展开了，如果你们俩感兴趣的话，可以去看看《重构：改善既有代码的设计(第2版)》这本书，我刚才提到的坏味道，书里面都有。”

小李小王奋笔疾书，把书名记了下来。

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-26-45.jpg)

“那我们继续。”
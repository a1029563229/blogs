# Sentry 教程/使用 Sentry 平台处理客户端异常日志

我们的客户端项目会经常遇到记录异常日志的需求，国内有不少成熟的平台都提供了解决方案，今天我们的主角是 `Sentry + Javascript`，它的免费版服务已经可以满足中小项目的实际应用。

- 注册一个账号

进入 [注册页](https://sentry.io/signup/) 注册一个账号，或者使用 `github` 账号登录。

- 选择语言

注册成功后，选择 `Javascript` 语言，点击 `Create Project`。（如下图）

![选择语言](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/sentry/1.png)

- 按照教程引入对应的 `script` 标签
```html
<script src="https://browser.sentry-cdn.com/5.6.3/bundle.min.js" integrity="xxx" crossorigin="anonymous">
</script>
```

- 发送初始化信息
```js
Sentry.init({ dsn: 'xxx' });
```

- 执行一段会抛错的函数
```js
myUndefinedFunction();
```

此时应该依据通过校验，页面会出现一个 `Take me to my event` 的按钮，点击进入。（如下图）

![进入控制台](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/sentry/3.png)


进入以后，在控制台就能看到刚才输出的异常日志已经被记录在了控制台。

![控制台](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/sentry/2.png)

一个简单的 `Sentry` 服务就已经可以使用了！

[原文地址，欢迎 Star](https://github.com/a1029563229/Blogs/tree/master/Introduction/Sentry)
## 全局数据（Global Data）

```js
// global.js
// ...
let userAuthInfo = {
  platform: 'pc',
  token: ''
}

export {
  userAuthInfo
};

// main.js
userAuthInfo.token = localStorage.token;

// request.js
const reply = await login();
userAuthInfo.token = reply.data.token;

// business.js
await request({ authInfo: userAuthInfo });
```

“这个 `global.js` 似乎是用来提供全局数据的，这是最刺鼻的坏味道之一了。”

“这个 `platform` 被全局都使用到了，我可以把它修改为别的值吗？会引发什么问题吗？”老耿问道

小李连忙说：“这个 `platform` 不能改，后端要靠这个字段来选择识别 `token` 的方式，改了就会出问题。”

“但是我现在可以在代码库的任何一个角落都可以修改 `platform` 和 `token`，而且没有任何机制可以探测出到底哪段代码做出了修改，这就是全局数据的问题。”

“每当我们看到可能被各处的代码污染的数据，我们还是需要全局数据用一个函数包装起来，至少你就能看见修改它的地方，并开始控制对它的访问，这里我做个简单的封装，然后再写两个测试用例。”

```js
let userAuthInfo = {
  platform: 'pc',
  token: ''
};

function getUserAuthInfo() {
  return { ...userAuthInfo };
}

function setToken(token) {
  userAuthInfo.token = token;
}

export {
  getUserAuthInfo,
  setToken
}

// main.js
setToken(localStorage.token);

// request.js
const reply = await login();
setToken(reply.data.token);

// business.js
await request({ authInfo: getUserAuthInfo() });
```

“接下来运行一下测试用例。”

```js
describe("test global data", () => {
    test('getUserAuthInfo.platform should return pc when modify reference', () => {
        const userAuthInfo = getUserAuthInfo();
        userAuthInfo.platform = 'app';

        const result = getUserAuthInfo().platform;

        expect(result).toBe('pc');
    });

    test('getUserInfo.token should return test-token when setToken test-token', () => {
       setToken('test-token');

       const result = getUserAuthInfo().token;

       expect(result).toBe('test-token');
    });
});
```

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-09_07-47-18.jpg)

“这样一来，通过对象引用就无法修改源对象了，并且我这里控制了对 `platform` 属性的修改，只开放对 `token` 修改的接口。即便如此，我们还是要尽可能的避免全局数据，因为全局数据是最刺鼻的坏味道之一！”老耿语气加重。

小李小王疯狂点头。

“我们来看一下重构前后的对比。”

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-06-14_09-22-39.jpg)

“那我们继续。”

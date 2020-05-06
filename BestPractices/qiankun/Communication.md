# 基于 qiankun 的微前端最佳实践（图文并茂） - 应用间通信篇

在开始介绍 `qiankun` 的应用通信之前，我们需要先了解微前端架构如何划分子应用？

在微前端架构中，我们应该按业务划分出对应的子应用，而不是通过功能模块划分子应用。这么做的原因有两个：

1. 在微前端架构中，子应用并不是一个模块，而是一个独立的应用，我们将子应用按业务划分可以拥有更好的可维护性和解耦性。
2. 子应用应该具备独立运行的能力，应用间频繁的通信会增加应用的复杂度和耦合度。

综上所述，我们应该从业务的角度出发划分各个子应用，尽可能减少应用间的通信，从而简化整个应用，使得我们的微前端架构可以更加灵活可控。

我们本次教程将介绍两种通信方式，

1. 第一种是 `qiankun` 官方提供的通信方式，适合业务划分清晰，比较简单的微前端应用，一般来说使用第一种方案就可以满足大部分的应用场景需求。
2. 第二种是基于 `redux` 实现的 `shared` 通信方式，适合需要跟踪通信状态，子应用具备独立运行能力，较为复杂的微前端应用。

## 基础通信

我们先介绍官方提供的应用间通信方式，这种通信方式比较适合业务划分清晰，应用间通信较少的微前端应用场景。

### 通信原理

`qiankun` 提供了 `initGlobalState` 用于注册 `AppStateAction` 实例，该实例拥有三个方法，分别是：

- `setGlobalState`：设置 `globalState`，内部将执行 `浅检查`，如果检查到 `globalState` 发生改变则触发通知，通知到所有的 `观察者` 函数。
- `onGlobalStateChange`：设置 `观察者` 函数 - 响应 `globalState` 变化，在 `globalState` 发生改变时触发该 `观察者` 函数。
- `offGlobalStateChange`：取消 `观察者` 函数 - 该实例不再响应 `globalState` 变化。

我们来画一张图来帮助大家理解（见下图）

![qiankun](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun_practice/3.png)

我们从上图可以看出，我们可以先注册 `观察者` 到观察者池中，然后通过修改 `globalState` 可以触发所有的 `观察者` 函数，从而达到组件间通信的效果。

### 使用方式

我们以 [实战案例](https://github.com/a1029563229/micro-front-template) （案例是以 `Vue` 为基座的主应用，接入 `React` 和 `Vue` 两个子应用） 为例，来介绍一下如何使用 `qiankun` 完成应用间的通信功能。

> 建议 `clone` [实战案例](https://github.com/a1029563229/micro-front-template) `feature-communication` 分支代码到本地，运行项目查看实际效果。

#### 主应用的工作

首先，我们在主应用中注册一个 `AppStateAction` 实例并导出，代码实现如下：

```ts
// micro-app-main/src/shared/actions.ts
import { initGlobalState, MicroAppStateActions } from "qiankun";

const initialState = {};
const actions: MicroAppStateActions = initGlobalState(initialState);

export default actions;
```

在注册 `AppStateAction` 实例后，我们在需要通信的组件中注入实例，并注册 `观察者` 函数，我们这里以登录功能为例，实现如下：

```ts
// micro-app-main/src/pages/login/index.vue

import actions from "@/shared/actions";
import { ApiLoginQuickly } from "@/apis";

@Component
export default class Login extends Vue {
  $router!: VueRouter;

  // `mounted` 是 Vue 的生命周期钩子函数，在组件挂载时执行
  mounted() {
    // 注册一个观察者函数
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log("主应用观察者：token 改变前的值为 ", prevState.token);
      console.log("主应用观察者：登录状态发生改变，改变后的 token 的值为 ", state.token);
    });
  }
  
  async login() {
    // ApiLoginQuickly 是一个远程登录函数，用于获取 token，详见 Demo
    const result = await ApiLoginQuickly();
    const { token } = result.data.loginQuickly;

    actions.setGlobalState({ token });
  }
}
```

在上面的代码中，我们在 Vue 的 `mounted` 生命周期钩子函数中注册了一个观察者函数，然后定义了一个 `login` 方法，最后将 `login` 方法绑定在下图的按钮中（见下图）。

![qiankun](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/7.png)

此时我们点击 `2` 次按钮，将触发我们在主应用设置的观察者函数（如下图）

![qiankun](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/8.png)

从上图中我们可以看出，第一次点击时 `token` 值为 `undefined`，而第二次点击时 `token` 的值是我们上一次设置的值，最终 `token` 变成了我们最后一次设置的值，`globalState` 更新成功！

我们在 `login` 方法最后加上一行代码，让我们在登录后跳转到主页，代码实现如下：

```ts
async login() {
  //...

  this.$router.push("/");
}
```

#### 子应用的工作

我们已经完成了主应用的登录功能，将 `token` 信息记录在了 `globalState` 中。现在我们进入子应用，使用 `token` 获取用户信息并展示在页面中。

我们首先来改造我们的 `Vue` 子应用，首先我们设置一个 `Actions` 实例，代码实现如下：

```js
// micro-app-main/src/shared/actions.js

function emptyAction() {
  // 警告：提示当前使用的是空 Action
  console.warn("Current execute action is empty!");
}

class Actions {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction
  };
  
  /**
   * 设置 actions
   */
  setActions(actions) {
    this.actions = actions;
  }

  /**
   * 映射
   */
  onGlobalStateChange(...args) {
    return this.actions.onGlobalStateChange(...args);
  }

  /**
   * 映射
   */
  setGlobalState(...args) {
    return this.actions.setGlobalState(...args);
  }
}

const actions = new Actions();
export default actions;
```

我们创建 `actions` 实例后，我们需要为其注入真实 `Actions`。我们在入口文件 `main.js` 的 `render` 函数中注入，代码实现如下：

```js
// micro-app-main/src/main.js

//...

/**
 * 渲染函数
 * 主应用生命周期钩子中运行/子应用单独启动时运行
 */
function render(props) {
  if (props) {
    // 注入 actions 实例
    actions.setActions(props);
  }

  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? "/vue" : "/",
    mode: "history",
    routes,
  });

  // 挂载应用
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
}
```

从上面的代码可以看出，我们在挂载子应用时将会调用 `render` 方法，在 `render` 方法中将主应用的 `actions` 实例注入，赋予子应用 `actions` 管理状态池的能力。

最后我们在子应用的 `通讯页` 获取状态池中的 `token`，使用 `token` 获取用户信息，最后在页面中显示用户信息。代码实现如下：

```js
// 引入 actions 实例
import actions from "@/shared/actions";
import { ApiGetUserInfo } from "@/apis";

export default {
  name: "Communication",

  data() {
    return {
      userInfo: {}
    };
  },

  mounted() {
    // 添加观察者
    // onGlobalStateChange 第二个入参为 true，代表立即执行一次观察者函数
    actions.onGlobalStateChange(state => {
      const { token } = state;
      // 未登录 - 返回主页
      if (!token) {
        this.$message.error("未检测到登录信息！");
        return this.$router.push("/");
      }

      // 获取用户信息
      this.getUserInfo(token);
    }, true);
  },

  methods: {
    async getUserInfo(token) {
      // ApiGetUserInfo 是用于获取用户信息的函数
      const result = await ApiGetUserInfo(token);
      this.userInfo = result.data.getUserInfo;
    }
  }
};
```

从上面的代码可以看到，我们在组件挂载时添加了一个 `观察者` 函数并立即执行，执行后将从 `globalState` 状态池中获取 `token`。获取 `token` 成功后，将会使用 `token` 获取用户信息，最终渲染在页面中。

我们从登录页面点击 `Login` 按钮后，通过菜单进入 `Vue 通讯页`，就可以看到效果啦！（见下图）

![qiankun](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/9.png)

`React` 的实现也是类似的，实现代码可以参照 [完整 Demo - feature-communication 分支](https://github.com/a1029563229/micro-front-template)，实现效果如下（见下图）

![qiankun](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/10.png)

### 小结

到这里，`基础通信` 就完成了！

我们在主应用中实现了登录功能，登录拿到 `token` 后存入 `globalState` 状态池中。在进入子应用时，我们使用 `actions` 获取 `token`，再使用 `token` 获取到用户信息，完成页面数据渲染！

最后我们画一张图帮助大家理解这个流程（见下图）。

![qiankun](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/11.png)

## `Shared` 通信

官方提供的通信方案是通过状态池通信，该通信方式适合大部分的场景。

该通信方式也存在一些优缺点，优点如下：
  1. 使用简单；
  2. 官方支持性高；
  3. 适合通信场景较少的业务；

缺点如下：
  1. 子应用独立运行时，没有状态池，可能会导致一些无法意料的问题；
  2. 子应用需要了解状态池的细节，以避免发生协作问题；
  3. 由于状态池无法跟踪，通信场景较多时，维护成本较高；

> 在 `Actions` 通信方案满足需求时，使用官方提供的方案可以得到更好的支持。

如果你的应用通信场景较多，子应用需要独立运行，希望主应用更好的管理子应用，那么可以考虑 `Shared` 通信方案。

### 通信原理


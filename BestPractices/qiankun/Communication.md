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

### 实战教程

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
// micro-app-main/src/pages/communication/index.vue

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

> 由于 `Shared` 方案实现起来会较为复杂，所以当 `Actions` 通信方案满足需求时，使用官方提供的 `Actions` 通信方案可以得到更好的支持。

官方提供的 `Actions` 通信方案是通过状态池通信，该通信方式适合大部分的场景。

该通信方式也存在一些优缺点，优点如下：
  1. 使用简单；
  2. 官方支持性高；
  3. 适合通信较少的业务场景；

缺点如下：
  1. 子应用独立运行时，可能会导致一些无法意料的问题（如上面的那个例子）；
  2. 子应用需要了解状态池的细节，以避免发生协作问题；
  3. 由于状态池无法跟踪，通信场景较多时，维护成本较高；

如果你的应用通信场景较多，子应用需要独立运行，希望主应用更好的管理子应用，那么可以考虑 `Shared` 通信方案。

### 通信原理

主应用基于 `redux` 维护一个状态池，通过 `shared` 暴露一些方法给子应用使用。子应用需要单独维护一份 `shared` 实例，在嵌入主应用时该 `shared` 实例将会被主应用重载，这样可以保证在使用和表现上都没有差异。

`shared` 通信需要自行维护状态池，这样会增加项目维护的复杂度，好处是可以使用市面上比较成熟的状态管理工具，如 `redux`、`mobx`，可以有更好的状态管理追踪。

`shared` 通信要求父子应用都各自维护一份属于自己的 `shared` 实例，同样会增加项目的复杂度。与此同时，这样做的好处就是子应用可以独立于父应用运行（不依赖状态池），子应用也可以最小的改动被嵌入到第三方应用中。

`shared` 通信也可以帮助主应用更好的管控子应用，主应用的 `shared` 相对于子应用来说是一个黑箱。子应用只需要了解 `shared` 所暴露的 `API` 而无需关心实现细节，并且子应用只可以通过 `shared` 来操作状态池，可以避免子应用对状态池随意操作，产生不可预料的“副作用”。

### 实战教程

我们还是以 [实战案例 - feature-communication-shared 分支](https://github.com/a1029563229/micro-front-template) 的 `登录流程` 为例，给大家展示如何使用 `shared` 进行应用间通信。

#### 主应用的工作

首先我们需要在主应用中创建 `store` 用于管理全局状态池，这里我们使用 `redux` 来实现，代码实现如下：

```ts
// micro-app-main/src/shared/store.ts

import { createStore } from "redux";

export type State = {
  token?: string;
};

type Action = {
  type: string;
  payload: any;
};

const reducer = (state: State = {}, action: Action): State => {
  switch (action.type) {
    default:
      return state;
    // 设置 Token
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
  }
};

const store = createStore<State, Action, unknown, unknown>(reducer);

export default store;
```

从上面可以看出，我们使用 `redux` 创建了一个全局状态池，并设置了一个 `reducer` 用于修改 `token` 的值。接下来我们需要实现主应用的 `shared` 实例，代码实现如下：

```ts
// micro-app-main/src/shared/index.ts

import store from "./store";

class Shared {
  /**
   * 获取 Token
   */
  public getToken(): string {
    const state = store.getState();
    return state.token || "";
  }

  /**
   * 设置 Token
   */
  public setToken(token: string): void {
    // 将 token 的值记录在 store 中
    store.dispatch({
      type: "SET_TOKEN",
      payload: token
    });
  }
}

const shared = new Shared();
export default shared;
```

从上面实现可以看出，我们的 `shared` 实现非常简单，`shared` 实例包括两个方法 `getToken` 和 `setToken` 分别用于获取 `token` 和设置 `token`。接下来我们还需要对我们的 `登录组件` 进行改造，将 `login` 方法修改一下，修改如下：

```ts
// micro-app-main/src/pages/login/index.vue

// ...
async login() {
  // ApiLoginQuickly 是一个远程登录函数，用于获取 token，详见 Demo
  const result = await ApiLoginQuickly();
  const { token } = result.data.loginQuickly;

  // 使用 shared 的 setToken 记录 token
  shared.setToken(token);
  this.$router.push("/");
}
```

从上面可以看出，在登录成功后，我们将通过 `shared.setToken` 方法将 `token` 记录在 `store` 中。

最后，我们需要将 `shared` 实例通过 `props` 传递给子应用，代码实现如下：

```ts
// micro-app-main/src/micro/apps.ts

import shared from "@/shared";

const apps = [
  {
    name: "ReactMicroApp",
    entry: "//localhost:10100",
    container: "#frame",
    activeRule: "/react",
    // 通过 props 将 shared 传递给子应用
    props: { shared },
  },
  {
    name: "VueMicroApp",
    entry: "//localhost:10200",
    container: "#frame",
    activeRule: "/vue",
    // 通过 props 将 shared 传递给子应用
    props: { shared },
  },
];

export default apps;
```

#### 子应用的工作

我们刚才提到，我们希望子应用有独立运行的能力，所以子应用也应该实现 `shared`，以便在独立运行时可以拥有兼容处理能力。代码实现如下：

```js
// micro-app-main/src/shared/index.js

class Shared {
  /**
   * 获取 Token
   */
  getToken() {
    // 子应用独立运行时，在 localStorage 中获取 token
    return localStorage.getItem("token") || "";
  }

  /**
   * 设置 Token
   */
  setToken(token) {
    // 子应用独立运行时，在 localStorage 中设置 token
    localStorage.setItem("token", token);
  }
}

class SharedModule {
  static shared = new Shared();

  /**
   * 重载 shared
   */
  static overloadShared(shared) {
    SharedModule.shared = shared;
  }

  /**
   * 获取 shared 实例
   */
  static getShared() {
    return SharedModule.shared;
  }
}

export default SharedModule;
```

从上面我们可以看到两个类，我们来分析一下其用处：
  - `Shared`：子应用自身的 `shared`，子应用独立运行时将使用该 `shared`；
  - `SharedModule`：用于管理 `shared`，例如重载 `shared`、获取 `shared` 等等；

我们实现了子应用的 `shared` 后，我们需要在入口文件处注入 `shared`，代码实现如下：


```js
// micro-app-main/src/main.js

//...

/**
 * 渲染函数
 * 主应用生命周期钩子中运行/子应用单独启动时运行
 */
function render(props = {}) {
  // 当传入的 shared 为空时，使用子应用自身的 shared
  // 当传入的 shared 不为空时，主应用传入的 shared 将会重载子应用的 shared
  const { shared = SharedModule.getShared() } = props;
  SharedModule.overloadShared(shared);

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

从上面可以看出，我们在 `props` 的 `shared` 字段不为空时，将会使用传入的 `shared` 重载子应用自身的 `shared`。这样做的好处是调用方并不需要关注 `shared` 的实现细节，无论是主应用的 `shared` 或是子应用的 `shared` 在使用时的表现是一致的。

然后我们修改子应用的 `通讯页`，使用 `shared` 实例获取 `token`，代码实现如下：

```js
// micro-app-main/src/pages/communication/index.vue

// 引入 SharedModule
import SharedModule from "@/shared";
import { ApiGetUserInfo } from "@/apis";

export default {
  name: "Communication",

  data() {
    return {
      userInfo: {}
    };
  },

  mounted() {
    const shared = SharedModule.getShared();
    // 使用 shared 获取 token
    const token = shared.getToken();

    // 未登录 - 返回主页
    if (!token) {
      this.$message.error("未检测到登录信息！");
      return this.$router.push("/");
    }

    this.getUserInfo(token);
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

最后我们打开页面，看看在主应用中运行和独立运行时的表现吧！（见下图）

![qiankun](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/12.png)

![qiankun](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/13.png)

从上图 1 可以看出，我们在主应用中运行子应用时，`shared` 实例是主应用的 `shared`，登录后可以在状态池中获取到 `token`，并且使用 `token` 成功获取了用户信息。

从上图 2 可以看出，在我们独立运行子应用时，`shared` 实例是子应用自身的 `shared`，在 `localStorage` 中无法获取到 `token`

这样一来，我们就完成了 `shared` 通信啦！

### 小结

我们从上面的案例也可以看出 `shared` 通信的优缺点，这里也做一些简单的分析：
  
  优点有这些：
  - 可以自由选择状态管理库，更好的开发体验。 - 比如 `redux` 有专门配套的开发工具可以跟踪状态的变化。
  - 子应用无需了解主应用的状态池实现细节，只需要了解 `shared` 的函数抽象，实现一套自身的 `shared` 甚至空 `shared` 即可，可以更好的规范子应用开发。
  - 子应用无法随意污染主应用的状态池，只能通过主应用暴露的 `shared` 实例的特定方法操作状态池，从而避免状态池污染产生的问题。
  - 子应用将具备独立运行的能力，`shared` 通信使得父子应用有了更好的解耦性。

  缺点也有两个：
  - 主应用需要单独维护一套状态池，会增加维护成本和项目复杂度；
  - 子应用需要单独维护一份 `shared` 实例，会增加维护成本；

`shared` 通信方式也是有利有弊，更高的维护成本带来的是应用的健壮性和可维护性。

最后我们来画一张图对 `shared` 通信的流程进行解析（见下图）


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

- `setGlobalState`：设置 `state`，内部将执行 `浅检查`，如果检查到 `state` 发生改变则触发通知，通知到所有的 `观察者` 函数。
- `onGlobalStateChange`：设置 `观察者` 函数 - 响应 `state` 变化，在 `state` 发生改变时触发该 `观察者` 函数。
- `offGlobalStateChange`：取消 `观察者` 函数 - 该实例不再响应 `state` 变化。

我们来画一张图来帮助大家理解（见下图）

![qiankun](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun_practice/3.png)

我们从上图可以看出，我们可以先注册 `观察者` 到观察者池中，然后通过修改 `state` 可以触发所有的 `观察者` 函数，从而达到组件间通信的效果。

### 使用方式

我们以 [实战案例](https://github.com/a1029563229/micro-front-template) 为例，来介绍一下如何使用 `qiankun` 完成应用间的通信功能。

> 建议 `clone` [实战案例](https://github.com/a1029563229/micro-front-template) `feature-communication-1` 分支代码到本地，运行项目查看实际效果。

#### 主应用的工作

首先，我们在主应用中注册一个 `AppStateAction` 实例并导出，代码实现如下：

```js
// src/shared/actions.js
import { initGlobalState } from "qiankun";

const initialState = {};
const actions = initGlobalState(initialState);

export default actions;
```

在注册 `AppStateAction` 实例后，我们在需要通信的组件中注入实例，并注册 `观察者` 函数，我们这里以登录功能为例，实现如下：

```js
// src/pages/login/index.vue

import actions from "@/shared/actions.js";
import axios from "@/axios";

export default {
  //...

  // Vue 的生命周期钩子函数，在组件挂载时执行
  mounted() {
    // 注册一个观察者函数
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      const { token } = state;
      console.log("登录状态发生改变，token 的值为 "，token);
    });
  },

  methods: {
    login() {
      actions.setGlobalState({ token: `${Date.now()}` });
    }
  }
}
```

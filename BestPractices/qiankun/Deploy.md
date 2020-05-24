# 基于 qiankun 的微前端最佳实践（万字长文） - 部署发布篇

![micro-app](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun/40.png)

## 写在开头

微前端系列文章：

- [基于 qiankun 的微前端最佳实践（万字长文） - 从 0 到 1 篇](https://github.com/a1029563229/Blogs/tree/master/BestPractices/qiankun/Start.md)
+ [基于 qiankun 的微前端最佳实践（万字长文） - 部署发布篇](https://github.com/a1029563229/Blogs/tree/master/BestPractices/qiankun/Deploy.md)
- [基于 qiankun 的微前端最佳实践（图文并茂） - 应用间通信篇](https://github.com/a1029563229/Blogs/tree/master/BestPractices/qiankun/Communication.md)
- [万字长文+图文并茂+全面解析微前端框架 qiankun 源码 - qiankun 篇](https://github.com/a1029563229/Blogs/tree/master/Source-Code/qiankun/1.md)

本系列其他文章计划一到两个月内完成，点个 `关注` 不迷路。

计划如下：

 - 生命周期篇；
 - IE 兼容篇；
 - 性能优化、缓存方案篇；

## 引言

大家好~

本文是基于 `qiankun` 的微前端最佳实践系列文章之 `部署发布篇`，本文将分享基于 `qiankun` 的微前端架构如何进行打包、部署发布。

本教程采用 `qiankun` 完成主应用与多个微应用之间的联接，在部署发布时与普通的 `Web` 应用并没有太大区别。所以，本文章不仅是对 `qiankun` 微前端架构的部署发布教程，也是对 `Web` 应用部署发布的一个入门。本文将介绍下面这些部署发布方案（见下图）

本教程将结合 [实战案例](https://github.com/a1029563229/micro-front-template) 的多个分支（分支说明在后面介绍)，完成 `qiankun` 微应用架构的部署发布。

最终，我们将在服务器上部署我们微前端应用，就像是 [实战案例 - 线上演示](https://github.com/a1029563229/micro-front-template) 一样，效果图如下（见下图）：


> 注意：
> 
> 保证 `Web` 应用的高可用性需要专业的服务器运维知识，本文对这方面知识不会有太多讨论。
> 
> 主要是因为这不属于前端开发人员的主要工作，二来这些知识对前端人员来说这有些难度，有需要的童鞋可以自己去了解。

## 概述

本文首先从应用的构建打包开始，介绍不同技术栈的构建打包方法：

  1. 主应用的构建打包；
  2. `Vue` 微应用的构建打包；
  3. `React` 微应用的构建打包；
  4. `Angular` 微应用的构建打包；
  5. `Static（无脚手架）` 微应用的构建打包；

介绍完不同技术栈的构建打包方法后，我们会先介绍如何使用 `Node` 部署发布，然后再介绍其他多种部署发布方案：
  
  1. `Node` 服务器部署发布 - 基础方案；
  2. `Go + Docker` 服务器部署发布 - 极简方案；
  3. `Caddy + Go + Docker` 服务器部署发布 - 反向代理方案；
  4. `Nginx + Go + Docker` 服务器部署发布 - 反向代理方案；
  5. `K8S + Caddy + Go + Docker` 服务器部署发布 - 高可用方案：

> 选择 `Node` 作为第一个部署方案是因为前端人员对 `Node` 比较熟悉，希望通过 `Node` 帮助大家理解服务器的基本运作原理。

部署发布方案各有千秋，本文章也会在后面介绍各个部署方案的优缺点，大家可以根据自己的实际需求进行选择。

## 应用构建打包

首先，我们结合 [实战案例 - feature-deploy-node 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy-node) 来介绍主应用和微应用的构建打包方法。

我们首先在根目录下新建目录 `deployed`，用于放置我们各个应用构建打包后的文件，接下来我们就可以开始各个应用的构建打包了。

### 主应用构建打包

我们以 [实战案例 - feature-deploy-node 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy-node) 为例，在主应用构建打包前，我们需要先设置环境变量，在生产环境时加载 `真实域名` 的微应用。

我们在 `micro-app-main/src` 目录下新建 `config` 目录，用于存放我们不同环境的配置文件，代码实现如下：

```json
// micro-app-main/src/config/config.json
{
  // 本地开发配置
  "development": {
    "REACT_MICRO_APP": "//localhost:10100",
    "VUE_MICRO_APP": "//localhost:10200",
    "ANGULAR_MICRO_APP": "//localhost:10300",
    "STATIC_MICRO_APP": "//localhost:10400"
  },
  // 生产环境配置
  "production": {
    "REACT_MICRO_APP": "//react.micro-app-front.com",
    "VUE_MICRO_APP": "//vue.micro-app-front.com",
    "ANGULAR_MICRO_APP": "//angular.micro-app-front.com",
    "STATIC_MICRO_APP": "//static.micro-app-front.com"
  }
}
```

我们在配置好了两个环境的微应用地址配置后，我们将其导出，代码实现如下：

```ts
// micro-app-main/src/config/index.ts
import envConfig from "./config.json";

type Config = {
  REACT_MICRO_APP: string;
  VUE_MICRO_APP: string;
  ANGULAR_MICRO_APP: string;
  STATIC_MICRO_APP: string;
};

// 使用 NODE_ENV 区分不同环境，默认值为 development
const ENV = process.env.NODE_ENV || "development";
const config: Config = (<any>envConfig)[ENV];

// 导出当前环境的配置，默认为 dev 环境
export default config;
```

从上面的配置文件我们可以看出，我们配置了 `development` 和 `production` 两个环境加载的微应用地址，在 `index.ts` 中通过 `NODE_ENV` 区分不同环境，最终将配置信息导出。

最后，我们需要在微应用注册信息中，将我们加载微应用的地址换成我们配置的地址，代码实现如下：

```ts
// micro-app-main/src/micro/apps.ts
import config from "@/config";

const {
  REACT_MICRO_APP,
  VUE_MICRO_APP,
  ANGULAR_MICRO_APP,
  STATIC_MICRO_APP,
} = config;

const apps = [
  /**
   * name: 微应用名称 - 具有唯一性
   * entry: 微应用入口 - 通过该地址加载微应用，这里我们使用 config 配置
   * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
   * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
   */
  {
    name: "ReactMicroApp",
    entry: REACT_MICRO_APP,
    container: "#frame",
    activeRule: "/react",
  },
  {
    name: "VueMicroApp",
    entry: VUE_MICRO_APP,
    container: "#frame",
    activeRule: "/vue",
  },
  {
    name: "AngularMicroApp",
    entry: ANGULAR_MICRO_APP,
    container: "#frame",
    activeRule: "/angular",
  },
  {
    name: "StaticMicroApp",
    entry: STATIC_MICRO_APP,
    container: "#frame",
    activeRule: "/static",
  },
];

export default apps;
```

在配置完成后，我们在命令行运行如下命令，将主应用构建打包：

```bash
yarn build
```

> 主应用是使用 `vue-cli` 脚手架搭建的 `Vue` 应用，`yarn build` 是默认配置的打包命令。

在构建打包完成后，我们将构建好的 `dist` 目录移动到根目录下的 `deployed` 目录下，并重命名为 `micro-app-main`，目录结构如下（见下图）

![micro](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun_practice/44.png)

到这里，我们的主应用就构建打包好了，接下来我们介绍各个技术栈的微应用构建打包过程。

### `Vue` 微应用构建打包

我们以 [实战案例 - feature-deploy-node 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy-node) 为例，我们进入到 `micro-app-vue` 目录，直接使用 `vue-cli` 官方的打包命令构建打包即可，在命令行运行：

```bash
yarn build
```

在构建打包完成后，我们将构建好的 `dist` 目录移动到根目录下的 `deployed` 目录下，并重命名为 `micro-app-vue`，目录结构如下（见下图）

![micro](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun_practice/45.png)

到这里，我们的 `Vue` 微应用构建打包就完成啦！

### `React` 微应用构建打包

我们以 [实战案例 - feature-deploy-node 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy-node) 为例，我们进入到 `micro-app-react` 目录，直接使用打包命令构建打包即可，在命令行运行：

```bash
yarn build
```

在构建打包完成后，我们将构建好的 `build` 目录移动到根目录下的 `deployed` 目录下，并重命名为 `micro-app-react`，目录结构如下（见下图）

![micro](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun_practice/46.png)

到这里，我们的 `React` 微应用构建打包就完成啦！

### `Angular` 微应用构建打包

我们以 [实战案例 - feature-deploy-node 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy-node) 为例，我们进入到 `micro-app-angular` 目录，直接使用打包命令构建打包即可，在命令行运行：

```bash
yarn build
```

在构建打包完成后，我们将构建好的 `dist/micro-app-angular` 目录移动到根目录下的 `deployed` 目录下，目录结构如下（见下图）

![micro](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun_practice/47.png)

到这里，我们的 `Angular` 微应用构建打包就完成啦！

### `Static` 微应用构建打包

我们以 [实战案例 - feature-deploy-node 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy-node) 为例，由于 `Static` 微应用没有使用脚手架，所以我们直接将 `static` 目录移动到根目录下的 `deployed` 目录下，并重命名为 `micro-app-static`，目录结构如下（见下图）

![micro](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun_practice/48.png)

## `Node` 服务器部署方案

在将我们的主应用和微应用全部打包完成后，我们将介绍如何使用 `Nodejs` 完成微前端架构的部署。

## 总结

本文还在编辑中，如果对发布部署这块的需求比较紧急，可以参照 [实战案例 - feature-deploy-node 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy-node) 的 `deployed` 目录下的 `Caddy` 部署方案和 [Caddy 实战教程](https://github.com/a1029563229/Blogs/tree/master/BestPractices/caddy) 来进行部署。
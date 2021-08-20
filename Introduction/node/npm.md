# 浅谈 npm、cnpm、yarn

npm 是 Node.js 标准的软件包管理器，本文将针对 `npm` 机制进行浅谈，并对比 `npm` 与 `cnpm、yarn` 的区别。

## 如何安装单个 npm 包

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-07-13_12-23-08.jpg)

dependencies 和 devDependencies 的区别在普通的前端项目中体现不明显。

在普通的前端项目，如 `vue` 框架中，这两者主要是明确在项目代码中，实际上用到了哪些依赖包。

而只有安装两者，程序才能跑起来（因为 devDependencies 一般会包含程序的运行环境依赖）。

在纯 `node` 项目中则不同，下面可以看一个 node 项目的依赖配置。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-07-13_12-47-37.jpg)

这个 `node` 项目，只安装 `dependencies` 就可以运行项目了（通过 `NODE_ENV=production npm i`）。而安装了 `devDependencies` 后，就会让编辑器的 `eslint` 检测插件开始工作，或者是可以用 `jest` 进行单元测试。

这个是真正意义上的开发环境与生产环境分离。

> npm install 默认会安装依赖包的 dependencies 字段和 devDependencies 字段中的所有模块。
> 
> NODE_ENV=production npm i 时，只会安装依赖包中的 dependencies 模块。
> 
> 开发某些第三包时，需要关注这一点，把项目运行所依赖的包都放在 `dependencies` 中。
> 
> 也不要把一些乱七八糟的包都放进去，这样你的包会变得很大。

### 如何使用或执行 npm 安装的软件包

比如 `eslint`，全局执行的话，会生成一个全局命令。

但是，有些命令包我只想在某个项目中安装使用，怎么做。

加上 `npx` 即可，例如 `npx eslint`，`npx` 首先会寻找项目中已经安装的包，再寻找全局安装的包，如果都没有找到的话，`npx` 会先安装这个包，然后再执行命令。

## package.json 和 package-lock.json

### 版本系统与 package.json

`npm` 遵循语义版本控制标准。

1. 什么是语义版本控制标准？

简单地说：

`1.5.4` 是版本号，其中

- 1 是主版本号，代表的是不兼容的 API 修改
- 5 是次版本号，代表的是向下兼容的功能性新增
- 4 是修订号，代表的是向下兼容的问题修正

案例1：

如果在 `1.0.0` 中，提供了 `main.any` 方法，而在新版本中删除了这个方法，那么你应该发布 `2.0.0` 版本。

如果一个包经常发布原先版本不兼容的大版本，那么这个库应该反思一下，不然的话估计很快就会凉凉。

案例2：

如果在 `1.0.0` 中，提供了 `main.any` 方法，而在新版本中新增了 `main` 方法，效果与 `main.any` 一样，那么你应该发布 `1.1.0` 版本，`main` 属于次版本中新增的方法。

案例3：

如果在 `1.0.0` 中，提供了 `main.any` 方法，在新版本中修复了该方法的部分场景下的 `bug`，并且确保单元测试已经覆盖所有场景，那么你应该发布 `1.0.1` 版本，修复该问题。

如果你不确定修改此 `bug` 后，是否会引发部分场景的行为不一致，那么你应该发布 `1.1.0`，部分没有遇到原场景 `bug` 并且只更新修订版本号的用户就可以避开这个问题。

2. 在 `package.json` 中，如何配置第三方包的版本？

`Semver` 规范：

- 如果写入的是 〜0.13.0，则只更新补丁版本：即 0.13.1 可以，但 0.14.0 不可以。
- 如果写入的是 ^0.13.0，则要更新补丁版本和次版本：即 0.13.1、0.14.0、依此类推。
- 如果写入的是 0.13.0，则始终使用确切的版本。
- 还有更多规则，比如：`>`、`>=`、`||`，不过也应该不怎么常用，就不展开介绍了。

以 `vue` 脚手架为例，生成的项目依赖是这样的：

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-07-13_14-30-35.jpg)

可以看出，脚手架相关的库都使用了只更新补丁的模式；而其他的包都选择更新次版本号的功能，从而引入一些向下兼容的最新特性或是优化功能。

因此，只通过 `package.json` 的话，原始的项目和新初始化的项目（很大概率）实际上是不同的。

即使是补丁版本或次版本不应该引入重大的更改，但还是可能引入缺陷（你没法确定你使用的每一个第三方包的更新具体干了什么）。

### 锁定版本与 package-lock.json

npm@5 版本后，推出了 `package-lock.json` 机制。

`package-lock.json` 会固化当前安装的每个软件包的版本，当运行 npm install时，npm 会使用这些确切的版本。

以 `vue` 举例，在 `package.json` 中是 `^2.6.11` 版本，而在实际安装过程中，安装了 `2.6.14` 版本，并且在 `package-lock.json` 文件中，将版本锁定在了 `2.6.14`。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-07-13_14-33-54.jpg)

在 `package-lock.json` 锁定版本后，将此文件留在 `git` 仓库中，就可以保证原始的项目和新初始化的项目安装的依赖是一致的。

如果想要更新 `package-lock` 中锁定的版本，则使用 `npm update` 命令（此命令不会更新主版本），可以在遵循 `semver` 标准的前提下，更新依赖包，并且更新 `package-lock` 锁定的版本到最新版本（依旧锁定）。

为啥 `package-lock.json` 文件比 `package.json` 包大那么多？

因为 `package-lock.json` 不仅锁定了项目中的依赖包，还把依赖包的依赖都用套娃的方式锁住了，所以整个文件会非常大。

这里会引发另一个问题，那就是 `npm update` 时，会把依赖包的依赖都升级。对于一个稳定运行很久的项目来说，风险还是比较大的，建议还是升级某个特定的包（`npm i xx@version`）。

> 有了 `package-lock.json` 后，`package.json` 的版本更新规则就不生效了，会优先读取 `package-lock.json` 中锁定的包版本进行安装，保证你的代码库能顺利运行，不会因为依赖包频繁更新而频繁引发问题。

想知道自己的包离最新的包差几个版本的话，输入 `npm outdated` 命令：

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-07-13_15-02-53.jpg)

`Latest` 是这个包的最新大版本，`Wanted` 是这个包当前大版本下的最新小版本。

### 想知道实际安装的包版本

1. 笨方法：去 `node_modules` 里面找。
2. 聪明一点：去 `package-lock.json` 里面找，因为里面已经锁了实际安装的版本。
3. 用 `npm list --depth=0` 看整个项目的依赖包版本。
4. `npm view [package_name] version`

在实际使用中，3 和 4 的命令不经常用的话，容易忘记。我之前比较常用的是第一种笨方法，以后会用第二种方法，明显方便地多。

## yarn 和 npm

1. 依赖版本

早期的时候 `yarn` 有 `yarn.lock` 来锁定版本，这一点上比 `package.json` 要强很多，而后面 `npm` 也推出了 `package-lock.json`，所以这一点上已经没太多差异了。

2. 安装速度

`yarn` 感觉要比 `npm` 快很多，这是因为 `yarn` 采用并行安装依赖的方式，而 `npm` 是串行。

在缓存机制上，目前差异性并不是很大，都会读取本地缓存。

3. 用哪个？

目前 2021 年，`yarn` 的安装速度还是比 `npm` 快，其他地方的差异并不大，基本上可以忽略，用哪个都行。

> 安装依赖太快了也不一定就好，有时候，安装速度慢一点，还能喝杯茶点根烟，休息一下。

> 在设计上， `yarn` 的输入会比 `npm` 更符合人体工学一点。

> 但是以公司的网络情况来看，很多人都会用 `cnpm`。

## cnpm 和 npm

1. cnpm 比 npm 快多了

因为 cnpm 的镜像仓库在国内（淘宝机房），比 `npm` 当然快多了。不过现在 `npm` 加了缓存机制，速度也跟上来了。（除了 `node-sass` 这个玩意）

而还有部分依赖包，内部就调用了 `npm install`，所以...还是慢。

> 你也可以将 `npm` 的镜像源设置为 `淘宝镜像`，这样也会快上不少。

`npm config set registry http://registry.npm.taobao.org`

2. cnpm 没有 package-lock.json

这可能是个很坑的地方，`cnpm` 安装时不会产生 `package-lock.json`，并且项目中即使有 `package-lock.json`，`cnpm` 也是不管不顾的，只读取 `package.json`。

这个机制可能就会导致你代码中的依赖库需要在 `package.json` 中就锁住，不然的话...在某一天，`cnpm` 就可能会把你坑了。

这估计是使用 `cnpm` 最大的隐患。

3. 关于第二点，作者的回应

关于这一点，`cnpm` 作者的回应是，现在不支持，以后也不考虑支持。

作者提到，如果锁了版本，很多隐藏的 `bug` 可能很难被修复，可能会成为某个 `bug` 的受害者。

对于依赖版本可能多个环境不一致，作者给出的答复是对整条运维发布体系进行调整，比如在多个环境 `cnpm` 验证后，再发布到生产。（对于作者的这个方案，我觉得不太靠谱，主要是成本和收益不成正比，不是每一个前端都有这么大的能量的）

作者又说，如果真的有 `bug` 没修复，就直接回滚版本，减少故障影响范围。（...）

很多人都不太认同作者的观点，认为锁版本的风险会小很多。

这里其实还存在一个隐患，就是你用的包不一定遵循 `Semver` 规范，他可能发个补丁版本，直接来了个大改，或者根本没有单元测试（特别是你在用一些比较冷门的包的时候）。

即使是比较有名的包，举个栗子，圣诞彩蛋事件：

在 `antd` 包中，其中 `3.9.3、3.10.0 ~ 3.10.9、3.11.0 ~ 3.11.5` 版本中包含了一个圣诞彩蛋。

在圣诞节的那天，所有的 `Button` 组件都被加上了雪花。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-07-13_17-36-34.jpg)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-07-13_17-36-09.jpg)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common/Xnip2021-07-13_17-37-57.jpg)

如果在当时，你锁了版本，那么你就有一定概率避开这个问题。

如果你没有锁版本，那么你很大概率会中招。

4. 有些依赖包用不了

有些依赖包用 cnpm 安装就不能用，用 npm 安装就可以用，这个问题估计和 `cnpm` 包的使用软链接的方式有关系（并不确定）。

cnpm 和 npm 混用，导致包挂了，这个可以确定是 `cnpm` 使用软链接的问题。所以，还是尽量不要混用吧。

5. 总结

能用 npm 最好用 npm，公司内部的 `私有镜像源` 也建议做成 `npm`，毕竟 `cnpm` 还是存在一些隐患。

## pnpm 和 npm

看很多人安利，特点就是快。

我感觉这个快不快的在平时开发过程中已经算不上优点了，也不差这点时间。

在生产容器内安装依赖时可以考虑一下。

## 总结

现在 `npm` 也挺好用的了，最好还是用 `npm`。

如果在安装速度上有问题的话，可以搭建一个私有 `npm` 镜像源，将一些安装过的包都存在镜像源上。

## 最后一件事

如果您已经看到这里了，希望您还是点个赞再走吧~

您的点赞是对作者的最大鼓励，也可以让更多人看到本篇文章！

如果觉得本文对您有帮助，请帮忙在 [github](https://github.com/a1029563229/Blogs) 上点亮 `star` 鼓励一下吧！
# 新知识笔记

## Node

`const validateProjectName = require('validate-npm-package-name')`：检测 `packageName` 是否合法。

`fs.existsSync`：检测目录是否存在。

`fs.remove(targetDir)`：删除目录。

```js
exports.getPromptModules = () => {
  return [
    "babel",
    "typescript",
    "pwa",
    "router",
    "vuex",
    "cssPreprocessors",
    "linter",
    "unit",
    "e2e",
  ].map((file) => require(`../promptModules/${file}`));
};
```

模块选择配置器。

## Css

### 水印相关

`pointer-events` CSS 属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的 target。

使用 `userSelect` 属性，可以让文字无法被选中。

`MutationObserver`，能够监控元素的改动。

### 模板操作库

拷贝模版文件主要是使用 `jprichardson/node-fs-extra` 的 `copyTpl()` 方法，此方法使用 `ejs` 模板语法，可以将输入的内容插入到模版的对应位置：

```js
this.fs.copyTpl(
  project,
  path.join(projectPath, 'project.config.json',
  {description,projectName}
);
```

### 更新已经存在的文件内容

更新已经存在的文件内容是很复杂的工作，最可靠的方法是把文件解析为 AST，然后再编辑。一些流行的 AST parser 包括：

`Cheerio`：解析 HTML。
`Babylon`：解析 JavaScript。
对于 JSON 文件，使用原生的 JSON 对象方法。

使用 `Regex` 解析一个代码文件是邪道，不要这么干，不要心存侥幸。

### 动态引入插件库

```js
const fPath = resolve.sync(item, {
  basedir: root,
  extensions: [".js", ".ts"],
});
```

### babel-register

`babel-register` 模块改写 `require` 命令，为它加上一个钩子。此后，每当使用 `require` 加载.js、.jsx、.es 和.es6 后缀名的文件，就会先用 Babel 进行转码。

`Taro` 中注册组件的控制反转机制（Ioc）。

`Taro-cli` 中的 `hooks` 机制。

### 元素拖拽

一个元素如果要设为可拖拽，必须给它添加一个 draggable 属性。另外，在将组件列表中的组件拖拽到画布中，还有两个事件是起到关键作用的：

    - dragstart 事件，在拖拽刚开始时触发。它主要用于将拖拽的组件信息传递给画布。
    - drop 事件，在拖拽结束时触发。主要用于接收拖拽的组件信息。

#### 撤销

假设现在 snapshotData 保存了 4 个快照。即 [a, b, c, d]，对应的快照索引为 3。如果这时进行了撤销操作，我们需要将快照索引减 1，然后将对应的快照数据赋值给画布。

#### 标线

在页面上创建 6 条线，分别是三横三竖。这 6 条线的作用是对齐，它们什么时候会出现呢？

    - 上下方向的两个组件左边、中间、右边对齐时会出现竖线
    - 左右方向的两个组件上边、中间、下边对齐时会出现横线

具体的计算公式主要是根据每个组件的 xy 坐标和宽度高度进行计算的。例如要判断 ab 两个组件的左边是否对齐，则要知道它们每个组件的 x 坐标；如果要知道它们右边是否对齐，除了要知道 x 坐标，还要知道它们各自的宽度。

>

`happypack` 多进程编译

### tree Shaking 删除冗余代码

`tree shaking` 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(`dead-code`)。它依赖于 ES2015 模块系统中的静态结构特性，例如 `import` 和 `export`。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。

新的 webpack 4 正式版本，扩展了这个检测能力，通过 `package.json` 的 "sideEffects" 属性作为标记，向 `compiler` 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

在一个纯粹的 ESM 模块世界中，识别出哪些文件有副作用很简单。然而，我们的项目无法达到这种纯度，所以，此时有必要向 webpack 的 `compiler` 提供提示哪些代码是“纯粹部分”。

这种方式是通过 package.json 的 `"sideEffects"` 属性来实现的。

如同上面提到的，如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 `false`，来告知 webpack，它可以安全地删除未用到的 `export` 导出。

### Webview

Webview 是一个基于 webkit 的引擎，可以解析 DOM 元素，展示 html 页面的控件，它和浏览器展示页面的原理是相同的，所以可以把它当做浏览器来看待。

Android 的 Webview 在低版本和高版本采用了不同的 webkit 版本内核，4.4 后直接使用了 Chrome。

### 小程序

小程序的 UI 视图和逻辑处理是用多个 webview 实现的，逻辑处理的 JS 代码全部加载到一个 JSCore 里面，称之为 AppService，整个小程序只有一个，并且整个生命周期常驻内存，而所有的视图（wxml 和 wxss）都是单独的 Webview 来承载，称之为 AppView。正是因为每个视图都是一个独立的 webview 进程，考虑到性能消耗，小程序不允许打开超过 5 个层级的页面，当然同是也是为了体验更好。

### webpack-chain

#### 什么是 webpack-chain

`webpack-chain` 尝试通过可链式或顺流式的 API 创建和修改 webpack 配置。API 的 Key 部分可以由用户指定的名称引用，这有助于跨项目修改配置方式的标准化。应用一个链式 API 来生成和简化 2-4 版本的 webpack 的配置的修改。

#### 为什么使用 webpack-chain？

webpack 的核心配置的创建和修改基于有潜在难于处理的 Javascript 对象。虽然这对于配置单个项目来说还算 OK 的，但当你尝试跨项目共享这些对象并使其进行后续的修改就会变得混乱不堪。

使用 `webpack-chain` 共享配置很简单，仅仅在导出配置和在传递给 webpack 之前调用 `.toConfig()` 方法将配置导出给 webpack 使用。

#### sideEffects

基于我们对 fp 中的 side effect 的理解，我们可以认为，只要我们确定当前包里的模块不包含副作用，然后将发布到 npm 里的包标注为 sideEffects: false ，我们就能为使用方提供更好的打包体验。原理是 webpack 能将标记为 side-effects-free 的包由 import {a} from xx 转换为 import {a} from 'xx/a'，从而自动修剪掉不必要的 import，作用同 babel-plugin-import。

虽然 b 模块的导出是被忽略了，但是副作用代码被保留下来了。由于目前 transformer 转换后可能引入的各种奇怪操作引发的副作用（参考：你的 Tree-Shaking 并没什么卵用），很多时候我们会发现就算有了 tree shaking 我们的 bundle size 还是没有明显的减小。而通常我们期望的是 b 模块既然不被使用了，其中所有的代码应该不被引入才对。

这个时候 sideEffects 的作用就显现出来了：如果我们引入的 包/模块 被标记为 sideEffects: false 了，那么不管它是否真的有副作用，只要它没有被引用到，整个 模块/包 都会被完整的移除。以 mobx-react-devtool 为例，我们通常这样去用：

```jsx
import DevTools from "mobx-react-devtools";

class MyApp extends React.Component {
  render() {
    return (
      <div>
        ...
        {process.env.NODE_ENV === "production" ? null : <DevTools />}
      </div>
    );
  }
}
```

这是一个很常见的按需导入场景，然而在没有  sideEffects: false  配置时，即便  NODE_ENV  设为  production ，打包后的代码里依然会包含  mobx-react-devtools  包，虽然我们没使用过其导出成员，但是  mobx-react-devtools  还是会被 import，因为里面“可能”会有副作用。但当我们加上 sideEffects false 之后，tree shaking 就能安全的把它从 bundle 里完整的移除掉了。

上面也说到，通常我们发布到 npm 上的包很难保证其是否包含副作用（可能是代码的锅可能是 transformer 的锅），但是我们基本能确保这个包是否会对包以外的对象产生影响，比如是否修改了 window 上的属性，是否复写了原生对象方法等。如果我们能保证这一点，其实我们就能知道整个包是否能设置  sideEffects: false 了，至于是不是真的有副作用则并不重要，这对于 webpack 而言都是可以接受的。这也就能解释为什么能给 vue 这个本身充满副作用的包加上 sideEffects: false 了。

所以其实 webpack 里的 sideEffects: false 的意思并不是我这个模块真的没有副作用，而只是为了在摇树时告诉 webpack：我这个包在设计的时候就是期望没有副作用的，即使他打完包后是有副作用的，webpack 同学你摇树时放心的当成无副作用包摇就好啦！。

也就是说，只要你的包不是用来做 polyfill 或 shim 之类的事情，就尽管放心的给他加上 sideEffects: false 吧！

项目中使用到 less 或者 sass 的话不能直接 sideEffects: false，会被 tree shaking，导致 mini-css-extract-plugin 无法抽取出 css 文件，需要额外排除\*.css。

#### tree shaking

tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export。这个术语和概念实际上是由 ES2015 模块打包工具 rollup 普及起来的。

webpack 2 正式版本内置支持 ES2015 模块（也叫做 harmony modules）和未使用模块检测能力。新的 webpack 4 正式版本扩展了此检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

#### ReactDom

React 在 v0.14 之前是没有 ReactDOM 的，所有功能都包含在 React 里。从 v0.14(2015-10)开始，React 才被拆分成 React 和 ReactDOM。为什么要把 React 和 ReactDOM 分开呢？因为有了 ReactNative。React 只包含了 Web 和 Mobile 通用的核心部分，负责 Dom 操作的分到 ReactDOM 中，负责 Mobile 的包含在 ReactNative 中。具体参考 v0.14 的 release：React v0.14 - React Blog。

ReactDom 只做和浏览器或 DOM 相关的操作，例如：ReactDOM.render() 和 ReactDOM.findDOMNode()。如果是服务器端渲染，可以 ReactDOM.renderToString()。React 不仅能通过 ReactDOM 和 Web 页面打交道，还能用在服务器端 SSR，移动端 ReactNative 和桌面端 Electron。

#### DefinePlugin

DefinePlugin 用于定义全局变量，在 webpack 打包时会对这些变量做替换。

##### bundle

Bundle: bundle 通常是由多个不同的模块产生，它是已经加载完毕和被编译后的源代码的最终版本。

Bundle Splitting: 这是 webpack 优化代码的一种方法，即将一个单独的应用拆解为多个 bundle。通过将多个 bundle 中公共引入的模块拆解出来，我们可以减少项目的代码量，从而减小应用的体积，并且通过浏览器缓存，我们可以将代码进一步优化。

Chunk: 这个 webpack 中专用的术语用于管理 webpack 内部的打包进程。bundle 由许多 chunk 组成，chunk 有几种类型，比如说“入口”和“子块”。通常 chunk 和输出的 bundle 一一对应，但是，有些是一对多的关系。

Code Splitting: 它表示将你的代码拆分成多个 bundle 或 chunk，之后你可以按需加载它们，而不是简单地加载一个单独的文件。

##### webpack target

由于 JavaScript 即可以编写服务端代码也可以编写浏览器代码，所以 webpack 提供了多种部署 target，你可以在 webpack 的配置选项中进行设置。

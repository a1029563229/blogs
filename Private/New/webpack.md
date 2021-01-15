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

`devtool`: 此选项控制是否生成，以及如何生成 source map。

#### 不同的 source map 模式的区别

- eval：eval 模式会把每个 module 封装到 eval 里包裹起来执行，并且会在末尾追加注释。
- source-map：该模式会把每个 module 封装到函数中执行，并且生成 `source-map` 文件，在 `output` 文件末尾添加对应的 `map` 注释。
- hidden-source-map：相比较 `source-map` 模式，缺少了末尾的注释。
- inline-source-map：在文件末尾处，sourceMap 作为 DataURL 的形式被内嵌进了 bundle 中，由于 sourceMap 的所有信息都被加到了 bundle 中，整个 bundle 文件变得硕大无比。
- eval-module-map：和 `eval` 类似，但是把注释里的 `sourceMap` 都转换为了 `DataURL`。
- cheap-source-map: 和 source-map 生成结果差不多。output 目录下的 index.js 内容一样。
  但是 cheap-source-map 生成的 index.js.map 的内容却比 source-map 生成的 index.js.map 要少很多代码，我们对比一下上文 source-map 生成的 index.js.map 的结果，发现 source 属性里面少了列信息，只剩一个"webpack:///js/index.js"。
- cheap-module-source-map：在 cheap-module-source-map 下 sourceMap 的内容更少了，sourceMap 的列信息减少了，可以看到 sourcesContent 也没有了。

开发环境推荐：

- eval-source-map：打包速度快，可追溯代码

生产环境推荐：

- cheap-module-source-map （这也是下版本 webpack 使用-d 命令启动 debug 模式时的默认选项）

生产环境使用 sourcemap，可以把 `.map` 文件上传到内网，不发布到外网。

#### webpack optimization

从 `webpack 4` 开始，会根据你选择的 `mode` 来执行不同的优化，不过所有的优化还是可以通过 `optimization` 来手动配置的。

##### optimization.minimize

告知 `webpack` 使用 `TerserPlugin` 或其他在 `optimization.minimizer` 定义的插件来压缩 `bundle`。

##### optimization.minimizer

允许你通过提供一个或多个定制过的 `TerserPlugin` 实例，覆盖默认压缩工具（minimizer）。

##### optimization.splitChunks

对于动态导入模块，默认使用 webpack v4+ 提供的全新的通用分块策略。

###### cacheGroups

至于其他属性会通过另外一篇文章做一个总结。这个主要是了解 cacheGroups 的用法，cacheGroup 的作用是将 chunks 按照 cacheGroup 中给定的条件分组输出，cache 会集成 splitchunks 的基础配置，自己内部也可以自定义这些基础配置自定义的话会覆盖掉 splitchunks 中的配置。webpack 内置了一份默认配置包含了根据 test：node_modules 以及 default 属性的代码分割，这样即使我们不配置 cacheGroups 的情况下只要开启了 chunks:all 也会默认把公用库和业务代码分割。

通过 cacheGroup 能做的是更加细化的对 chunks 进行分割，在代码变和不变之间做更好的分离，比如我们的工具库可能很少更改就可以考虑一个 chunk，这样就和业务分离了。

再就是经过上面的验证，会发现多个 chunk 如果存在规则重叠，实际上不会将同样的代码构建到每个 chunk 中去，而是复用其中的一个 chunk，这样的话我们在配置的过程当中更需要明确代码的边界，尽量避免这种优化的发生，保证每个 test 之间不重叠。

#### optimization.runtimeChunk

将 `optimization.runtimeChunk` 设置为 `true` 或 `multiple`，会为每个只含有 `runtime` 的入口添加一个额外 `chunk`。

#### optimization.emitOnErrors

使用 optimization.emitOnErrors 在编译时每当有错误时，就会 emit asset。这样可以确保出错的 asset 被 emit 出来。关键错误会被 emit 到生成的代码中，并会在运行时报错。

#### optimization.moduleIds

告知 webpack 当选择模块 id 时需要使用哪种算法。将 optimization.moduleIds 设置为 false 会告知 webpack 没有任何内置的算法会被使用，但自定义的算法会由插件提供。optimization.moduleIds 的默认值是 false。

#### optimization.nodeEnv

告知 webpack 将 process.env.NODE_ENV 设置为一个给定字符串。


## Loader

Loader：模块转换器，用于把模块原内容按照需求转换成新内容。

## Plugin

Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。

插件的用处，对开发者来说就是可以接触到 `webpack` 构建流程中的各个阶段并劫持做一些代码处理，对使用者来说则是我们可以通过各类插件实现自动生成 HTML 模板（html-webpack-plugin）、自动压缩图片（imagemin-webpack-plugin）等功能。

插件向第三方开发者提供了 `webpack` 引擎中完整的能力。使用阶段式的构建回调，开发者可以引入它们自己的行为到 `webpack` 构建流程中。

一个 `webpack` 插件应该包含：

- 一个 `Javascript` 函数或 `Javascript` 类，用于承接这个插件模块的所有逻辑；
- 在它原型上定义的 `apply` 方法，会在安装插件时被调用，并被 `webpack compiler` 调用一次；
- 指定一个触及到 `webpack` 本身的事件钩子，即 `hooks`，用于特定时机处理额外的逻辑；
- 对 `webpack` 实例内部做一些操作处理；
- 在功能流程完成后可以调用 `webpack` 提供的回调函数；

在 `apply` 函数中，`webpack` 会传入一个 `compiler` 参数，这个对象包含了 `webpack` 环境所有的配置信息，包含 `options`、`loaders`、`plugins` 这些信息。这个对象在 `webpack` 启动时被实例化，它是全局为的，可以简单地把它理解为 `webpack` 实例。
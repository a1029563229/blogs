# 插件（plugins）

插件是 `webpack` 的支柱功能。webpack 自身也是构建于 webpack 配置中用到的相同的插件系统之上。

## 剖析

webpack 插件是一个具有 `apply` 属性的 Javascript 对象。`apply` 属性会被 `webpack compiler` 调用，并且 `compiler` 对象可在整个编译生命周期访问。

ConsoleLogOnBuildWebpackPlugin.js

```js
const pluginName = "ConsoleLogOnBuildWebpackPlugin";

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log("webpack 构建过程开始！");
    });
  }
}
```

## 用法

由于插件可以携带参数/选项，你必须在 webpack 配置中，向 `plugins` 中传入 `new` 实例。

## 编写一个插件

插件向第三方开发者提供了 `webpack` 引擎中完整的能力。使用阶段式的构建回调，开发者可以引入它们自己的行为到 `webpack` 构建流程中。

### 创建插件

`webpack` 插件由下构成：

- 一个 Javascript 命名函数。
- 在插件函数的 `prototype` 上定义一个 `apply` 方法。
- 指定一个绑定到 `webpack` 自身的事件钩子。
- 处理 `webpack` 内部实例的特定数据。
- 功能完成后调用 `webpack` 提供的回调。

```js
// 一个 JavaScript 命名函数。
function MyExampleWebpackPlugin() {}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function (compiler) {
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin("webpacksEventHook", function (
    compilation /* 处理 webpack 内部实例的特定数据。*/,
    callback
  ) {
    console.log("This is an example plugin!!!");

    // 功能完成后调用 webpack 提供的回调。
    callback();
  });
};
```

### Compiler 和 Compilation

在插件开发中最重要的两个资源就是 `compiler` 和 `compilation` 对象。理解它们的角色是扩展 `webpack` 引擎重要的第一步。

- `compiler` 对象代表了完整的 `webpack` 环境配置。这个对象在启动 `webpack` 时被一次性创建，并配置好所有可操作的设置，包括 `options`、`loader` 和 `plugin`。当在 `webpack` 环境中应用一个插件时，插件将受到此 `compiler` 对象的引用。可以使用它来访问 `webpack` 的主环境。

### 基本插件架构

插件是由具有 `apply` 方法的 `prototype` 对象所实例化出来的。这个 `apply` 方法在安装插件时，会被 `webpack compiler` 调用一次。`apply` 方法可以接收一个 `webpack compiler` 对象的引用，从而可以在回调函数中访问到 `compiler` 对象。一个简单的插件结构如下：

```js
function HelloWorldPlugin(options) {
  // 使用 options 设置插件实例……
}

HelloWorldPlugin.prototype.apply = function (compiler) {
  compiler.plugin("done", function () {
    console.log("Hello World!");
  });
};

module.exports = HelloWorldPlugin;
```

然后，要安装这个插件，只需要在你的 `webpack` 配置的 `plugin` 数组中添加一个实例：

```js
var HelloWorldPlugin = require("hello-world");

var webpackConfig = {
  // ... 这里是其他配置 ...
  plugins: [new HelloWorldPlugin({ options: true })],
};
```

#### 访问 compilation 对象

使用 `compiler` 对象时，你可以绑定提供了编译 `compilation` 引用的回调函数，然后拿到每次新的 `compilation` 对象。这种 `compilation` 对象提供了一些钩子函数，来钩入构建流程的很多步骤中。

```js
function HelloCompilationPlugin(options) {}

HelloCompilationPlugin.prototype.apply = function(compiler) {

  // 设置回调来访问 compilation 对象：
  compiler.plugin("compilation", function(compilation) {

    // 现在，设置回调来访问 compilation 中的步骤：
    compilation.plugin("optimize", function() {
      console.log("Assets are being optimized.");
    });
  });
};

module.exports = HelloCompilationPlugin;
```

### 异步编译插件

有一些编译插件中的步骤是异步的，这样就需要额外传入一个 `callback` 回调函数，并且在插件运行结束时，必须调用这个回调函数。

```js
function HelloAsyncPlugin(options) {}

HelloAsyncPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {

    // 做一些异步处理……
    setTimeout(function() {
      console.log("Done with async work...");
      callback();
    }, 1000);

  });
};

module.exports = HelloAsyncPlugin;
```

### 示例

一旦我们能深入理解 `webpack compiler` 和每个独立的 `compilation`，我们依赖 `webpack` 引擎将有无限多的事可以做。我们可以重新格式化已有的文件，创建衍生的文件，或者制作全新的生成文件。

让我们来写一个简单的示例插件，生成一个叫做 `filelist.md` 的新文件；文件内容是所有构件生成的文件的列表。这个插件大概像下面这样：

```js
function 
```
# 插件（plugins）

插件是 `webpack` 的支柱功能。webpack 自身也是构建于 webpack 配置中用到的相同的插件系统之上。

## 剖析

webpack 插件是一个具有 `apply` 属性的 Javascript 对象。`apply` 属性会被 `webpack compiler` 调用，并且 `compiler` 对象可在整个编译生命周期访问。

ConsoleLogOnBuildWebpackPlugin.js

```js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
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
function MyExampleWebpackPlugin() {

};

// 在插件函数的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin('webpacksEventHook', function(compilation /* 处理 webpack 内部实例的特定数据。*/, callback) {
    console.log("This is an example plugin!!!");

    // 功能完成后调用 webpack 提供的回调。
    callback();
  });
};
```

### Compiler 和 Compilation

在插件开发中最重要的两个资源就是 `compiler` 和 `compilation` 对象。理解它们的角色是扩展 `webpack` 引擎重要的第一步。

- `compiler` 对象代表了完整的 `webpack` 环境配置。这个对象在启动 `webpack` 时被一次性创建，并配置好所有可操作的设置，包括 `options`、`loader` 和 `plugin`。当在 `webpack` 环境中应用一个插件时，插件将受到此 `compiler` 对象的引用。可以使用它来访问 `webpack` 的主环境。
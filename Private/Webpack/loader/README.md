# Webpack Loader

`loader` 只是一个导出为函数的 Javascript 模块。 `loader runner` 会调用这个函数，然后把上一个 `loader` 产生的结果或者资源文件（resource file）传入进去。函数的 `this` 上下文将由 `webpack` 填充，并且 `loader runner` 具有一些有用方法，可以使 `loader` 改变为异步调用方法，或者获取 `query` 参数。

## loader API

### callback

使用 `this.callback` 允许传递多个参数，而不仅仅是 `content`。

```js
module.exports = function(content, map, meta) {
  this.callback(null, someSyncOperation(content), map, meta);
  return; // 当调用 callback() 时总是返回 undefined
};
```

### 异步 loader

对于异步 `loader`，使用 `this.async` 来获取 `callback` 函数：

```js
module.exports = function(content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function(err, result) {
    if (err) return callback(err);
    callback(null, result, map, meta);
  });
};
```

> loader 最初被设计为可以在同步 loader pipeline（如 Node.js ，使用 enhanced-require），与异步 pipeline（如 webpack ）中运行。然而在 Node.js 这样的单线程环境下进行耗时长的同步计算不是个好主意，我们建议尽可能地使你的 loader 异步化。但如果计算量很小，同步 loader 也是可以的。

### "Raw" loader

通过设置 `raw`，`loader` 可以接收原始的 `Buffer`。

```js
module.exports = function(content) {
    assert(content instanceof Buffer);
    return someSyncOperation(content);
    // 返回值也可以是一个 `Buffer`
    // 即使不是 raw loader 也没问题
};
module.exports.raw = true;
```

### 越过 loader（Piching loader）

如果某个 loader 在 pitch 方法中给出一个结果，那么这个过程会回过身来，并跳过剩下的 loader。在我们上面的例子中，如果 b-loader 的 pitch 方法返回了一些东西：

```js
module.exports = function(content) {
  return someSyncOperation(content);
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  if (someCondition()) {
    return "module.exports = require(" + JSON.stringify("-!" + remainingRequest) + ");";
  }
};
```

上面的步骤将被缩短为：

```bash
|- a-loader `pitch`
  |- b-loader `pitch` returns a module
|- a-loader normal execution
```

### loader 上下文

`loader context` 表示在 `loader` 内使用 `this` 可以访问的一些方法或属性。

假设我们这样请求别的模块，在 `/abc/file.js` 中：

```js
require("./loader1?xyz!loader2!./resource?rrr");
```

`this.version`：loader API 的版本号，目前是 2。

`this.context`：模块所在的目录。可以用作解析其他模块路径的上下文。

`this.request`：被解析出来的 `request` 字符串。

`this.callback`：一个可以同步或者异步调用的可以返回多个结果的函数。

`this.async`：告诉 `loader-runner` 这个 `loader` 将会异步地调用。返回 `this.callback`。

`this.data`：在 `picth` 阶段和正常阶段之间共享的 `data` 对象。

`this.cacheable`：

设置是否可缓存标志的函数：

```js
cacheable(flag = true: boolean)
```

默认情况下，`loader` 的处理结果会被标记为可缓存。调用这个方法然后传入 `false`，可以关闭 `loader` 的缓存。

`this.loaders`：所有 `loader` 组成的数组。它在 `pitch` 阶段的时候是可以写入的。

`this.loaderIndex`：当前 `loader` 在 `loader` 数组中的索引。

`this.resource`：`request` 中的资源部分，包括 `query` 参数。

`this.resourcePath`：资源文件的路径。

`this.target`：编译的目标。从配置选项中传递过来的。

`this.webpack`：如果是由 `webpack` 编译的，这个布尔值会被设置为真。

`this.sourceMap`：应该生成一个 `source map`。

`this.emitWarning`：发出一个警告。

`this.emitError`：发出一个错误。

`this.loadModule`：如果你需要获取其他模块的源代码来生成结果的话，你可以使用这个函数。

`this.resolve`：和 `require` 表达式一样解析一个 `request`。

`this.addDependency`：加入一个文件作为产生 `loader` 结果的依赖，使它们的任何变化都可以被监听到。

`this.addContextDependcy`：把文件夹作为 `loader` 结果的依赖加入。

`this.clearDependencies`：移除 `loader` 结果的所有依赖。

`this.emitFile`：产生一个文件。

## 编写一个 loader

`loader` 是导出为一个函数的 `node` 模块。该函数在 `loader` 转换资源的时候调用。给定的函数将调用 `loader API`，并通过 `this` 上下文访问。

### 简单用法

`loader` 会返回一个或者两个值。第一个值的类型是 `Javascript` 代码的字符串或者 `buffer`。第二个参数值是 `SourceMap`，它是个 `Javascript` 对象。

### 复杂用法

当链式调用多个 `loader` 的时候，请记住它们会以相反的顺序执行。取决于数组写法格式，从右向左或者从下向上执行。

### 用法准则

编写 `loader` 时应该遵循以下准则：

#### 1.简单易用

`loaders` 应该只做单一任务。这不仅使每个 `loader` 易维护，也可以在更多场景链式调用。

#### 2.使用链式传递

利用 `loader` 可以链式调用的优势。写五个简单的 `loader` 实现五项任务，而不是一个 `loader` 实现五项任务。

`loader` 可以被链式调用意味着不一定要输出 `Javascript`。只要下一个 `loader` 可以处理这个输出，这个 `loader` 就可以返回任意类型的模块。

#### 3.模块化的输出

保证输出模块化。

#### 4.确保无状态

确保 `loader` 在不同模块转换之间不保存状态。每次运行都应该独立于其他编译模块以及相同模块之前的编译结果。

#### 5.使用 loader utiilities

充分利用 `loader-utils` 包。它提供了许多有用的工具，但最常用的一种工具是获取传递给 `loader` 的选项。

#### 6.记录 loader 的依赖

如果一个 `loader` 使用外部资源（例如，从文件系统读取），必须声明它。这些信息用于使缓存 `loaders` 无效，以及在观察模式（watch mode）下重新编译。

#### 7.解析模块依赖关系

根据模块类型，可能会有不同的模式指定依赖关系。例如在 `CSS` 中，使用 `@import` 和 `url(...)` 语句来声明依赖。这些依赖关系应该由模块系统来解析。

可以通过以下两种方式中的一种来实现：

- 通过把它们转化为 `require` 语句。

- 通过 `this.resolve` 函数解析路径。

`css-loader` 是第一种方式的一个例子。它将 `@import` 语句替换为 `require` 其他样式文件，将 `url(...)` 替换为 `require` 引用文件，从而实现将依赖关系转化为 `require` 声明。

#### 8.提取通用代码

避免在 `loader` 处理的每个模块中生成通用代码。相反，你应该在 `loader` 中创建一个运行时文件，并生成 `require` 语句以引用该共享模块。

#### 9.避免绝对路径

不要在模块代码中插入绝对路径，因为当项目根路径变化时，文件绝对路径也会变化。`loader-utils` 中的 `stringifyRequest` 方法，可以将绝对路径转化为相对路径。

#### 10.使用 peer dependencies

如果你的 `loader` 简单包裹另外一个包，你应该把这个薄作为一个 `peerDependency` 引入。这种方式允许应用程序开发者在必要情况下，在 `package.json` 中指定所需的确定版本。

例如，`sass-loader` 指定 `node-sass` 作为同等依赖，引用如下：

```json
"peerDependencies": {
  "node-sass": "^4.0.0"
}
```


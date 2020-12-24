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


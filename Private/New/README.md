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
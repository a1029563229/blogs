# 一文搞懂 webpack 懒加载机制 —— webpack 系列

webpack 是一个现代 `JavaScript` 应用程序的静态模块打包器 `(module bundler)`。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图 `(dependency graph)`，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 `bundle`。

前端工程化演进到今天，webpack 做了很大的贡献。项目工程化带来了很多便捷，我们不再需要手动处理依赖之间的关系，也可以更方便的使用更多好用的框架，我们可以更关注业务本身，集中精力打造我们的产品。

在 webpack 中，使用懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

那么，接下来让我们来探究一下 webpack 对懒加载的模块做了哪些工作吧~

## 实现背景

我们先假设我们在完成一个真实的项目，这个项目中有上传下载功能。

下载功能一般是打开一个链接，所以我们直接实现在主包中。而上传功能可能会使用到第三方 sdk，我们使用懒加载进行加载。只有在用户点击上传时，我们才会加载这个具备上传功能的包，来进行上传。

> 上传下载功能可能会使用到一些第三方 sdk，而这些第三方 sdk 的体积往往非常大，并且这个功能所以这个功能做成懒加载实现是合理的。
> 
> 为了演示差别，我们这里将“下载”和“上传”两个功能做区分。

## 项目基础配置

我们先搭建一个基础的 webpack 配置，让其支持懒加载配置，然后我们直接通过打包后的代码来看看懒加载实现的效果。我们需要有个基础目录配置，[项目 Demo](https://github.com/a1029563229/blogs/tree/master/Topic/Webpack/LazyLoad) 目录结构如下：

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/1.jpg)

| 文件/目录           | 说明                         |
| ------------------- | ---------------------------- |
| `src`               | 入口文件、下载模块、上传模块 |
| `index.html`        | `html` 模板文件              |
| `webpack.config.js` | `webpack` 配置文件           |
| `package.json`      | 项目说明文件                 |

### 功能代码实现

我们先来看看我们的功能代码实现吧，分别是 `download.js`、`upload.js`、`index.js`。

```js
// ./src/download.js
const download = () => {
  console.log("download start");

  console.log("schedule download sdk");
  
  console.log("download");
}

export default download;
```

```js
// ./src/upload.js
const upload = () => {
  console.log("upload start");

  console.log("schedule upload sdk");
  
  console.log("upload");
}

export default upload;
```

```js
// ./src/index.js
import download from "./download";

console.log("initial page");

async function handlerUploadClick() {
  // 动态加载 upload 模块，该模块的 default 属性就是 upload 方法
  const { default: upload } = await import("./upload");
  // 调用 upload 方法
  upload();
}

async function handlerDownloadClick() {
  download();
}

// 点击 upload 按钮时，调用上传方法
document.querySelector("#upload").addEventListener("click", handlerUploadClick, false)

// 点击 download 按钮时，调用下载方法
document.querySelector("#download").addEventListener("click", handlerDownloadClick, false)
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Webpack LazyLoad</title>
</head>

<body>
  <section>
    <h1>Home</h1>
    <button id="upload">Upload</button>
    <button id="download">Download</button>
  </section>
</body>

</html>
```

在我们的功能代码实现中，我们实现了一个 `html` 网页，其中有两个按钮，一个是上传按钮，一个是下载按钮。

### 配置实现

功能实现后，我们需要配置 webpack，然后打包生成能够直接运行的项目。

我们新建文件 `webpack.config.js` 进行配置，代码实现如下：

```js
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackChain = require("webpack-chain");

// 使用 webpack chain 组装配置
const chain = new WebpackChain();

// 设置入口文件为 src/index.js
chain.entry("main").add("./src/index.js").end();

// 将构建生成的文件输出到 dist 目录
chain.output.path(path.resolve(__dirname, "./dist")).end();

// 添加 html-webpack-plugin 插件，设置 HTML 模板文件
chain.plugin("html-webpack-plugin").use(HtmlWebpackPlugin, [{
  template: path.resolve(__dirname, "./index.html")
}]);

// 设置 source map 生成规则
chain.devtool("cheap-source-map").end();

// 将配置转成 webpack 可识别的配置对象
const config = chain.toConfig();

module.exports = config;
```

从代码实现中可以看出，我们的 `webpack` 配置只是简单配置了入口出口和 `html` 模板文件。

那么接下来，我们需要配置 `package.json`，在 `scripts` 中添加启动命令，代码实现如下：

```json
"scripts": {
  "build": "NODE_ENV=development webpack --config webpack.config.js && cd dist && anywhere"
}
```

> anywhere 是一个快速启动 `http` 服务的插件，可以使用 `npm i anywhere -g` 进行全局安装。

在配置完了以后，我们需要运行下面的命令安装一些依赖

```bash
npm i webpack webpack-cli webpack-chain html-webpack-plugin anywhere -D
```

安装依赖后，我们就可以准备启动项目啦！

## 运行项目

我们运行 `npm build` 启动项目编译，命令行输出将会是下面这样（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/3.jpg)

我们的项目在被 `webpack` 打包后，输出到了 `dist` 目录，并且由 `anywhere` 运行了一个服务，在 `8000` 端口。

我们打开浏览器，可以看到下面这个页面。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/4.jpg)

我们打开控制台，会看到我们设置的对应输出（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/5.jpg)

### 页面操作

我们来进行一些页面操作，我们先点击 `Download` 按钮，会发现控制台的输出变成了下面这样（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/6.jpg)

从上图可以看出 `download` 方法被调用了，此时执行了一个下载操作（mock 操作）。

那我们此时再点击一下 `Upload` 按钮，再观察控制台输出（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/7.jpg)

从控制台可以看到我们的上传操作被调用了，但是似乎和下载操作没什么区别。

此时，我们需要切换到 `network` 控制面板，查看网络请求。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/8.jpg)

我们从上图可以发现，在调用 `upload` 方法时，才会加载 `upload` 方法对应的文件，从而实现懒加载。

这样做的好处在于，可以根据需求有效减小主包的体积，加快首屏渲染速度，减少服务器带宽压力。同时也减少了 JS 解析时间，提升页面渲染速度。

懒加载的实现对前端来说，是性能优化专项必修课。可以说，项目越复杂，那么懒加载带来的好处就越大。

## 实现分析

下面我们可以来看看 `webpack` 编译后的代码，看看 `webpack` 是如何实现懒加载的。

首先，我们查看主包文件，也就是 `dist/main.js`。在这个文件里找到我们在 `src/index.js` 中实现的初始化页面操作。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/9.jpg)

从上图可以看出，该操作直接被打包进了构建生成的 `bundle` 文件中。

### Download 解析

那我们再来看看 `src/download.js` 中实现的下载方法调用（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/10.jpg)

从上图可以看出，`handlerDownloadClick` 最终调用了 `_download__WEBPACK_IMPORTED_MODULE_0__.default` 方法。

而这个 `_download__WEBPACK_IMPORTED_MODULE_0__.default` 是什么呢？

在构建后的代码中，找到了对这个对象的赋值操作（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/11.jpg)

而 `__webpack_require__` 函数，其实就是加载 `__webpack_modules__` 中的对应模块，这里加载的对应模块就是 `"./src/download.js"` 模块。

最终，我们在 `dist/main.js` 中，找到了对该模块的定义。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/13.jpg)

从上图可以看出，对该模块的定义，其实就是 `src/download.js` 的实现，被打包进了 `dist/main.js` 中，成为了 `__webpack_modules__` 对象的一部分。

### Upload 解析

看完了 `download` 方法的打包实现，我们接下来看看懒加载的 `upload` 是如何实现的？

我们先找到 `upload` 对应的函数调用（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/14.jpg)

从上图可以看出，当点击上传按钮时，先使用 `__webpack_require__.e` 方法进行了一个加载操作，我们来看看这个方法所做的事情。

该方法先拼接了这个模块对应的绝对路径（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/15.jpg)

这个路径的文件其实就是我们打包后生成在 `dist` 目录的文件（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/16.jpg)

然后使用动态插入 `script` 标签的方式，将对应的脚本文件插入到文档中。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/18.jpg)

当 `upload` 对应的文件被插入后，将会自动执行。`src_upload_js.js` 脚本文件中将会执行 `webpackJsonpCallback` 方法，执行后将会在 `window` 的 `webpackChunklazyload` 数组插入刚才懒加载的模块。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/17.jpg)

在执行该函数后，还会把 `upload` 模块注册在 `__webpack_modules__` 中，后面的调用流程就和调用 `download` 一样啦~（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/19.jpg)

## 小结

从一个简单的案例，我们了解到了 `webpack` 的懒加载实现。

`webpack` 的懒加载实现在打包时会将懒加载的代码切割出去单独打包，然后在主包中进行按需加载，最后执行调用。

我们最后用一张图来梳理一下懒加载的加载执行过程。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/20.jpg)

## 最后一件事

如果您已经看到这里了，希望您还是点个赞再走吧~

您的点赞是对作者的最大鼓励，也可以让更多人看到本篇文章！

如果觉得本文对您有帮助，请帮忙在 [github](https://github.com/a1029563229/Blogs) 上点亮 `star` 鼓励一下吧！

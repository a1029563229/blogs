# 一文搞懂 webpack 懒加载机制 —— webpack 系列

本质上，webpack 是一个现代 `JavaScript` 应用程序的静态模块打包器 `(module bundler)`。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图 `(dependency graph)`，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 `bundle`。

前端工程化演进到今天，webpack 做了很大的贡献。项目工程化带来了很多便捷，我们不再需要手动处理依赖之间的关系，也可以更方便的使用更多好用的框架，我们可以更关注业务本身，集中精力打造我们的产品。

在 webpack 中，使用懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

接下来，让我们来探究一下 webpack 对懒加载的模块做了哪些工作吧~

## 实现背景

我们先假设我们在完成一个真实的项目，这个项目中有上传下载功能。下载功能一般是打开一个链接，所以我们直接实现在主包中。而上传功能可能会使用到第三方 sdk，我们使用懒加载进行加载。只有在用户点击上传时，我们才会加载这个具备上传功能的包，来进行上传。

> 上传下载功能可能会使用到一些第三方 sdk，而这些第三方 sdk 的体积往往非常大，并且这个功能所以这个功能做成懒加载实现是合理的。
> 
> 为了演示差别，我们这里将下载和上传做区分。

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

在我们的功能代码实现中，我们实现了一个 `html` 网页，其中有两个按钮，一个是上传按钮，一个是下载按钮（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/webpack/2.jpg)

### 配置实现
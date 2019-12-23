# Express 的基本使用，前端进阶 Node 的第一课

## Node 的应用及知识点

在前端平时的工作中，对后端的了解比较少，但是应该都知道 `Node` 可以用于写后端，今天这篇文章来介绍一下 `Node` 的著名框架 `Express` 的基本使用，从应用起步，去学习 `Node`。

先来了解一下 `Node` 可以做什么，再决定需不需要学习，从两个点出发，首先是应用场景：

- 代理服务（用于解决跨域）
- 中间层（用于数据二次处理、流量拦截、）
- Webpack（用于对文件内容进行二次处理）
- 服务端渲染（这个都懂）

其次是可以学到什么知识：

- 对后端的基础入门，成为一个懂后端的前端；
- 对数据传输的进一步了解，深入 HTTP 和 TCP；
- 一些简易脚本的编写，学会自动化（偷懒）；


## 案例展示：路由选择

如果对这些优点感兴趣的话，我们的学习将从下面这个例子开始，我们花出一朵小花，然后用不同的路由去访问小花的四种心情状态，学会基础的“响应数据请求”，最后我们完成一个可供交互的“接口”（对，就是工作中前后端联调的那种接口）。

<br />
<center class="half">
    <img src="http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/gif/2.gif" width="200"/> <img src="http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/gif/3.gif" width="200"/> <img src="http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/gif/4.gif" width="200"/> <img src="http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/gif/5.gif" width="200"/>
</center>

如果你的电脑还没有安装 `Node`，那么你需要安装一下 [Node](http://nodejs.cn/download/)。我们进入一个全新的目录，使用 `npm init` 来初始化项目，这一步可以一直按回车键结束，你也可以自己自定义一些选项。然后我们使用 `npm install express --save` 来安装 `express`，依赖安装完成后，我们在当前文件夹新建一个 `app.js`，准备开始键入我们的内容。

我们在 `app.js` 中写入以下代码：

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.end("Hello Express");
});

app.listen(8888, () => {
  console.log("server is listening in http://localhost:8888")
})
```

在运行代码之前，我们先来简单的解析一下代码：

- `const app = express();`：新建一个 `express` 实例，实例包含了 `express` 的属性；
- `app.get("/", callback)`：`express` 的路由控制，在客户端访问该路由时，将会执行传入的回调函数；
- `res.end("Hello Express")`：响应一个 `Hello Express` 字符串；
- `app.listen(8888, callback)`：进程运行在 `8888` 端口上，监听该端口的请求；

所有细节都解析完了，接下来我们使用 `node app.js` 来运行我们的程序：

> Tips: 安装 `nodemon` 的话（`npm install nodemon -g`)，你可以使用 `nodemon app.js` 来运行程序，`nodemon` 会持续监听文件的变动而重启服务，更适合开发阶段使用。

控制台会输出一条信息 `server is listening in http://localhost:8888`，此时我们打开浏览器，输入 `http://localhost:8888`，就可以看到我们的服务响应了一条消息：

![响应结果](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/Jietu20191223-150317.png)

我们是怎么做到的，是通过 `app.get("/", callback)` 执行的回调函数返回的结果，那回调参数中的 `req` 和 `res` 又是什么呢？本文不作深入讲解，有兴趣的童鞋可以看看这篇 [手把手教你用 Node 实现 HTTP 协议](https://juejin.im/post/5dc020cc5188255faf60b372) 这里面对 `req` 和 `res` 的实现介绍的比较仔细，看完对 `HTTP` 协议的掌握也能更上一层楼。

即使不了解这些细节，我们也可以继续往下讲，你只需要把 `res.end()` 简单理解为一个向客户端发送数据的 `API` 即可。根据这个特点，我们就知道我们的四大金花要怎么做了，我们需要先定义四个路由，然后每个路由执行不同的回调函数，返回对应的金花即可。

> Tips：[点击下载四大金花源码](https://github.com/a1029563229/Blogs/tree/master/Introduction/node/express/static/)，将源码下载后放置在文件夹的 `static` 目录下即可。

![目录截图](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/Jietu20191223-152716@2x.png)

在 `const app = express()` 下加一行代码，将我们的 `static` 目录变成一个静态文件目录，这样可以保证我们的 `js` 和 `css` 文件能够被正确加载，加上了 `express.static` 就提供了文件服务器功能，将你的 `html` 文件放在 `static` 目录中就可以通过路径进行访问了！

```js
//...

// 使用 /static 路径作为我们的静态文件路由，static 作为我们的静态文件目录
app.use('/static', express.static('static'));
```

我们接下来只需要在访问路由时，将 `html` 文件作为相应返回给客户端即可，实际代码如下：

```js
const express = require("express");
const path = require("path");

const app = express();

app.use('/static', express.static('static'));

app.get("/", (req, res) => {
  res.end("Hello Express");
});

// 新增了四个路由，用于访问不同状态的金花
app.get("/happy", (req, res) => {
  // res.SendFile 响应一个本地文件
  // path.join 用于拼接一个路径
  // __dirname 是当前文件夹路径，属于 Node 的一个全局变量
  res.sendFile(path.join(__dirname, "./static/happy.html"))
})

app.get("/crazy", (req, res) => {
  res.sendFile(path.join(__dirname, "./static/crazy.html"))
})

app.get("/sexy", (req, res) => {
  res.sendFile(path.join(__dirname, "./static/sexy.html"))
})

app.get("/cool", (req, res) => {
  res.sendFile(path.join(__dirname, "./static/cool.html"))
})

app.listen(8888, () => {
  console.log("server is listening in http://localhost:8888")
})
```

重启一下服务，打开浏览器，分别输入以下四个地址，就可以看到不同状态的四朵小花了，赶紧试试吧！

- http://localhost:8888/happy
- http://localhost:8888/crazy
- http://localhost:8888/sexy
- http://localhost:8888/cool


## 案例展示：API 接口

接下来我们来实现一个 `API` 接口，它可以分页查询查询数据，还可以根据筛选条件返回对应的查询结果，就是我们平时和后端联调的那种“接口”，我们将在表现上保持一致。

首先我们使用 `npm install axios -s` 安装 `axios` 用于请求第三方链接，第三方数据将成为我们的数据来源。安装完成后，我们引入 `axios`，并且添加一个路由，用于返回接口数据，我们这么定义它：

```

```

## 案例展示：解决跨域问题


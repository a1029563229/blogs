# 使用 Docker 构建一个容器应用（一）

Docker 是一个可以将应用容器化的工具，可以简单的把容器理解为一个和羽毛一样轻的虚拟机，和传统的虚拟机不同，它并不会给系统带来太大的负担，并且有更高的可移植性和扩展性。在容器中应用将享有独立的文件系统，容器内的操作将不会影响到自身的主机系统，有点类似于三体中的小宇宙空间，在里面可以有高度的自由操作空间，并且已经预设了你喜欢的装修风格（应用运行所需的环境）！

我们将使用 Docker 来搭建一个最简单的 Node 容器化应用，这个镜像将会被我们打包，上传到自己的 Docker 仓库，并且可以开箱即用。想象这么一个场景，你的开发机器将这个应用进行容器化以后，在自己的服务器上将这个容器化的镜像下载后，使用一个命令就可以使你的应用在另一个完全不同的环境运行起来，节约下来的这些时间可以让我们做更多自己喜欢的事情，而不是钻研一个我们可能搞不定的 “Linux 环境问题”！

## 第一步：下载并安装 Docker

[下载地址](https://hub.docker.com/?overlay=onboarding)，希望这一步没有难倒你。

## 第二步：编写一个简单的 Node 应用

为了保持足够简单，我使用了 `Express`，它只有一个功能，在主页输出一个 `Hello Docker`，如果你对此有疑惑，可以参考 [源码仓库](https://github.com/a1029563229/Blogs/tree/master/Introduction/docker/docker/image)，也可以参考下面的代码：

```js
const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.end("Hello Docker!")
});

app.listen(8000, () => {
  console.log("server is starting in http://localhost:8000");
});
```

保险起见，我们最好使用 `node app.js` 测试一下这个应用是健康的，启动后浏览器打开 `http://localhost:8000`，我们可以顺利看到 Hello Docker! 被输出在屏幕上，看来一切在朝着我们期望的方向发展着。

## 第三步：将 Node 应用装箱打包成镜像

这一步可能会接触到你的知识盲区了，所以我们用一个比较简单轻松的风格来剖析每一步需要做的事情，将复杂的事情分解成多个简单的步骤，这是我们解决复杂问题的一贯方式。

我们在应用的同级目录下新建一个 `Dockerfile` 文件，让这个记录员帮我们记录我们接下来要做的事情。你的目录应该看起来跟我的基本一致：

![目录结构](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/Jietu20191126-183738@2x.png)

### 我们的应用需要什么？

我们第一个需要思考的问题是，我们的应用需要什么，我们可能知道，它需要一台计算机来运行，这个倒是不用担心，Docker 也需要计算机，它能有的我们都可以有。那我们的应用还需要什么呢，众所周知，Docker 是用 Go 语言实现的，那他会有 Node 的运行环境吗？

不，它没有，所以我们第一步是构建一个支持 Node 应用运行的环境，那我们就需要先在这个容器中放进去一个 Node，怎么放进去呢，一个简单的命令就可以了，在 `Dockerfile` 中新增一行：

```dockerfile
# 这句命令的作用是让我们的镜像在 node:10.16-alpine 镜像的基础上开始
# alpine 的包会比较小一点，功能也会少一点，但是已经可以满足我们的需求了
# 站在巨人的肩膀上
FROM node:10.16-alpine
```

### 我们需要在容器里做什么？

我们的记录员 `Dockerfile` 已经帮我们记录了第一步要做的事情，我们可以在第一步的基础上思考第二步要做的事情了。

在前面我们提到过，在容器中有一个自己的小宇宙，这个小宇宙虽然我们不常来，但是我们也应该希望它能够和大宇宙一样井井有条，所以呢，我们要在这个容器单独的文件系统中指定一个工作目录，以便我们将来能够在容器中尽快找到我们的应用，所以让我们的记录员加上一句：

```dockerfile
# 这句命令的作用是指定应用在容器中的工作目录
# 为我们的应用找到了一个干净的房间，它将在这里开始它的一生
WORKDIR /usr/src/app
```

指定了工作目录之后，我们希望把我们的应用在里面运行，这一步我们需要把我们的核心 `app.js` 挪到我们在 docker 中的工作目录中，一般来说我们会将整个应用放进去，所以我们需要加上一句命令：

```dockerfile
COPY . .
```

这样就可以了吗？如果你熟悉 `Node` 项目的话，你就会知道把所有文件都挪进去是不太明智的，至少要把 `node_modules` 留下，我们不需要亲自将这个“庞大笨重的机器”艰难的挪进去，我们只需要放进去“芯片(`app.js`)”和“使用说明(`package.json`)”就可以了，然后让我们的 docker 容器完成对依赖的安装。

所以我们在当前目录下新建一个 `.dockerignore` 文件，填入 `node_modules`，就像 `.gitignore` 那样！

既然我们已经把应用放进了容器，那么我们只需要像运行一个普通 `Node` 项目那样运行我们的项目就可以了，回忆一下，我们怎么运行我们的 `Node` 项目呢？第一步安装依赖，第二步 Run it!

那我们需要在 `package.json` 中的 `script` 选项中加入一行 `"start": "node app.js"`，为我们的项目指定一个启动入口。然后我们就可以让记录员记录最后的两句命令了：

```dockerfile
# 安装依赖
RUN npm install

# 定义应用的启动指令
CMD [ "npm", "start" ]
```

最终的完整版应该是这样的：

```dockerfile
FROM node:10.16-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install

CMD [ "npm", "start" ]
```

### 怎么将我们的应用打包成 Docker 镜像？

进入你的项目目录，运行一行命令

```bash
# 根据 Dockerfile 配置文件信息将应用打包成镜像
# 执行记录员记录的所有命令
docker image build -t myapp:1.0 .
```

在打包完成后，我们用 `docker image ls` 命令来看看这孩子长啥样

![myapp 镜像文件](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/Jietu20191213-095021@2x.png)

它只有 79.6M，相对于一个 VM 系统来说，它轻的像一根羽毛，而且还可以更小！

## 运行你的 Docker 容器！

实践是检验真理的唯一标准，我们来测试一下我们的容器，它能跑吗？

（如果你想要模拟在另一台电脑上运行，此刻你可以重启电脑了，重启后你得到的将会是一台全新的电脑！）

我们现在使用一行命令来运行我们的容器：

```bash
docker container run --publish 8888:8000 --detach --name app myapp:1.0
```

在打开浏览器之前，我们先剖析一下上面的这行命令：
- docker container run: 运行一个 docker 容器
- --publish: 将主机上的 8888 端口所接收的网络流量转发到容器内部的 8000 端口处理；（我们容器内的 8000 端口上运行着我们的应用）
- --detach: 在后台运行这个容器；
- --name: 为你的容器指定一个名称，以便你区分不同的容器；

解析完成后，我们此刻应该信心百倍，打开浏览器，输入 `http://localhost:8888`，我们成功了！

![它来了](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/Jietu20191127-102039.png)

[原文地址，欢迎收录](https://github.com/a1029563229/Blogs/tree/master/Introduction/docker/image)

[源码地址，欢迎收录](https://github.com/a1029563229/Blogs/tree/master/Introduction/docker/image)

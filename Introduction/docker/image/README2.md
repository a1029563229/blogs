# 使用 Docker 构建一个容器应用（二）

[上一章](https://github.com/a1029563229/Blogs/tree/master/Introduction/docker/image) 介绍了如何打包一个 Docker 镜像，这一章我们来讲解一下如何将自己打包的镜像发布到线上，然后实现镜像共享。

先来理一下思路，思路就是把我们本地打包的镜像放到云上，然后在其他任何地方从云上拉取这个镜像，然后镜像从云上拉下来以后就变成本地镜像了，本地镜像怎么跑大家应该都知道了。OK，我们马上开始：

## 第一步：将镜像上传到云

说到云，我们上传到哪个云呢？百度云，阿里云那都不太现实，我们使用 Docker 官方的云空间，[Docker Hub](https://hub.docker.com/) ，不过 Docker 云的私有镜像仓库超过一个是要收费的，所以你也可以自己搭建一个云空间，省点钱。

打开 [Docker Hub](https://hub.docker.com/) 先注册一个账号，注册完成后，我们点这个按钮，进入新建仓库界面：

![新建仓库按钮](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/Jietu20191130-113143.png)

为我们的仓库指定一个名字，就叫做 `helloworld` 吧，Docker 的仓库名不允许大写字母。

![新建仓库](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/Jietu20191130-113303.png)

现在开始准备我们的上传镜像吧，我们先用 `docker image ls` 列出我们的镜像，我们准备上传我们第一章打包的镜像 `myapp`

![myapp](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/Jietu20191130-113506%402x.png)

首先，我们在命令行输入 `docker login` 登录我们的 Docker 账号，然后我们为本地镜像指定一个远程仓库和镜像名称，我们这么写：

```bash
# 这行指令的意思就是为你的本地镜像指定一个远程的仓库和镜像名
# 就像是 FTP 协议会使用两个端口，一个用于控制，一个用于传输，现在就是控制的那一步，下一步将开始传输
# Docker Hub ID 就是你的 Docker 账号 ID，你应该可以在 Docker Hub 界面找到它！
docker image tag myapp:1.0 <Docker Hub ID>/helloworld:1.0
```

我们现在已经指定好了仓库名和镜像名称，我们现在进行上传工作

```bash
docker image push <Docker Hub ID>/helloworld:1.0
```

上传完成后打开我们的 Docker Hub 仓库界面，可以看到我们的镜像已经上传成功啦！

![上传成功](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/Jietu20191130-114310.png)

## 第二步：拉取镜像

拉取镜像这一步就比较简单了，想象你的镜像是一个著名的镜像，类似于 mysql、Node 这种大镜像，你现在就像使用知名镜像一样，使用自己的镜像吧！

```bash
# 拉取镜像
docker pull a1029563229/helloworld:latest

# 查看镜像列表
docker image ls
```

拉取完成后你就可以在镜像列表看到你的镜像了，现在我们来运行它吧！

```bash
# 运行容器
docker container run --publish 8888:8000 --detach --name helloworld a1029563229/helloworld:1.0

# 查看运行中的容器
docker ps
```

容器运行后，我们此刻应该信心百倍，打开浏览器，输入 `http://localhost:8888`，我们成功了！

![它来了](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/Jietu20191127-102039.png)

[原文地址，欢迎 Star](https://github.com/a1029563229/Blogs/tree/master/Introduction/docker/image/README2.md)

[源码地址，欢迎 Star](https://github.com/a1029563229/Blogs/tree/master/Introduction/docker/image/README2.md)

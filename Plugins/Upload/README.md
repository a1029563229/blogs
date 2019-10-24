# 图床工具（上传组件）的使用

## 介绍
我们一般都会有写博客的想法，写博客的话最好是需要图文结合的，而 markdown 是支持插入图片的，markdown 的图片支持以下三种方式：本地图片、网络图片、base 64，这里我们使用网络图片的方式，我们需要做以下准备工作：
  - 阿里云账号：阿里云的 oss 对象存储每个月有 5G 的免费流量，还赠送了一个域名用来访问图片；
  - [图床上传工具](https://github.com/a1029563229/plugins)：集成了 oss 对象存储功能，并且可以映射本地目录到远程目录（可以简单理解为 git 的目录映射）
  - [Node运行环境](http://nodejs.cn/)：图床上传工具使用 Node 开发

## oss 对象存储
对象存储(Object Storage Service,简称OSS),是阿里云对外提供的海量、安全和高可靠的云存储服务。我们使用阿里云的 oss 服务存储图片。我们需要先[登录阿里云](https://account.aliyun.com/login/login.htm?oauth_callback=https%3A%2F%2Fhomenew.console.aliyun.com%2F)，我是直接通过支付宝账号登录的。

（如果没有进入控制台，则[点击此处进入控制台](https://homenew.console.aliyun.com/)）阿里云的控制台页面应该是这样的，我们点击进入对象存储 OSS（如下图）

![阿里云控制](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/plugins/upload/1.png)

进入到控制台后，我们需要创建一个 bucket（空间）来承载我们的图片，点击此处新建

![新建 bucket](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/plugins/upload/2.png)

在新建时，Bucket 名称需要具有唯一性（该参数在图床工具需要用到），我一般是使用一个前缀来区分，并没有其他限制。区域的话，根据自己需要来选择即可（区域参数也在图床工具需要用到），这里我使用的是深圳节点。重点是读写权限，我们需要设置为公共读，这样我们的图片才能通过被外网正常访问，如下图

![新建 bucket](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/plugins/upload/3.png)

接下来我们需要[新建一个 Access Key](https://usercenter.console.aliyun.com/#/manage/ak)，在这个界面我们可以拿到 AccessKey ID 和 Access Key Secret	，这两个参数在图床工具中也会用到。（如下图）

![AccessKey](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/plugins/upload/4.png)

到此步为止，我们的 oss 对象存储空间就创建好了，下一步我们开始配置图床工具。

## 图床工具
首先将[图床上传工具](https://github.com/a1029563229/plugins)下载到本地，然后使用 `npm install` 进行依赖的安装。

我们需要新建 `config/config.json` 文件进行 oss 的配置
```es6
    {
      "oss": {
        "region": "", // bucket 所在的 region，例如深圳的节点为 oss-cn-shenzhen，可在阿里云查询 oss 对应的 region（第一步的参数）
        "accessKeyId": "", // 阿里云 oss 提供的 accessKeyId（第一步的参数）
        "accessKeySecret": "", // 阿里云 oss 提供的 accessKeyId（第一步的参数）
        "bucket": "", // 阿里云 oss 的 bucket（第一步的参数）
        "localResourceDir": "", // 读取的本地图片文件夹；default: images
        "allowFile": "" // 允许的图片格式，用逗号隔开；default: png,jpg
      }
    }
```
配置文件创建完成后，我们需要创建本地的图片存放目录，文件夹的名称就是配置文件中的 `localResourceDir`, 如果没有配置该参数的话，默认读取的是根目录下的 `images` 文件夹。

这里以本文示例，在第一步中使用的四张图片地址分别是
`http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/plugins/upload/1.png`
`http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/plugins/upload/2.png`
`http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/plugins/upload/3.png`
`http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/plugins/upload/4.png`

其中，`http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/` 是阿里云提供的一个子域名，而后面的 `images/blogs/plugins/upload/1.png` 则是本地目录的映射，对应关系如下图

![文件目录](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/plugins/upload/5.png)

我们在按照路径放置图片后，执行 `npm run upload` 命令进行上传，控制台会返回上传后的路径，如下图

![文件地址列表](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/plugins/upload/6.png)

直接使用控制台输出的路径，就可以使用图片了！

下一章介绍图床工具的实现，手把手教你学会使用 `Node` 写一个图床工具！

喜欢的话给一颗 star 吧（[图床上传工具](https://github.com/a1029563229/plugins)和[博文](https://github.com/a1029563229/Blogs/tree/master/Plugins/Upload)属于原创），这个对我真的很重要，谢谢了！
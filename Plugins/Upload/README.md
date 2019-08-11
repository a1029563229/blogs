# 图床工具（上传组件）的使用

## 介绍
我们一般都会有写博客的想法，写博客的话最好是需要图文结合的，而 markdown 是支持插入图片的，markdown 的图片支持以下三种方式：本地图片、网络图片、base 64，这里我们使用网络图片的方式，我们需要做以下准备工作：
  - 阿里云账号：阿里云的 oss 对象存储每个月有 5G 的免费流量，还赠送了一个域名用来访问图片；
  - [图床上传工具](https://github.com/a1029563229/plugins)：集成了 oss 对象存储功能，并且可以映射本地目录到远程目录（可以简单理解为 git 的目录映射）

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
到此步为止，我们的 oss 对象存储空间就创建好了，
# 图床工具的实现-基础篇
在上一章，我们介绍了[图床工具（上传组件）的使用](https://github.com/a1029563229/Blogs/tree/master/Plugins/Upload)，这一章，我们来解析图床工具的实现，手把手教你写一个图床工具（Node 小工具）。

在教学开始前，我们需要准备：
  - [Node运行环境](http://nodejs.cn/)：图床上传工具使用 Node 开发

我们希望你掌握以下知识：

（以下知识也可以跳过，直接开始学习本教程；掌握是为了更好的理解）
  - [es6 基本语法](http://es6.ruanyifeng.com/)
  - [fs 模块（Node 核心模块）](http://nodejs.cn/api/fs.html)
  - [path 模块（Node 核心模块）](http://nodejs.cn/api/path.html)

我们的基本目标
- 对基本的文件格式进行限制；
- 可指定上传目录，完成本地目录与远程目录映射；
- 图片上传功能；

我们的进阶目标：
- 将上传组件解耦，做成可配置项；
- 将上传组件制作成图床工具，将配置与组件解耦，由外部实现调用；
- 提供 windows 与 mac 双平台的脚本，使非技术人员可以通过该脚本配置公司静态资源；（如 banner 图、广告图）

（以下代码实现保存在 [插件合集](https://github.com/a1029563229/plugins/tree/master/src/upload) 中的 demo 目录下）

## 基本目标
我们的第一个目标是可指定上传目录，完成本地目录与远程目录映射，我们需要完成这个目标的话，我们需要有一个本地目录，所以我们在根目录下新建一个本地目录，取名为 `images`，我们再预设置一些目录及图片文件，具体如下

![图片目录](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/plugins/upload/source/1.png)

现在我们的目标是要将本地目录的图片文件上传至远程目录，我们假设本地目录地址为 `local_url`，远程目录为 `remote_url`, 那么本地目录文件就是 `local_url/images/blogs/plugins/upload/1.png`，我们需要将该目录上传到远程目录的 `remote_url/images/blogs/plugins/upload/1.png`。

所以我们第一步就是需要解析本地目录，并且将本地目录的图片文件都解析出来。

我们新建 `src/upload/index.js`，先定义支持的图片格式
```es6
const DEFAULT_ALLOW_FILE = ["png", "jpg"];
```
定义好了支持的图片格式后，我们开始对目录进行检索
```es6
// fs 模块，用于读取目录与文件
const fs = require('fs');
// path 模块，用于解析和拼装路径
const path = require('path');

const DEFAULT_ALLOW_FILE = ["png", "jpg"];

/**
 * 读取目录下的图片文件，收集在 images 中
 * @param {*} entry 入口
 * @param {*} images 图片集合
 */
function readDir(entry, images = []) {
  const dirInfo = fs.readdirSync(entry);
  for (let i = 0; i < dirInfo.length; i++) {
    const item = dirInfo[i];
    // 拼装出文件/文件夹的路径
    const location = path.join(entry, item);
    const isDir = fs.statSync(location).isDirectory();
    // 如果为文件夹则继续递归向下查询
    if (isDir) {
      readDir(location, images);
      // 判断是否为所允许的图片格式
    } else if (DEFAULT_ALLOW_FILE.some(allowScheme => location.endsWith(allowScheme))) {
      images.push(location);
    }
  }
  return images;
}

// 定义检索的入口文件夹（ images 文件夹）
const staticDirPath = path.join(__dirname, '../..', 'images');
const images = readDir(staticDirPath);
console.log(images);
```

我们使用 `node src/upload/index.js` 命令执行该脚本，最后检索出来的 `images` 是个数组，包含了本地 `images` 下所有的图片文件路径，也就是我们需要的 `local_url/image_path` 集合。

现在我们开始最后一步，开始上传，阿里云 oss 提供了一个库 —— `ali-oss`，我们使用 npm 进行安装，然后我们在头部导入
```es6
const OSS = require("ali-oss");
```

然后我们根据阿里云提供的 API，编写上传的代码
```es6
//...
// Convert Windows backslash paths to slash paths
const slash = require('slash');
const OSS = require("ali-oss");

//...
// 这些配置参数在上一章已经进行说明，不再复述
const client = new OSS({
  "region": "<your config>",
  "accessKeyId": "<your config>",
  "accessKeySecret": "<your config>",
  "bucket": "<your config>",
});

async function upload() {
  for (let i = 0; i < images.length; i++) {
    // slash 是为了兼容 windows 平台的路径划分符为 \ 的特性
    const local_url = slash(images[i]);
    // 阿里云 OSS 目标文件名
    // local_url.split() 是为了去除本地目录的前缀
    const remote_url = `images${local_url.split(staticDirPath)[1]}`;
    // 按顺序依次上传文件
    const result = await client.put(remote_url, local_url)
    console.log(`${result.url} 上传成功`);
  }
  console.log("所有文件上传成功");
}

upload();
```

我们使用 `node src/upload/index.js` 命令执行该脚本，下面可以看到执行结果（我的目录与教学的目录不同，所以执行的命令也不一致，可到该地址查看 [我的源码](https://github.com/a1029563229/plugins/tree/master/src/upload/demo)）
![上传成功](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/plugins/upload/source/2.png)

至此，我们基本目标已经实现，进阶目标希望是由读者亲自完成，也算是对 `Node` 的一个练习巩固。

喜欢的话给一颗 star 吧（[图床上传工具](https://github.com/a1029563229/plugins)和[博文](https://github.com/a1029563229/Blogs/tree/master/Plugins/Upload/Source)均属于原创）。

Star 超过 5 颗我将马上尽快更新进阶篇，教你如何解耦组件，创建一个非技术人员也能使用的图床工具。
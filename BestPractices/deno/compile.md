# Deno 新特性：可将 Nodejs 程序直接打包成可执行二进制文件

Deno 最近发布了 1.34 版本，其中发布了一个看起来很不错的新特性：`deno` 支持编译 `npm` 包了！

这意味着，我们可以使用 `deno` 将 `nodejs` 程序直接编译成可执行二进制文件。

同时，也相当于开放了多种新玩法：

  1. 将二进制文件直接打包成 `docker` 镜像，更小的体积和更快的运行速度...
  2. 将提效工具编译成可执行文件直接丢给运营、测试同学，他们可以直接使用了...
  3. 跨平台能力等等

## 实战：使用 Deno 搭建一个支持 `history` 路由模式的服务器

在以前，我习惯用 `go` 写一个最小的可运行服务，用于支持放置我的 `history` 前端应用。

这会引入一些 `go` 的学习成本，以及遇到问题时的调试成本。

现在，我可以用我熟悉的 `node` 来编写这个服务器，然后使用 `deno` 将其直接编译成可执行二进制文件。

我先使用 `node` 编写了一个支持 `history` 路由的服务。

```js
```

使用 `node index.js` 运行服务后，我放置一个使用 `vue3` 构建的前端项目来测试验证下，我的两个路由都是可以正常访问的。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images%5Cimages%5C%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230602112015.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images%5Cimages%5C%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230602112038.png)

那我现在使用 `deno compile --allow-read index.js` 将我的服务进行编译。

编译后，发现还是有问题的，`deno` 并不能完全识别 `node` 的写法，并且在一些基础设施例如 `express.static` 等文件读取系统上，还存在差异，导致下面这些错误。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images%5Cimages%5C%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230602161027.png)

折腾了一阵子后，我放弃了。
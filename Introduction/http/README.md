# 手把手教你用 Node 实现 HTTP 协议（一）

在开始文章前，我们需要对一些基础知识有一些了解，比如 HTTP 协议是什么，HTTP 报文的格式，HTTP 协议的基础等等；

本篇文章将会使用到以下知识，希望读者在开始阅读前对基础知识有一些掌握：
- Node 的基本用法；
- Typescript 语法的基本理解；
- Postman 的基本使用方法；

我们最终的目标是实现由接口工具 Postman 发起一个请求，我们的 http 协议将请求的信息解析完成后，由我们的 http 服务端返回一个请求信息的 JSON 字符串，效果图如下：

![最终效果图](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/http/1.png)

我们的代码最终调用效果如下：

```ts
import http from './src/Http';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(200, JSON.stringify(req.httpMessage));
});

server.listen(8888, () => {
  console.log("server is listening in 8888...");
});
```

有些朋友可能觉得上面的代码有点眼熟，其实上面的代码调用看起来就像是 Node 的 `http` 模块，我们这个教程的目的也可以说是实现一个 `http` 模块，可以接受 HTTP 请求，并且响应处理结果。

现在我们先来了解几个开头提到的基础知识：

- HTTP 协议是什么？
  - HTTP是一个属于应用层的面向对象的协议，由于其简捷、快速的方式，适用于分布式超媒体信息系统。
  - 我们使用 HTTP 协议规范来完成客户与服务器之间的通信，形象一点的说就是通信的双方需要按照规范来进行通信。
  - 比如状态码就是一个规范，状态码规定了 1xx~5xx 代表的含义，500 通常代表服务器内部错误，然而你也可以用 500 代表服务器成功处理，但是这样就属于不遵守规范了。
  - HTTP 协议就是由一些预定义的规范所组成的最佳实践，实现 HTTP 协议换个说法就是用代码实现这些规范，遵循 HTTP 协议规范的双方可以进行通信。
- HTTP 报文的格式
  - 如果说 HTTP 是因特网的信使，那么 HTTP 报文就是它用来搬东西的包裹。
  - HTTP 报文是简单的格式化数据块。它们由三部分组成：对报文进行描述的起始行（start line）、包含属性的首部（header）块、以及可选的包含数据的主体（body）部分。
  - 起步行和首部就是由行分隔的 ASCII 文本。每行都以一个 由两个字符组成的行终止序列作为结束，其中包括一个回车符（ASCII 码 13）和一个换行符（ASCII 码 10）。这个行终止序列可以写作 CRLF。
  - 报文的语法
    - 请求报文的格式 <method><request-URL><version> CRLF <headers> CRLF <entity-body>
    - 响应报文的格式 <version><status><reason-phrase> CRLF <headers> CRLF <entity-body>
- HTTP 协议的基础
  - HTTP 协议遵循 TCP/IP 协议簇规范，属于 TCP/IP 中的应用层协议，建立在 TCP 可靠协议的基础上，处理 TCP 通信中的字节流，将字节流转换成有意义的 HTTP 协议规范。
  - Node 的 `net` 模块用于创建基于流的 TCP 或 IPC 的服务器，所以我们会在 `net` 模块的（TCP）基础上实现 HTTP 协议。

从上面的几点可以看出，我们最主要的任务有两个，第一是建立 TCP 通信管道用于客户端与服务器的全双工通信，第二就是解析 HTTP 报文。由于 TCP 协议已经被 Node 的 `net` 模块封装好了，所以我们下一章重点讲述对 HTTP 报文的解析。
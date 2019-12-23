# Express 的基本使用，前端进阶 Node 的第一课

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

如果对这些优点感兴趣的话，我们的学习将从下面这个例子开始，我们花出一朵小花，然后用不同的路由去访问小花的四种心情状态，学会基础的“响应数据请求”，最后我们完成一个可供交互的“接口”（对，就是工作中前后端联调的那种接口）。

<br />
<center class="half">
    <img src="http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/gif/2.gif" width="200"/><img src="http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/gif/3.gif" width="200"/><img src="http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/gif/4.gif" width="200"/><img src="http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/gif/5.gif" width="200"/>
</center>


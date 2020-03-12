# React 服务端渲染实战，Next 最佳实践

服务端渲染有两个特点：
  - 响应快，用户体验好，首屏渲染快
  - 对搜索引擎友好，搜索引擎爬虫可以看到完整的程序源码，有利于SEO

如果你的站点或者公司未来的站点需要用到服务端渲染，那么本文将会是非常适合你的一篇入门实战实践教学。本文采用 `next` 框架进行服务器渲染框架的搭建，最终将完成几个目标：
  1. 项目结构的划分；
  2. 服务端渲染的网站；
  3. 登录鉴权以及路由的处理；
  4. 对报错信息的处理；

本文的最终目标是所有人都能跟着这篇教程搭建自己的（第）一个服务端渲染项目，那么，开始吧。

## 第一个 Hello World 页面

我们先新建一个目录，名为 `jt-gmall`，然后进入目录，在目录下新建 `package.json`，添加以下内容：

```json
{
  "scripts": {
    "start": "next",
    "build": "next build",
    "serve": "next start"
  }
}
```

然后我们需要安装相关依赖：

> antd 是一个 UI 组件库，为了让页面更加美观一些。
>
> 由于相关依赖比较多，安装过程可能会比较久，建议切个淘宝镜像，会快一点。

```bash
npm i next react react-dom antd -S
```

依赖安装完成后，在目录下新建 `pages` 文件夹，同时在该文件夹下创建 `index.jsx`

```js
const Home = () => <section>Hello Next!</section>

export default Home;
```

在 `next` 中，每个 `.js` 文件将变成一个路由，自动处理和渲染，当然也可以自定义，这个在后面的内容会讲到。

我们运行 `npm start` 启动项目并打开 `http://localhost:3000`，此时可以看到 `Hello Next!` 被显示在页面上了。

我们第一步已经完成，但是我们会感觉这和我们平时的写法差异不大，那么实现上有什么差异吗？在打开控制台查看差异之前，我们先思考一个问题，SEO 的优化是怎么做到的，我们需要站在爬虫的角度思考一下，爬虫爬取的是网络请求获取到的 `html`，`一般来说（大部分）`的爬虫并不会去执行或者等待 Javascript 的执行，所以说网络请求拿到的 `html` 就是他们爬取的 `html`。

我们先打开一个普通的 `React` 页面（客户端渲染），打开控制台，查看 `network` 中，对主页的网络请求的响应结果如下：

![客户端渲染页面](https://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/react-ssr/1.png)

我们从图中可以看出，客户端渲染的 `React` 页面只有一个 `id="app"` 的 `div`，它作为容器承载渲染 `react` 执行后的结果（虚拟 DOM 树），而普通的爬虫只能爬取到一个 `id="app"` 的空标签，爬取不到任何内容。我们再看看由服务端渲染，也就是我们刚才的 `next` 页面返回的内容是什么：

![服务端渲染页面](https://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/react-ssr/1.png)

这样看起来就很清楚了，爬虫从客户端渲染的页面中只能爬取到一个无信息的空标签，而在服务端渲染的页面中却可以爬取到有价值的信息内容，这就是服务端渲染对 SEO 的优化。那么在这里再提出两个问题：
  1. 服务端渲染可以对 `AJAX` 请求的数据也进行 SEO 优化吗？
  2. 服务端渲染对首屏加载的渲染提升体现在何处？

先解答第一个问题，答案是当然可以，但是需要继续往下看，所以我们进入后面的章节，对 `AJAX` 数据的优化以及首屏渲染的优化逻辑。

## 对 AJAX 异步数据的 SEO 优化

本文的目的不止是教会你如何使用，还希望能够给大家带来一些认知上的提升，所以会涉及到一些知识点背后的探讨。我们先回顾第一章的问题，`服务端渲染可以对 AJAX 请求的数据也进行 SEO 优化吗？`，答案是可以的，那么如何实现，我们先捋一捋这个思路。

首先，我们知道要优化 SEO，就是要给爬虫爬取到有用的信息，而我们不能控制爬虫等待我们的 `AJAX` 请求完毕再进行爬取，所以我们需要直接提供给爬虫一个完整的包含数据的 `html` 文件，怎么给？答案已经呼之欲出，对应我们的主题 `服务端渲染`，我们需要在服务端完成 `AJAX` 请求，并且将数据填充在 `html` 中，最后将这个完整的 `html` 让爬虫爬取。

> 知识点补充: 谁可以做到执行 `js` 文件，完成 `ajax` 请求，并且将内容按照预设逻辑填充在 `html` 中，那便是浏览器的 `js 引擎`，谷歌使用的是 `v8` 引擎，而 `Nodejs` 内置也是 `v8` 引擎，所以其实 `next` 内部也是利用了 `Nodejs` 的强大特性（可运行在服务端、可执行 `js` 代码）完成了服务端渲染的功能。

下面开始实战部分，我们新建文件 `./pages/vegetables/index.jsx`，对应的页面是 `http://localhost:3000/vegetables`

```js
// ./pages/vegetables/index.jsx
import React, { useState, useEffect } from "react";
import { Table, Avatar } from "antd";

const { Column } = Table;

const Vegetables = () => {
  const [data, setData] = useState([{ _id: 1 }, { _id: 2 }, { _id: 3 }]);

  return <section style={{ padding: 20 }}>
    <Table dataSource={data} pagination={false} >
      <Column render={text => <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} />
      <Column key="_id" />
    </Table>
  </section>
}

export default Vegetables;
```

进入 `vegetables` 页面后发现我们的组件已经渲染，这也对应了我们开头所说的 `next` 路由规则，但是我们发现这个布局有点崩，这是因为我们还没有引入 css 的原因，我们新建 `./pages/_app.jsx`

```js
import App from 'next/app'
import React from 'react'
import 'antd/dist/antd.css';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return <>
      <Component {...pageProps} />
    </>
  }
}
```

这个文件是 `next` 官方指定用来初始化的一个文件，具体的内容我们后面会提到。现在再看看页面，这个时候你的布局应该就好看多了。

![页面效果](https://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/react-ssr/3.png)

当然这是静态数据，打开控制台也可以看到数据都已经被完整渲染在 `html` 中，那我们现在就开始获取异步数据，看看是否还可以正常渲染。此时需要用到 `next` 提供的一个 API，那就是 `getInitialProps`，你可以简单理解为这是一个在服务端执行生命周期函数，主要用于获取数据，在 `./pages/_app.jsx` 中添加以下内容，最终修改后的结果如下：

> 由于我们的代码可能运行在服务端也可能运行在客户端，但是服务端与不同客户端环境的不同导致一些 API 的不一致，`fetch` 就是其中之一，在 `Nodejs` 中并没有实现 `fetch`，所以我们需要安装一个插件 `isomorphic-fetch` 以进行自动的兼容处理。
> 
> 请求数据的格式为 `graphql`，有兴趣的童鞋可以自己去了解一下，请求数据的地址是我自己的小站，方便大家做测试使用的。


```js
import React, { useState } from "react";
import { Table, Avatar } from "antd";
import fetch from "isomorphic-fetch";

const { Column } = Table;
const Vegetables = ({ vegetableList }) => {
  if (!vegetableList) return null;

  // 设置页码信息
  const [pageInfo, setPageInfo] = useState({
    current: vegetableList.page,
    pageSize: vegetableList.pageSize,
    total: vegetableList.total
  });
  // 设置列表信息
  const [data, setData] = useState(() => vegetableList.items);

  return <section style={{ padding: 20 }}>
    <Table rowKey="_id" dataSource={data} pagination={pageInfo} >
      <Column dataIndex="poster" render={text => <Avatar src={text} />} />
      <Column dataIndex="name" />
      <Column dataIndex="price" render={text => <>￥ {text}</>} />
    </Table>
  </section>
}

const fetchVegetable = (page, pageSize) => {
  return fetch("http://dev-api.jt-gmall.com/mall", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // graphql 的查询风格
    body: JSON.stringify({ query: `{ vegetableList (page: ${page}, pageSize: ${pageSize}) { page, pageSize, total, items { _id, name, poster, price } } }` })
  }).then(res => res.json());
}

Vegetables.getInitialProps = async ctx => {
  const result = await fetchVegetable(1, 10);

  // 将查询结果返回，绑定在 props 上
  return result.data;
}

export default Vegetables;
```

效果图如下，数据已经正常显示

![效果图](https://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/react-ssr/4.png)

下面我们来好好捋一捋这一块的逻辑，如果打开控制台刷新页面会发现在 `network` 控制台看不到这个请求的内容，这是因为我们的请求是在服务端发起的，并且在下图也可以看出，所有的数据也在 `html` 中被渲染，所以此时的页面可以正常被爬虫抓取。

那么由此就可以解答上面提到的第二个问题，`服务端渲染对首屏加载的渲染提升体现在何处？`，答案是以下两点：

  1. `html` 中直接包含了数据，客户端可以直接渲染，无需等待异步 `ajax` 请求导致的白屏/空白时间，一次渲染完毕；
  2. 由于 `ajax` 在服务端发起，我们可以在前端服务器与后端服务器之间搭建快速通道（如内网通信），大幅度提升通信/请求速度；

我们现在来完成第二章的最后内容，`分页数据的加载`。服务端渲染的初始页面数据由服务端执行请求，而后续的请求（如交互类）都是由客户端继续完成。

我们希望能实现分页效果，那么只需要添加事件监听，然后处理事件即可，代码实现如下：

```js
// ...

const Vegetables = ({ vegetableList }) => {
  if (!vegetableList) return null;

  const fetchHandler = async page => {
    if (page !== pageInfo.current) {
      const result = await fetchVegetable(page, 10);
      const { vegetableList } = result.data;
      setData(() => vegetableList.items);
      setPageInfo(() => ({
        current: vegetableList.page,
        pageSize: vegetableList.pageSize,
        total: vegetableList.total,
        onChange: fetchHandler
      }));
    }
  }
  // 设置页码信息
  const [pageInfo, setPageInfo] = useState({
    current: vegetableList.page,
    pageSize: vegetableList.pageSize,
    total: vegetableList.total,
    onChange: fetchHandler
  });

  //...
}
```
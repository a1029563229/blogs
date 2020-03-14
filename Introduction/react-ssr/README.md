# React 服务端渲染实战，Next 最佳实践

开门见山的说，服务端渲染有两个特点：
  - 响应快，用户体验好，首屏渲染快
  - 对搜索引擎友好，搜索引擎爬虫可以看到完整的程序源码，有利于SEO

如果你的站点或者公司未来的站点需要用到服务端渲染，那么本文将会是非常适合你的一篇入门实战实践教学。本文采用 `next` 框架进行服务器渲染框架的搭建，最终将完成几个目标：
  1. 项目结构的划分；
  2. SEO 优化以及首屏加载速度的提升；
  4. 登录鉴权以及路由的处理；
  5. 对报错信息的处理；

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

我们第一步已经完成，但是我们会感觉这和我们平时的写法差异不大，那么实现上有什么差异吗？

在打开控制台查看差异之前，我们先思考一个问题，`SEO 的优化`是怎么做到的，我们需要站在`爬虫的角度`思考一下，爬虫爬取的是网络请求获取到的 `html`，`一般来说（大部分）`的爬虫并不会去执行或者等待 Javascript 的执行，所以说网络请求拿到的 `html` 就是他们爬取的 `html`。

我们先打开一个普通的 `React` 页面（客户端渲染），打开控制台，查看 `network` 中，对主页的网络请求的响应结果如下：

![客户端渲染页面](https://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/react-ssr/1.png)

我们从图中可以看出，客户端渲染的 `React` 页面只有一个 `id="app"` 的 `div`，它作为容器承载渲染 `react` 执行后的结果（虚拟 DOM 树），而普通的爬虫只能爬取到一个 `id="app"` 的空标签，爬取不到任何内容。

我们再看看由服务端渲染，也就是我们刚才的 `next` 页面返回的内容是什么：

![服务端渲染页面](https://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/react-ssr/2.png)

这样看起来就很清楚了，爬虫从客户端渲染的页面中只能爬取到一个`无信息的空标签`，而在服务端渲染的页面中却可以爬取到`有价值的信息内容`，这就是服务端渲染对 SEO 的优化。那么在这里再提出两个问题：
  1. 服务端渲染可以对 `AJAX` 请求的数据也进行 SEO 优化吗？
  2. 服务端渲染对首屏加载的渲染提升体现在何处？

先解答第一个问题，答案是当然可以，但是需要继续往下看，所以我们进入后面的章节，对 `AJAX` 数据的优化以及首屏渲染的优化逻辑。

## 对 AJAX 异步数据的 SEO 优化

本文的目的不止是教会你如何使用，还希望能够给大家带来一些认知上的提升，所以会涉及到一些知识点背后的探讨。

我们先回顾第一章的问题，`服务端渲染可以对 AJAX 请求的数据也进行 SEO 优化吗？`，答案是可以的，那么如何实现，我们先捋一捋这个思路。

首先，我们知道要优化 SEO，就是要给爬虫爬取到有用的信息，而我们不能控制爬虫等待我们的 `AJAX` 请求完毕再进行爬取，所以我们需要直接提供给爬虫一个完整的包含数据的 `html` 文件，怎么给？答案已经呼之欲出，对应我们的主题 `服务端渲染`，我们需要在服务端完成 `AJAX` 请求，并且将数据填充在 `html` 中，最后将这个完整的 `html` 让爬虫爬取。

> 知识点补充: 可以做到执行 `js` 文件，完成 `ajax` 请求，并且将内容按照预设逻辑填充在 `html` 中，需要浏览器的 `js 引擎`，谷歌使用的是 `v8` 引擎，而 `Nodejs` 内置也是 `v8` 引擎，所以其实 `next` 内部也是利用了 `Nodejs` 的强大特性（可运行在服务端、可执行 `js` 代码）完成了服务端渲染的功能。

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

下面我们来好好捋一捋这一块的逻辑，如果你此时打开控制台刷新页面会发现在 `network` 控制台看不到这个请求的相关信息，这是因为我们的请求是在服务端发起的，并且在下图也可以看出，所有的数据也在 `html` 中被渲染，所以此时的页面可以正常被爬虫抓取。

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

![html](https://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/react-ssr/5.png)

![数据翻页](https://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/react-ssr/6.png)

到这里，大家应该对 `next` 和服务端渲染已经有了一个初步的了解。服务端渲染简单点说就是在服务端执行 `js`，将 `html` 填充完毕之后再将完整的 `html` 响应给客户端，所以服务端由 `Nodejs` 来做再合适不过，`Nodejs` 天生就有执行 `js` 的能力。

我们下一章将讲解如何使用 `next` 搭建一个需要鉴权的页面以及鉴权失败后的自动跳转问题。

## 路由拦截以及鉴权处理

我们在工作中经常会遇到路由拦截和鉴权问题的处理，在客户端渲染时，我们一般都是将鉴权信息存储在 `cookie、localStorage` 进行本地持久化，而服务端中没有 `window` 对象，在 `next` 中我们又该如何处理这个问题呢？

我们先来规划一下我们的目录，我们会有三个路由，分别是：
  - 不需要鉴权的 `vegetables` 路由，里面包含了一些所有人都可以访问的实时菜价信息；
  - 不需要鉴权的 `login` 路由，登录后记录用户的登录信息；
  - 需要鉴权的 `user` 路由，里面包含了登录用户的个人信息，如头像、姓名等，如果未登录跳转到 `user` 路由则触发自动跳转到 `login` 路由；

我们先对 `./pages/_app.jsx` 进行一些改动，加上一个导航栏，用于跳转到对应的这几个页面，添加以下内容：

```js
//...
import { Menu } from 'antd';
import Link from 'next/link';

export default class MyApp extends App {
  //...

  render() {
    const { Component, pageProps } = this.props
    return <>
      <Menu mode="horizontal">
          <Menu.Item key="vegetables"><Link href="/vegetables"><a>实时菜价</a></Link></Menu.Item>
          <Menu.Item key="user"><Link href="/user"><a>个人中心</a></Link></Menu.Item>
      </Menu>
      <Component {...pageProps} />
    </>
  }
}
```

![数据翻页](https://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/react-ssr/8.png)

加上导航栏以后，效果如上图。如果这时候你点击个人中心会出现 `404` 的情况，那是因为我们还没有创建这个页面，我们现在来创建 `./pages/user/index.jsx`：

```js
// ./pages/user/index.jsx

import React from "react";
import { Descriptions, Avatar } from 'antd';
import fetch from "isomorphic-fetch";

const User = ({ userInfo }) => {
  if (!userInfo) return null;

  const { nickname, avatarUrl, gender, city } = userInfo;
  return (
    <section style={{ padding: 20 }}>
      <Descriptions title={`欢迎你 ${nickname}`}>
        <Descriptions.Item label="用户头像"><Avatar src={avatarUrl} /></Descriptions.Item>
        <Descriptions.Item label="用户昵称">{nickname}</Descriptions.Item>
        <Descriptions.Item label="用户性别">{gender ? "男" : "女"}</Descriptions.Item>
        <Descriptions.Item label="所在地">{city}</Descriptions.Item>
      </Descriptions>
    </section>
  )
}

// 获取用户信息
const getUserInfo = async (ctx) => {
  return fetch("http://dev-api.jt-gmall.com/member", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // graphql 的查询风格
    body: JSON.stringify({ query: `{ getUserInfo { nickname avatarUrl city gender } }` })
  }).then(res => res.json());
}

User.getInitialProps = async ctx => {
  const result = await getUserInfo(ctx);
  // 将 result 打印出来，因为未登录，所以首次进入这里肯定是包含错误信息的
  console.log(result);

  return {};
}

export default User;
```

组件编写完毕后，我们进入 `http://localhost:3000/user`。此时发现页面是空白的，是因为进入了 `if (!userInfo) return null;` 这一步的逻辑。我们需要看看控制台的输出，发现内容如下：

> 因为请求发生在服务端的 `getInitialProps`，此时的输出是在命令行输出的，并不会在浏览器控制台输出，写服务端渲染的项目这一点要习惯。

```js
{ 
  errors:
   [ 
     { message: '401: No Auth', locations: [Array], path: [Array] } 
    ],
  data: { getUserInfo: null } 
}
```

拿到报错信息之后，我们只需要处理报错信息，然后在出现 `401` 登录未授权时跳转到登录界面即可，所以在 `getInitialProps` 函数中再加入以下逻辑：

```js
import Router from "next/router";

// 重定向函数
const redirect = ({ req, res }, path) => {
  // 如果包含 req 信息则表示代码运行在服务端
  if (req) {
    res.writeHead(302, { Location: path });
    res.end();
  } else {
    // 客户端跳转方式
    Router.push(path);
  }
};

User.getInitialProps = async ctx => {
  const result = await getUserInfo(ctx);
  const { errors, data } = result;
  // 判断是否为鉴权失败错误
  if (errors && errors.length > 0 && errors[0].message.startsWith("401")) {
    return redirect(ctx, '/login');
  }

  return { userInfo: data.getUserInfo };
}
```

> 这里格外需要注意的一点就是，你的代码可能运行在服务端也可能运行在客户端，所以在很多地方需要进行判断，执行对应的函数，这样才是一个具有健壮性的服务端渲染项目。在上面的例子中，重定向函数就对环境进行了判断，从而执行对应的跳转方法，防止页面出错。

现在刷新页面，我们应该跳转到了登录页面，那么我们现在就来把登录页面实现一下，鉴于方便实现，我们登录界面只放一个登录按钮，完成登录功能，实现如下：

```js
// ./pages/login/index.jsx
import React from "react";
import { Button } from "antd";
import Router from "next/router";
import fetch from "isomorphic-fetch";

const Login = () => {
  const login = async () => {
    const result = await fetch("http://dev-api.jt-gmall.com/member", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: `{ loginQuickly { token } }` })
    }).then(res => res.json());

    // 打印登录结果
    console.log(result);
  }
  
  return (
    <section style={{ padding: 20 }}>
      <Button type="primary" onClick={login}>一键登录</Button>
    </section>
  )
}

export default Login;
```

代码写到这里就可以先停一下，思考一下问题了，打开页面，点击一键登录按钮，这时候控制会输出响应结果如下：

```js
{
  "data": {
    "loginQuickly": {
      "token": "7cdbd84e994f7be693b6e578549777869e086b9db634363635e2f29b136df1a1"
    }
  }
}
```

登录拿到了一个 `token` 信息，现在我们的问题就变成了，如何存储 `token`，保持登录态的持久化处理。我们需要用到两个插件，分别是 `js-cookie` 和 `next-cookies`，前者用于在客户端存储 `cookie`，而后者用于在服务端和客户端获取 `cookie`，我们先用 `npm` 进行安装：

```bash
npm i js-cookie next-cookies -S
```

随后我们修改 `./pages/login/index.jsx`，在登录成功后将 `token` 信息存储到 `cookie` 之中，同时我们也需要修改 `./pages/user/index.jsx`，将 `token` 作为请求头发送给 `api 服务端`，代码实现如下：

```js
// ./pages/login/index.jsx
//...
import cookie from 'js-cookie';

const login = async () => {
    //...

    const { token } = result.data.loginQuickly;
    cookie.set("token", token);
    // 存储 token 后跳转到个人信息界面
    Router.push("/user");
  }
```

```js
// ./pages/login/index.jsx
//...
import nextCookie from 'next-cookies';

//...
// 获取用户信息
const getUserInfo = async (ctx) => {
  // 在 cookie 中获取 token 信息
  const { token } = nextCookie(ctx);
  return fetch("http://dev-api.jt-gmall.com/member", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 在首部带上身份认证信息 token
      'x-auth-token': token
    },
    // graphql 的查询风格
    body: JSON.stringify({ query: `{ getUserInfo { nickname avatarUrl city gender } }` })
  }).then(res => res.json());
}

//...
```

> 之所以使用 `cookie` 存储 token 是利用了 `cookie` 会随着请求发送给服务端，服务端就有能力获取到客户端存储的 `cookie`，而 `localStorage` 并没有该特性。

我们在 `user` 页面刷新，查看控制台（下图），会发现 `html` 文件的请求头中有 `cookie` 信息，服务端获取 `cookie` 的原理就是在请求头中获取客户端传输过来的 `cookie`，这也是服务端渲染和客户端渲染的一大区别。

![请求头信息](https://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/react-ssr/9.png)

到这一步，关于登录鉴权路由控制的问题已经解决。这里的话，再抛出一个问题，我们的请求是在服务端发起的，如果发生了错误，`html` 无法正常填充，我们应该怎么处理？带着这个问题，进入下一章吧。

## 对报错信息的处理

我们的代码在大部分时候都是可控可预测的，一般来说只有网络请求是不好预测的，所以我们从下面这段函数来思考如何处理网络请求错误：

```js
// ./pages/vegetables/index.jsx
// ...
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
```

我们修改一行代码，把请求信息中的 `... vegetableList (page ...`  修改成 `... vegetableListError (page ...` 来测试一下会发现什么。

修改过后打开页面进行刷新，发现界面变成空白，这是因为 `if (!vegetableList) return null;` 这行代码导致的，我们在 `getInitialProps` 中输出一下请求结果 `result`，会发现返回的对象中包含 `errors` 信息。那么问题就很简单了，我们只需要把错误信息传递给组件的 `props`，然后交由组件处理下一步逻辑就好了，具体实现如下：

```js
const Vegetables = ({ errors, vegetableList }) => {
  if (errors) return <section>{JSON.stringify(errors)}</section>

  //...
}

Vegetables.getInitialProps = async ctx => {
  const result = await fetchVegetable(1, 10);

  if (result.errors) {
    return { errors: result.errors };
  }

  // 将查询结果返回，绑定在 props 上
  return result.data;
}
```

![错误信息](https://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/react-ssr/10.png)

到这里你应该就明白了，我们可以在开发环境将详细错误信息直接呈现，方便我们调试，而正式环境我们可以返回一个指定的错误页面，例如 `500 服务器开小差`。

到这里就结束了吗？当然没有，这样的话我们就需要在每个页面加入这个错误处理，这样的操作非常繁琐而且缺乏健壮性，所以我们需要写一个高阶组件来进行错误的处理，我们新建文件 `./components/withError.jsx`；

```js
// ./components/withError.jsx
import React from "react";

const WithError = () => WrappedComponent => {
  return class Error extends React.PureComponent {
    static async getInitialProps(ctx) {
      const result = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      // 这里从业务上来说与直接返回 result 并无区别
      // 这里只是强调对发生错误时的特殊处理
      if (result.errors) {
        return { errors: result.errors };
      }
      return result.data;
    }

    render() {
      const { errors } = this.props;
      if (errors && errors.length > 0) return <section>Error: {JSON.stringify(errors)}</section>
      return <WrappedComponent {...this.props} />;
    }
  }
}

export default WithError;
```

同时我们也需要修改 `./pages/vegetables/index.jsx` 中的 `getInitialProps` 函数，将对响应结果的处理延迟到组合类，同时删除之前添加的所有错误处理函数，修改后如下：

```js
const Vegetables = ({ vegetableList }) => {
  if (!vegetableList) return null;
  //...
}

Vegetables.getInitialProps = async ctx => {
  const result = await fetchVegetable(1, 10);

  // 将查询结果返回，绑定在 props 上
  return result;
}

export default WithError()(Vegetables);
```

此时刷新页面，会发现结果和刚才是一样的，只不过我们只需要在导出组件的时候进行 `WithError()(Vegetables)` 操作即可。这个函数其实也可以放在根组件，这个就交由大家自己去探究了。

## 结语

此时此刻，React 服务端渲染入门教程已经结束了，相信大家对服务端渲染也有了更加深刻的理解。如果想要了解更多，可以看看 `next` 的官网教程，并跟着写一个实际的项目最好，这样的提升是最大的。

最后祝愿大家都能够掌握使用服务端渲染，前端技术日益精进！

[本教程源码](https://github.com/a1029563229/react-ssr-tutorial)

[原文地址](https://github.com/a1029563229/Blogs/tree/master/Introduction/react-ssr)
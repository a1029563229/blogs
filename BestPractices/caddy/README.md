# 图文并茂教你搭建反向代理服务器 - Caddy 安装使用教程

## 引言

> 本文讨论的 `代理` 仅限于 `HTTP 代理`，不涉及其他协议。

在介绍 `Caddy` 之前，我们先介绍一下反向代理是什么，反向代理可以帮我们做什么事情。先看要不要，再决定用不用。

我们先来了解一下正向代理，正向代理就是在客户端与服务器之间实现一个代理服务器，客户端的所有请求先经过代理服务器，由代理服务器再去请求服务器，请求成功后再由代理服务器将服务器响应发回至客户端。

正向代理的经典案例就是公司内部的 VPN 代理，远程开发需要先连接 VPN，再由 VPN 连接公司服务器。只有连接 VPN 才能正常访问公司服务器，目的是为了防止一些非法连接，拒绝除 VPN 外的所有外网连接。

我们来画一张图帮助大家理解什么是 `正向代理`（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/1.png)

而反向代理正好相反，反向代理一般是在服务器端，客户端发起的网络请求先被反向代理服务器收到，再由反向代理服务器决定转发到某个具体的服务。换而言之，反向代理服务器将决定客户端最终访问到的目标服务器，常见的反向代理案例有负载均衡、CDN 加速。

我们在实际开发中，可以使用反向代理来解决 `前端跨域问题`、`模拟生产环境` 等等，我们本篇教程也是主要介绍这两个功能的使用。

我们来画一张图帮助大家理解什么是 `反向代理`（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/2.png)

最后使用一句话概括就是：正向代理隐藏真实客户端，反向代理隐藏真实服务端。

### Caddy 的优势

我们在实际开发中，可以使用 `Caddy` 来解决 `前端跨域问题`、`模拟生产环境`、`转发请求`，使用 `Caddy` 来做这些工作的好处是我们可以使用一套方案解决本地开发和生产环境的跨域问题和开发问题。

我们来做个横向对比，在日常开发中我们通常使用 `webpack` 解决开发环境的跨域问题，使用 `nginx` 解决生产环境的跨域问题。

`webpack` 的 `proxy` 选项可以解决大部分跨域问题，但是对 `history` 路由的支持性较差，并且组内开发的成员之间的配置可能会导致冲突，属于额外的维护成本。

在生产环境使用的 `nginx` 又是另一套方案，需要在本地开发和生产环境都解决一次跨域问题，这属于重复劳动。

需要解决这个问题也很简单，那就是本地开发和生产环境都使用 `nginx` 搭建反向代理服务器解决跨域问题。

但是 `nginx` 对前端人员并不是特别友好，在学习 `nginx` 的过程中我们可能会渐行渐远，忘记了我们的初衷只是为了解决跨域问题。

`Caddy` 使用 `Go` 语言编写，在性能上不逊色于 `nginx`，而在配置上要比 `nginx` 简单很多，对前端更友好。

使用简单，跨平台性强，对前端人员友好，成为我选择 `Caddy` 的理由。

## 安装 `Caddy`

`Caddy` 目前有 `1.0` 和 `2.0` 两个大版本，本文是针对 `2.0` 版本的教程，如果需要使用 `1.0` 版本的话建议查看 [Caddy 1.0 官方文档](https://caddyserver.com/v1/)。

### Mac 平台

> Mac 非常适合开发者，欢迎广大开发者加入 Mac 大家庭。

首先我们需要[下载 `caddy`](https://github.com/caddyserver/caddy/releases/download/v2.0.0-rc.3/caddy_2.0.0-rc.3_mac_amd64.tar.gz)，你也可以去 [官方地址](https://github.com/caddyserver/caddy/releases) 下载最新版本。

由于 `Caddy` 由 `go` 编写，`go` 编译后的文件可以直接执行，所以我们下载完成后我们直接解压到自己的目录，比如 `~/bin/` 目录。然后我们加上一个映射就可以使用啦，我们使用 `vi ~/.bash_profile` 命令编辑文件，添加下面这行代码：

```bash
export PATH=~/bin
```

添加了全局映射后，我们使用下面这行命令使我们的改动生效

```bash
source ~/.bash_profile
```

接下来我们输入 `caddy version` 来验证我们的安装是否生效，如果可以正确输出 `caddy` 的版本说明已经安装成功啦~（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/3.png)

### Windows 平台

首先我们需要[下载 `caddy`](https://github.com/caddyserver/caddy/releases/download/v2.0.0-rc.3/caddy_2.0.0-rc.3_windows_amd64.zip)，你也可以去 [官方地址](https://github.com/caddyserver/caddy/releases) 下载最新版本。

### Linux 平台

Linux 平台的安装与 Mac 平台的安装步骤类似，只是下载的安装包和映射命令的方法不同，这里不作复述了。

如果对这块内容有需要的话请在评论区留言，作者会根据大家需求补全这一块的内容。

## `Caddy` 使用教程

在 `Caddy` 安装完成后，我们来学习如何使用 `Caddy` 吧。

## 使用 `Caddy` 解决跨域问题

我们先使用 `Caddy` 来解决一个经典跨域问题，我们以一个[简单 `Demo`](https://github.com/a1029563229/Blogs/tree/master/BestPractices/caddy) 为例。在该案例中，我们使用 `fetch` 发起一个网络请求，请求一个网络资源（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/16.png)

从上图我们可以看出，我们使用 `fetch` 发起了一个网络请求，最后将请求的结果打印出来。现在，我们打开浏览器，查看请求结果（见下图）。

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/17.png)

从上图可以看到，我们的请求失败了，请求失败的原因是因为浏览器的 `同源策略` 导致的跨域问题。

> 同源策略是一个重要的安全策略，它用于限制一个 `origin` 的文档如何能与另一个源的资源进行交互，在使用 `XMLHttpRequest` 或 `fetch` 时则会受到同源策略的约束。

我们需要解决这个问题的话，需要服务端返回指定的响应头，这些响应头可以通过浏览器的 `同源策略` 检测。

需要服务端配置响应头的话，需要后端人员配合，由前端推动后端的工作  在效率上是不高的，可能有些后端人员难以配合（可能是异地、第三方接口...）。

我们现在来使用 `caddy` 解决这个问题，我们需要通过简单的两步来解决这个跨域问题：

- 配置 `Caddyfile` （`caddy` 的配置文件），启动 `caddy`；
- 配置 `hosts` 文件；

### 配置 `Caddyfile`

`Caddyfile` 是 `caddy` 的配置文件，我们在根目录下新建文件 `Caddyfile`（见下图）：

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/18.png)

我们来分析一下上面三行核心配置代码的含义吧，解析如下：

- `第 1 行`：拦截对 `http://proxy.dev-api-mall.jt-gmall.com` 这条 `url` 的访问请求，进行内部逻辑处理；
- `第 2 行`：拦截了 `http://proxy.dev-api-mall.jt-gmall.com` 的请求后，将其转发（反向代理）到 `http://dev-api-mall.jt-gmall.com`（我们请求的目标地址）；
- `第 3 行`：转发请求时，带上首部 `host`，值为 `dev-api-mall.jt-mall.com`，这一步的目的是为了让目标服务器上的反向代理能够识别请求源；
- `第 4~6 行`：响应结果时，加上 `Access-Control-Allow-*` 首部信息，这样可以通过浏览器的 `同源策略` 检测；

我们使用嵌套结构的几行代码就可以将 `Caddyfile` 配置完成啦！

### 配置 `hosts` 文件

我们将我们请求的地址修改为 `http://proxy.dev-api-mall.jt-gmall.com`，代码实现如下：

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/19.png)

我们使用 `caddy run --watch` 命令运行 `caddy`（运行 `caddy` 时请保证 `80` 端口是空闲的），`caddy` 运行成功后将会输出下面的结果（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/22.png)

然后我们打开浏览器，打开 `http://localhost:3000`（`Demo` 的运行地址），查看控制台输出的请求结果（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/20.png)

从上图可以看出，我们的请求失败了，这是因为我们在访问代理地址（`http://proxy.dev-api-mall.jt-gmall.com`）时，由于这个域名没有注册，将会导致 `DNS` 解析失败，最终导致请求失败。

此时我们只需要配置 `hosts` 文件，指定这条 `url` 的地址为本机即可，在 `hosts` 文件中添加下面这条记录：

> `hosts` 文件是一个操作系统文件，以表的形式存储了 主机名 和 IP 地址，用于查找主机名称。
>
> 不同系统的 `hosts` 文件配置方法在本文的 `最后一节`。

```bash
127.0.0.1 proxy.dev-api-mall.jt-gmall.com
```

配置好了 `hosts` 文件后，我们刷新页面，看到我们的请求结果被打印在控制台了！（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/21.png)

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/23.png)

我们从上图可以看出，我们通过 `caddy` 的反向代理解决了跨域问题，并且更好的模拟了真实环境的网络请求。

### 原理解析

我们来简单梳理一遍流程，分析一下 `Caddy` 做了什么，帮助我们解决了跨域问题。

我们从客户-服务端的视角来进行解析，我们的浏览器就是客户端，`Caddy` 和目标服务器都属于服务端。

#### 浏览器 - 客户端

首先，我们在客户端（浏览器）发起了一个请求，请求的地址是 `http://proxy.dev-api-mall.jt-gmall.com/vegetable/list?page=1&pageSize=20`，浏览器首先解析出 `hostname` 的值为 `proxy.dev-api-mall.jt-gmall.com`。

在解析出了 `hostname` 后，浏览器读取主机的 `hosts` 文件配置，查询是否匹配，此时将命中我们在 `hosts` 文件中设置的 `127.0.0.1 proxy.dev-api-mall.jt-gmall.com` 规则，将域名解析为 `IP` 地址 - `127.0.0.1`，也就是本机地址。

将域名解析完成后，浏览器解析到请求的端口为空，请求协议为 `http`，然后使用 `http` 的默认端口 `80` 与 `IP` 地址创建了网络套接字 `127.0.0.1:80`。

创建好了网络套接字后，浏览器按照 `http` 协议标准封装好请求信息，与目标地址 `127.0.0.1:80` 创建 `TCP` 连接后，将数据分组（`segment`） 发送给服务端。

#### `Caddy` - 服务端 + 客户端

我们的 `Caddy` 服务（服务端）运行在本地端口 `80` 上，对应的地址就是 `127.0.0.1:80`，所以 `Caddy` 服务收到了这个 `TCP` 连接请求，`Caddy` 将 `TCP` 的数据分组（`segment`）解析后，解析到了 `http` 请求（见下图）。

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/24.png)

从上面可以看出，我们的请求源是 `127.0.0.1:57721`（浏览器使用的随机端口），目的地址是 `127.0.0.1:80`（`Caddy` 运行端口）。我们的 `Host` 请求头为 `proxy.xxx`（代理地址），请求来源（发起方）是 `http://localhost:3000`（我们的本地服务）。

`Caddy` 收到了这个 `http` 请求后，解析到协议为 `http1.1`，`Host` 为 `proxy.dev-api-mall.jt-gmall.com`，然后开始匹配内部规则，最终匹配到下面这条配置规则。（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/25.png)

从上图可以看出，`Caddy` 在匹配到内部规则后，开始处理这条请求。根据配置规则，`Caddy` 将这条请求转发到 `http://dev-api-mall.jt-gmall.com`，此时 `Caddy` 将进行 `DNS` 查询，查询到 `IP` 地址后再与该地址建立 `TCP` 连接，将客户端的请求原封不动的转发到指定地址（见下图）。

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/27.png)

从上图可以看出，这条请求由作为客户端的 `Caddy` 发出。我们的请求源是 `10.8.71.38:52170`（`IP` 地址为本机的 `IP`，端口是 `Caddy` 使用的随机端口），目的地址是 `39.98.164.255:80`（`IP` 地址为目标服务器 `IP`，端口为 `HTTP` 协议默认端口号）。我们的 `Host` 请求头为 `dev-api-mall.xxx`（我们在 `Caddyfile` 中指定的 `Host` 首部），其余的请求首部及请求信息都是由 `Caddy` 直接转发到目的服务器的。

目的服务器接收到请求后，处理请求后响应结果。（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/28.png)

我们从上图可以看出，这条响应结果的源地址是 `39.98.164.255:80`（`IP` 地址为请求的服务器 `IP`，端口为请求的服务器端口 `80`），目的地址是 `10.8.71.38:52170`（`IP` 地址为我们本机的 `IP`，端口是 `Caddy` 使用的随机端口）。服务器将响应结果发送到 `Caddy` 客户端，我们的 `Caddy` 客户端接收到响应结果后，最后被 `Caddy` 服务器所处理。

我们的 `Caddy` 服务器将处理响应结果，`Caddy` 读取配置后在响应结果中添加 `Access-Control-Allow-*` 三条首部信息（我们在 `Caddyfile` 中设置的首部信息），最后将这条响应结果发送给浏览器客户端。（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/26.png)

我们从上图可以看出，这条响应结果的源地址是 `127.0.0.1:80`（`IP` 地址为我们本机的 `IP`，端口为 `Caddy` 的运行端口 - `Caddy` 服务端），目的地址是 `127.0.0.1:57721`（`IP` 地址为我们本机的 `IP`，端口为 `浏览器` 发起请求时使用的的随机端口 - `浏览器` 客户端）。

我们可以在响应结果中看到，我们在 `Caddyfile` 设置的首部信息 `Access-Control-Allow-*` 被添加在了响应结果中，响应结果中有这三个首部就可以通过浏览器的同源策略限制。我们在响应首部中可以看到两个 `Server` 首部，一个是我们本地的 `Caddy` 服务自动添加，另一个可能是目的服务器上的 `Caddy` 服务器所添加。最后，数据被正常返回，我们在浏览器的控制台也可以看到请求成功啦！（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/29.png)

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/30.png)

从上图看出，我们通过 `Caddy` 的反向代理功能，解决了跨域问题！

我们最后来通过一张图帮助大家理解上面的流程吧！（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/32.png)

> 图有点大，建议点击查看原图，这样可以看到更多细节。

## 使用 `Caddy` 搭建反向代理服务器

在这一章我们将会使用 `Caddy` 搭建反向代理服务器，并且支持我们常用的 `SPA - history` 路由模式。这也是 `nginx` 一直在做的事情，我们将使用 `Caddy` 更轻松地完成这项工作。

使用 `Caddy` 搭建反向代理服务器的思路和解决跨域问题的思路是差不多的，都是使用 `reverse_proxy` 属性。


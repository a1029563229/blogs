# 图文并茂教你搭建反向代理服务器 - Caddy 安装使用教程

## 引言

> 本文讨论的 `代理` 仅限于 `HTTP 代理`，不涉及其他协议。

在介绍 `Caddy` 之前，我们先介绍一下反向代理是什么，反向代理可以帮我们做什么事情。先看要不要，再决定用不用。

我们先来了解一下正向代理，正向代理就是在客户端与服务器之间实现一个代理服务器，客户端的所有请求先经过代理服务器，由代理服务器再去请求服务器，请求成功后再由代理服务器将服务器响应发回至客户端。

正向代理的经典案例就是公司内部的 VPN 代理，远程开发需要先连接 VPN，再由 VPN 连接公司服务器。只有连接 VPN 才能正常访问公司服务器，目的是为了防止一些非法连接，拒绝除 VPN 外的所有外网连接。

我们来画一张图帮助大家理解什么是 `正向代理`（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/1.png)

而反向代理正好相反，反向代理一般是在服务器端，客户端发起的网络请求先被反向代理服务器收到，再由反向代理服务器决定转发到某个具体的服务。换而言之，反向代理服务器将决定客户端最终访问到的目标服务器，常见的反向代理案例有负载均衡、CDN 加速。

我们在实际开发中，可以使用反向代理来解决 `前端跨域问题`、`模拟生产环境` 等等，使用 `caddy` 来做这些工作的好处是我们可以使用一套方案解决本地开发和生产环境的跨域问题和开发问题，我们本篇教程也是主要介绍这两个功能的使用。

我们来画一张图帮助大家理解什么是 `反向代理`（见下图）

![caddy](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/caddy/2.png)

最后使用一句话概括就是：正向代理隐藏真实客户端，反向代理隐藏真实服务端。

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
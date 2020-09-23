# 基于 qiankun 的微前端最佳实践（图文并茂） - 应用部署篇

![micro-app](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun/40.png)

## 写在开头

微前端系列文章：

- [基于 qiankun 的微前端最佳实践（万字长文） - 从 0 到 1 篇](https://github.com/a1029563229/Blogs/tree/master/BestPractices/qiankun/Start.md)
- [基于 qiankun 的微前端最佳实践（万字长文） - 应用发布篇](https://github.com/a1029563229/Blogs/tree/master/BestPractices/qiankun/Deploy.md)
- [基于 qiankun 的微前端最佳实践（图文并茂） - 应用部署篇](https://github.com/a1029563229/Blogs/tree/master/BestPractices/qiankun/Communication.md)
- [万字长文+图文并茂+全面解析微前端框架 qiankun 源码 - qiankun 篇](https://github.com/a1029563229/Blogs/tree/master/Source-Code/qiankun/1.md)

本系列其他文章计划一到两个月内完成，点个 `关注` 不迷路。

计划如下：

 - 生命周期篇；
 - IE 兼容篇；
 - 性能优化、缓存方案篇；

## 引言

大家好~我们是明源云链前端团队，我们使用 `qiankun` 进行微前端架构改造已经半年有余，已在生产环境得到成功验证。因此，本文介绍的 `微前端应用部署发布方案`，可以放心食用啦。

公司项目不对外，所以下面给大家展示我们的 [Demo 案例](http://main-micro.jt-gmall.com) （效果如下图）。

OK，话不多说，我们进入到正文吧~

## 概述

本文是基于 `qiankun` 的微前端最佳实践系列文章之 `应用部署篇`，采用 `qiankun` 完成主应用与多个微应用之间的联接，在部署发布时与普通的 `Web` 应用并没有太大区别。

本教程将结合 [实战案例](https://github.com/a1029563229/micro-front-template/tree/feature-deploy) 的 `feat-deploy` 分支，完成 `qiankun` 微应用架构的部署发布。

我们将演示在本地服务器上部署我们微前端应用，在本地部署成功后，我们再介绍如何在线上进行部署发布。

> 注意：
> 
> 保证 `Web` 应用的高可用性需要专业的服务器运维知识，本文对这方面知识不会有太多讨论。
> 
> 主要是因为这不属于前端开发人员的主要工作，二来这些知识对前端人员来说这有些难度，有需要的童鞋可以自己去了解。

本文首先从应用的构建打包开始，介绍不同技术栈的构建打包方法：

  1. 主应用的构建打包；
  2. `Vue` 微应用的构建打包；
  3. `React` 微应用的构建打包；
  4. `Angular` 微应用的构建打包；
  5. `Static（无脚手架）` 微应用的构建打包；

介绍完不同技术栈的构建打包方法后，我们会先介绍如何使用 `Nginx` 部署发布，然后再介绍如何使用 `Caddy` 方案（对前端更友好的 Web 服务器）发布，也就是下面两种方案：
  
  1. `Nginx` 服务器部署发布 - 极简方案；
  2. `Caddy` 服务器部署发布 - 极简方案；

`Nginx` 部署方案是我们在生产上验证过的方案，`Caddy` 部署方案对前端而言更为简单，比较适合个人站点。

## 应用构建打包

首先，我们结合 [实战案例 - feature-deploy 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy) 来介绍主应用和微应用的构建打包方法。

我们首先在根目录下新建目录 `deployed`，用于放置我们各个应用构建打包后的文件，接下来我们就可以开始各个应用的构建打包了。

### 主应用构建打包

我们以 [实战案例 - feature-deploy 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy) 为例，在主应用构建打包前，我们需要先设置环境变量，在生产环境时加载 `真实域名` 的微应用。

我们在 `micro-app-main` 根目录下新建两个配置文件 - `.env.basic` 和 `.env.prod`，用于存放我们不同环境的配置文件，代码实现如下：

```env
# .env.basic 用于本地构建测试
VUE_APP_REACT_MICRO_APP=http://localhost:10100
VUE_APP_VUE_MICRO_APP=http://localhost:10200
VUE_APP_ANGULAR_MICRO_APP=http://localhost:10300
VUE_APP_STATIC_MICRO_APP=http://localhost:10400
```

```env
# .env.prod 用于线上构建，下面这些域名是真实域名
VUE_APP_REACT_MICRO_APP=http://react-micro.jt-gmall.com
VUE_APP_VUE_MICRO_APP=http://vue-micro.jt-gmall.com
VUE_APP_ANGULAR_MICRO_APP=http://angular-micro.jt-gmall.com
VUE_APP_STATIC_MICRO_APP=http://static-micro.jt-gmall.com
```

我们在配置好了两个环境的微应用地址配置后，我们将其导出，代码实现如下：

```ts
// micro-app-main/src/config/index.ts
type Config = {
  REACT_MICRO_APP: string;
  VUE_MICRO_APP: string;
  ANGULAR_MICRO_APP: string;
  STATIC_MICRO_APP: string;
};

const config: Config = {
  REACT_MICRO_APP: process.env.VUE_APP_REACT_MICRO_APP,
  VUE_MICRO_APP: process.env.VUE_APP_VUE_MICRO_APP,
  ANGULAR_MICRO_APP: process.env.VUE_APP_ANGULAR_MICRO_APP,
  STATIC_MICRO_APP: process.env.VUE_APP_STATIC_MICRO_APP,
}

export default config;
```

然后，我们需要在微应用注册信息中，将我们加载微应用的地址换成我们配置的地址，代码实现如下：

```ts
// micro-app-main/src/micro/apps.ts
import config from "@/config";

const {
  REACT_MICRO_APP,
  VUE_MICRO_APP,
  ANGULAR_MICRO_APP,
  STATIC_MICRO_APP,
} = config;

const apps = [
  /**
   * name: 微应用名称 - 具有唯一性
   * entry: 微应用入口 - 通过该地址加载微应用，这里我们使用 config 配置
   * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
   * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
   */
  {
    name: "ReactMicroApp",
    entry: REACT_MICRO_APP,
    container: "#frame",
    activeRule: "/react",
  },
  {
    name: "VueMicroApp",
    entry: VUE_MICRO_APP,
    container: "#frame",
    activeRule: "/vue",
  },
  {
    name: "AngularMicroApp",
    entry: ANGULAR_MICRO_APP,
    container: "#frame",
    activeRule: "/angular",
  },
  {
    name: "StaticMicroApp",
    entry: STATIC_MICRO_APP,
    container: "#frame",
    activeRule: "/static",
  },
];

export default apps;
```

从上面的配置文件我们可以看出，我们配置了 `basic` 和 `prod` 两个环境加载的微应用地址。

最后，我们在 `package.json` 中，通过不同的命令区分不同环境，代码实现如下：

```json
"scripts": {
  "serve": "vue-cli-service serve --mode basic",
  "build:test": "vue-cli-service build --mode basic",
  "build": "vue-cli-service build --mode prod",
  "lint": "vue-cli-service lint"
}
```

在配置完成后，我们在命令行运行如下命令，将主应用构建打包：

```bash
# 我们的教程是先在本地进行测试，所以先构建 test 包
yarn build:test
```

在构建打包完成后，我们将构建好的 `dist` 目录移动到根目录下的 `deployed` 目录下，并重命名为 `micro-app-main`，目录结构如下（见下图）

![micro](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun_practice/44.png)

到这里，我们的主应用就构建打包好了，接下来我们介绍各个技术栈的微应用构建打包过程。

### `Vue` 微应用构建打包

我们以 [实战案例 - feature-deploy 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy) 为例，我们进入到 `micro-app-vue` 目录，直接使用 `vue-cli` 官方的打包命令构建打包即可，在命令行运行：

```bash
yarn build
```

在构建打包完成后，我们将构建好的 `dist` 目录移动到根目录下的 `deployed` 目录下，并重命名为 `micro-app-vue`，目录结构如下（见下图）

![micro](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun_practice/45.png)

到这里，我们的 `Vue` 微应用构建打包就完成啦！

### `React` 微应用构建打包

我们以 [实战案例 - feature-deploy 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy) 为例，我们进入到 `micro-app-react` 目录，直接使用打包命令构建打包即可，在命令行运行：

```bash
yarn build
```

在构建打包完成后，我们将构建好的 `build` 目录移动到根目录下的 `deployed` 目录下，并重命名为 `micro-app-react`，目录结构如下（见下图）

![micro](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun_practice/46.png)

到这里，我们的 `React` 微应用构建打包就完成啦！

### `Angular` 微应用构建打包

我们以 [实战案例 - feature-deploy 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy) 为例，我们进入到 `micro-app-angular` 目录，直接使用打包命令构建打包即可，在命令行运行：

```bash
yarn build
```

在构建打包完成后，我们将构建好的 `dist/micro-app-angular` 目录移动到根目录下的 `deployed` 目录下，目录结构如下（见下图）

![micro](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun_practice/47.png)

到这里，我们的 `Angular` 微应用构建打包就完成啦！

### `Static` 微应用构建打包

我们以 [实战案例 - feature-deploy 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy) 为例，由于 `Static` 微应用没有使用脚手架，所以我们直接将 `static` 目录移动到根目录下的 `deployed` 目录下，并重命名为 `micro-app-static`，目录结构如下（见下图）

![micro](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun_practice/48.png)

## `Nginx` 服务器部署方案

在将我们的主应用和微应用全部打包完成后，我们将介绍如何使用 `Nginx` 完成微前端架构的部署。

`Nginx` 部署方案是可以作为生产方案使用的。

> Tips: 开始搭建 `HTTP` 服务之前，确保你的 `9999`、`10100`、`10200`、`10300`、`10400` 端口是空闲的。

### 搭建 HTTP 服务器 - 运行主应用

首先，我们以 [实战案例 - feature-deploy 分支](https://github.com/a1029563229/micro-front-template/tree/feature-deploy) 为例，我们项目构建后的目录如下图。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/qiankun-deploy/1.png)

我们先搭建一个简单的 `HTTP` 服务，使得我们的主应用可以被访问，我们在 `deployed` 目录下新建一个 `nginx.conf` 配置文件，添加如下配置：

```nginx
worker_processes  1;   # Nginx 进程数，一般设置为和 CPU 核数一样

events {
  worker_connections  1024;   # 每个进程允许最大并发数
}

http {
  include ./mime.types;   # 文件扩展名与类型映射表
  default_type application/octet-stream;   # 默认文件类型
  server {
    set $root "/Users/Macxdouble/project/myy/micro-front/deployed";   # 设置静态文件目录的绝对路径，该变量根据个人的项目配置有所不同
    listen       9999;   # 配置监听的端口
    server_name  localhost;    # 配置的域名，目前是本地测试，所以直接使用 localhost
    
    location / {
      root   $root/micro-app-main;  # 网站根目录，这里选用主应用构建后的文件目录
      index  index.html;   # 默认首页文件
      try_files  $uri $uri/ /index.html @rewrites;   # 兼容 history 路由模式，找不到的文件直接重定向到 index.html 

      expires -1;                          # 首页一般没有强制缓存
      add_header Cache-Control no-cache;
    }
    
    location @rewrites {
        rewrite ^(.+)$ /index.html break;   # 重定向规则
    }
  }
}
```

配置文件写好后，还有两件重要的事情：

1. 如果对 `nginx` 不是很熟悉的童鞋，记得仔细查看配置文件的注释内容，这样可以确保你的配置文件正确（特别是 `$root` 变量，要根据个人项目进行设置）。

2. 别忘了把 `nginx` 目录下的 `mime.types` 复制到当前目录（或者新建 `mime.types` 文件并复制下面的内容），否则你的样式文件将无法正常加载。

```bash
types {
    text/html                                        html htm shtml;
    text/css                                         css;
    text/xml                                         xml;
    image/gif                                        gif;
    image/jpeg                                       jpeg jpg;
    application/javascript                           js;
    application/atom+xml                             atom;
    application/rss+xml                              rss;

    text/mathml                                      mml;
    text/plain                                       txt;
    text/vnd.sun.j2me.app-descriptor                 jad;
    text/vnd.wap.wml                                 wml;
    text/x-component                                 htc;

    image/png                                        png;
    image/svg+xml                                    svg svgz;
    image/tiff                                       tif tiff;
    image/vnd.wap.wbmp                               wbmp;
    image/webp                                       webp;
    image/x-icon                                     ico;
    image/x-jng                                      jng;
    image/x-ms-bmp                                   bmp;

    font/woff                                        woff;
    font/woff2                                       woff2;

    application/java-archive                         jar war ear;
    application/json                                 json;
    application/mac-binhex40                         hqx;
    application/msword                               doc;
    application/pdf                                  pdf;
    application/postscript                           ps eps ai;
    application/rtf                                  rtf;
    application/vnd.apple.mpegurl                    m3u8;
    application/vnd.google-earth.kml+xml             kml;
    application/vnd.google-earth.kmz                 kmz;
    application/vnd.ms-excel                         xls;
    application/vnd.ms-fontobject                    eot;
    application/vnd.ms-powerpoint                    ppt;
    application/vnd.oasis.opendocument.graphics      odg;
    application/vnd.oasis.opendocument.presentation  odp;
    application/vnd.oasis.opendocument.spreadsheet   ods;
    application/vnd.oasis.opendocument.text          odt;
    application/vnd.openxmlformats-officedocument.presentationml.presentation
                                                     pptx;
    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                                                     xlsx;
    application/vnd.openxmlformats-officedocument.wordprocessingml.document
                                                     docx;
    application/vnd.wap.wmlc                         wmlc;
    application/x-7z-compressed                      7z;
    application/x-cocoa                              cco;
    application/x-java-archive-diff                  jardiff;
    application/x-java-jnlp-file                     jnlp;
    application/x-makeself                           run;
    application/x-perl                               pl pm;
    application/x-pilot                              prc pdb;
    application/x-rar-compressed                     rar;
    application/x-redhat-package-manager             rpm;
    application/x-sea                                sea;
    application/x-shockwave-flash                    swf;
    application/x-stuffit                            sit;
    application/x-tcl                                tcl tk;
    application/x-x509-ca-cert                       der pem crt;
    application/x-xpinstall                          xpi;
    application/xhtml+xml                            xhtml;
    application/xspf+xml                             xspf;
    application/zip                                  zip;

    application/octet-stream                         bin exe dll;
    application/octet-stream                         deb;
    application/octet-stream                         dmg;
    application/octet-stream                         iso img;
    application/octet-stream                         msi msp msm;

    audio/midi                                       mid midi kar;
    audio/mpeg                                       mp3;
    audio/ogg                                        ogg;
    audio/x-m4a                                      m4a;
    audio/x-realaudio                                ra;

    video/3gpp                                       3gpp 3gp;
    video/mp2t                                       ts;
    video/mp4                                        mp4;
    video/mpeg                                       mpeg mpg;
    video/quicktime                                  mov;
    video/webm                                       webm;
    video/x-flv                                      flv;
    video/x-m4v                                      m4v;
    video/x-mng                                      mng;
    video/x-ms-asf                                   asx asf;
    video/x-ms-wmv                                   wmv;
    video/x-msvideo                                  avi;
}
```

在配置文件完成后，我们直接运行 `nginx` 命令启动我们的 `nginx` 服务（如下）：

```bash
# -c 后面跟着的是你的 nginx 配置文件路径，记得配置正确的路径
nginx -s reload -c /Users/Macxdouble/project/myy/micro-front/deployed/nginx.conf 
```

启动完成后，打开浏览器 `http://localhost:9999` 查看效果（如下图）：

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/qiankun-deploy/2.png)

这样一来，我们的主应用就启动完成了，接下来我们继续配置我们的子应用。

### 搭建 HTTP 服务器 - 运行子应用

子应用和主应用的 `nginx` 配置基本上是一致的，唯一不同的是子应用需要配置允许跨域访问。这是因为我们的微前端架构需要通过 `ajax` 请求子应用资源，所以需要配置跨域，通过 `同源策略` 的限制。

接下来我们配置子应用的 `nginx` 配置，我们四个子应用需要新建 4 个 `server`（完整配置如下）：

```nginx
worker_processes  1;   # Nginx 进程数，一般设置为和 CPU 核数一样

events {
  worker_connections  1024;   # 每个进程允许最大并发数
}

http {
  include ./mime.types;   # 文件扩展名与类型映射表
  default_type application/octet-stream;   # 默认文件类型
  server {
    set $root "/Users/Macxdouble/project/myy/micro-front/deployed";   # 设置静态文件目录的绝对路径，该变量根据个人的项目配置有所不同
    listen       9999;   # 配置监听的端口
    server_name  localhost;    # 配置的域名，目前是本地测试，所以直接使用 localhost
    
    location / {
      root   $root/micro-app-main;  # 网站根目录，这里选用主应用构建后的文件目录
      index  index.html;   # 默认首页文件
      try_files  $uri $uri/ /index.html @rewrites;   # 兼容 history 路由模式，找不到的文件直接重定向到 index.html 

      expires -1;                          # 首页一般没有强制缓存
      add_header Cache-Control no-cache;
    }
    
    location @rewrites {
        rewrite ^(.+)$ /index.html break;   # 重定向规则
    }
  }

  server {
    set $root "/Users/Macxdouble/project/myy/micro-front/deployed";   # 设置静态文件目录的绝对路径，该变量根据个人的项目配置有所不同
    listen       10100;   # 配置监听的端口，react 子应用的端口号为 10100
    server_name  localhost;    # 配置的域名，目前是本地测试，所以直接使用 localhost

    location / {
      root   $root/micro-app-react;  # 网站根目录，这里选用 react 子应用构建后的文件目录
      index  index.html;   # 默认首页文件
      try_files  $uri $uri/ /index.html @rewrites;   # 兼容 history 路由模式，找不到的文件直接重定向到 index.html 

      expires -1;                          # 首页一般没有强制缓存
      add_header Cache-Control no-cache;

      add_header "Access-Control-Allow-Origin" $http_origin;   # 全局变量获得当前请求origin，带cookie的请求不支持*
      add_header "Access-Control-Allow-Methods" "*";  # 允许请求方法
      add_header "Access-Control-Allow-Headers" "*";  # 允许请求的 header
    }
    
    location @rewrites {
        rewrite ^(.+)$ /index.html break;   # 重定向规则
    }
  }

  server {
    set $root "/Users/Macxdouble/project/myy/micro-front/deployed";   # 设置静态文件目录的绝对路径，该变量根据个人的项目配置有所不同
    listen       10200;   # 配置监听的端口，vue 子应用的端口号为 10200
    server_name  localhost;    # 配置的域名，目前是本地测试，所以直接使用 localhost

    location / {
      root   $root/micro-app-vue;  # 网站根目录，这里选用 vue 子应用构建后的文件目录
      index  index.html;   # 默认首页文件
      try_files  $uri $uri/ /index.html @rewrites;   # 兼容 history 路由模式，找不到的文件直接重定向到 index.html 

      expires -1;                          # 首页一般没有强制缓存
      add_header Cache-Control no-cache;

      add_header "Access-Control-Allow-Origin" $http_origin;   # 全局变量获得当前请求origin，带cookie的请求不支持*
      add_header "Access-Control-Allow-Methods" "*";  # 允许请求方法
      add_header "Access-Control-Allow-Headers" "*";  # 允许请求的 header
    }
    
    location @rewrites {
        rewrite ^(.+)$ /index.html break;   # 重定向规则
    }
  }

  server {
    set $root "/Users/Macxdouble/project/myy/micro-front/deployed";   # 设置静态文件目录的绝对路径，该变量根据个人的项目配置有所不同
    listen       10300;   # 配置监听的端口，angular 子应用的端口号为 10300
    server_name  localhost;    # 配置的域名，目前是本地测试，所以直接使用 localhost

    location / {
      root   $root/micro-app-angular;  # 网站根目录，这里选用 angular 子应用构建后的文件目录
      index  index.html;   # 默认首页文件
      try_files  $uri $uri/ /index.html @rewrites;   # 兼容 history 路由模式，找不到的文件直接重定向到 index.html 

      expires -1;                          # 首页一般没有强制缓存
      add_header Cache-Control no-cache;

      add_header "Access-Control-Allow-Origin" $http_origin;   # 全局变量获得当前请求origin，带cookie的请求不支持*
      add_header "Access-Control-Allow-Methods" "*";  # 允许请求方法
      add_header "Access-Control-Allow-Headers" "*";  # 允许请求的 header
    }
    
    location @rewrites {
        rewrite ^(.+)$ /index.html break;   # 重定向规则
    }
  }

  server {
    set $root "/Users/Macxdouble/project/myy/micro-front/deployed";   # 设置静态文件目录的绝对路径，该变量根据个人的项目配置有所不同
    listen       10400;   # 配置监听的端口，static 子应用的端口号为 10400
    server_name  localhost;    # 配置的域名，目前是本地测试，所以直接使用 localhost

    location / {
      root   $root/micro-app-static;  # 网站根目录，这里选用 static 子应用构建后的文件目录
      index  index.html;   # 默认首页文件
      try_files  $uri $uri/ /index.html @rewrites;   # 兼容 history 路由模式，找不到的文件直接重定向到 index.html 

      expires -1;                          # 首页一般没有强制缓存
      add_header Cache-Control no-cache;

      add_header "Access-Control-Allow-Origin" $http_origin;   # 全局变量获得当前请求origin，带cookie的请求不支持*
      add_header "Access-Control-Allow-Methods" "*";  # 允许请求方法
      add_header "Access-Control-Allow-Headers" "*";  # 允许请求的 header
    }
    
    location @rewrites {
        rewrite ^(.+)$ /index.html break;   # 重定向规则
    }
  }
}
```

配置文件虽然看起来特别长，但是大部分的配置都是大同小异的，比主应用的配置只是多了一些跨域配置。

在配置完成后，我们需要重启一下 `nginx` 服务。

```bash
# -c 后面跟着的是你的 nginx 配置文件路径，记得配置正确的路径
nginx -s reload -c /Users/Macxdouble/project/myy/micro-front/deployed/nginx.conf 
```

`nginx` 服务查看完成后，我们就可以打开浏览器 `http://localhost:9999` 查看我们的部署成果啦！（效果图如下）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/qiankun-deploy/3.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/qiankun-deploy/4.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/qiankun-deploy/5.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/qiankun-deploy/6.png)

ok 啦，`nginx` 服务部署大功告成！

> 注意注意，敲黑板：如果是需要把服务部署到真实服务器，只需要把所有的 `localhost` 都换成真实注册的域名即可，其他配置都可以复用噢！

## `Caddy` 服务器部署方案

在介绍完了 `Nginx`，我们将介绍如何使用 `Caddy` 完成微前端架构的部署。

`Caddy` 的部署配置要比 `Nginx` 简单很多，对前端也比较友好，推荐大家使用。

> Tips: 开始搭建 `HTTP` 服务之前，确保你的 `9999`、`10100`、`10200`、`10300`、`10400` 端口是空闲的。
>
> `nginx -s stop` 可以快速关闭 `nginx` 服务。

### 搭建 HTTP 服务器 - 运行主应用

我们需要先配置 `Caddy` 的配置文件，我们在 `deployed` 目录下新建配置文件 `Caddyfile`，写入下面的配置：

```Caddyfile
http://localhost:9999 {
     root * ./micro-app-main  # 网站根目录，这里选用主应用构建后的文件目录
     file_server  # 启用文件服务
     try_files {path} ./index.html   # 兼容 history 路由模式，找不到的文件直接重定向到 index.html 
}
```

接下来我们使用 `热重载模式` 运行 `Caddy`，在 `deployed` 目录下运行命令：

```bash
# Caddy 会自动找到当前目录的 Caddyfile 配置文件
# --watch 选项：当 Caddyfile 发生改变时，Caddy 服务会自动重启
caddy run --watch
```

`caddy` 运行成功后，我们打开浏览器 `http://localhost:9999` 查看效果（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/qiankun-deploy/7.png)

这样一来，我们的主应用就启动完成了，接下来我们继续配置我们的子应用。

### 搭建 HTTP 服务器 - 运行子应用

子应用和主应用的 `nginx` 配置基本上是一致的，唯一不同的是子应用需要配置允许跨域访问。这是因为我们的微前端架构需要通过 `ajax` 请求子应用资源，所以需要配置跨域，通过 `同源策略` 的限制。

接下来我们配置子应用的 `Caddy` 配置，我们四个子应用需要配置（完整配置如下）：

```Caddy
http://localhost:9999 {
     root * ./micro-app-main  # 网站根目录，这里选用主应用构建后的文件目录
     file_server  # 启用文件服务
     try_files {path} ./index.html   # 兼容 history 路由模式，找不到的文件直接重定向到 index.html 
}

http://localhost:10100 {
     root * ./micro-app-react  # 网站根目录，这里选用 react 子应用构建后的文件目录
     file_server  # 启用文件服务
     try_files {path} ./index.html   # 兼容 history 路由模式，找不到的文件直接重定向到 index.html 
     header Access-Control-Allow-Origin *   # 配置允许跨域请求的 Origin
     header Access-Control-Allow-Headers *  # 配置允许跨域请求的方法
     header Access-Control-Allow-Methods *  # 配置允许跨域请求的 header
}

http://localhost:10200 {
     root * ./micro-app-vue  # 网站根目录，这里选用 vue 子应用构建后的文件目录
     file_server  # 启用文件服务
     try_files {path} ./index.html   # 兼容 history 路由模式，找不到的文件直接重定向到 index.html 
     header Access-Control-Allow-Origin *   # 配置允许跨域请求的 Origin
     header Access-Control-Allow-Headers *  # 配置允许跨域请求的方法
     header Access-Control-Allow-Methods *  # 配置允许跨域请求的 header
}

http://localhost:10300 {
     root * ./micro-app-angular  # 网站根目录，这里选用 angular 子应用构建后的文件目录
     file_server  # 启用文件服务
     try_files {path} ./index.html   # 兼容 history 路由模式，找不到的文件直接重定向到 index.html 
     header Access-Control-Allow-Origin *   # 配置允许跨域请求的 Origin
     header Access-Control-Allow-Headers *  # 配置允许跨域请求的方法
     header Access-Control-Allow-Methods *  # 配置允许跨域请求的 header
}

http://localhost:10400 {
     root * ./micro-app-static  # 网站根目录，这里选用 static 子应用构建后的文件目录
     file_server  # 启用文件服务
     try_files {path} ./index.html   # 兼容 history 路由模式，找不到的文件直接重定向到 index.html 
     header Access-Control-Allow-Origin *   # 配置允许跨域请求的 Origin
     header Access-Control-Allow-Headers *  # 配置允许跨域请求的方法
     header Access-Control-Allow-Methods *  # 配置允许跨域请求的 header
}
```

`Caddy` 的配置文件比 `Nginx` 的要简洁多了，此时 `Caddy` 服务将会自动重启，我们直接打开浏览器 `http://localhost:9999` 查看效果即可（最终效果图如下）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/qiankun-deploy/8.gif)

ok 啦，`Caddy` 服务部署大功告成！

> 注意注意，敲黑板：如果是需要把服务部署到真实服务器，只需要把所有的 `localhost` + `端口号` 都换成真实注册的域名即可，其他配置都可以复用噢！

## 总结

微前端服务的部署方案的话，这里只介绍最常用的 `Nginx` 和 `Caddy` 服务两种。其中，`Nginx` 方案是我们公司使用的生产方案，`Caddy` 是本文 `Demo` 案例方案。

前端人员如果能掌握上述两种应用部署方案，已经足以完成一些简单的运维工作。

> 注意：应用部署/服务器运维工作最好交给专业的运维人员来做，我们可以提供上述两种方案供运维人员参考。

本文参考资料：

[Nginx 从入门到实践，万字详解！](https://juejin.im/post/6844904144235413512)

[图解跨域请求、反向代理原理，对前端更友好的反向代理服务器 - Caddy
](https://juejin.im/post/6844904167639629838)

[Caddy 官网](https://caddyserver.com)

## 求贤若渴

明源云链前端团队是个充满激情的团队，明源云也是对技术非常重视的公司。

我们有完善的福利：六险一金 +（丰厚）年终奖 + 带薪休假 + 通讯补贴

我们的工作氛围：弹性工作，扁平结构，崇尚以解决问题为核心、简单高效的互联网文化，鼓励技术创新分享，每年举办黑客马拉松（最高奖 3W 奖金）、极客大赛、移动社群等技术性赛事

我们有人文关怀：花式下午茶（每周都有）、生日礼金、免费旅游、活动经费、结婚礼金、免费体检

我们还有丰富的业余社团活动：篮球、足球、瑜伽、羽毛球、台球、棋牌赛

我们招聘的岗位有：`前端工程师`、`测试工程师`、`Java 工程师`、`PHP 工程师`

我们的 Base 有：`深圳`、`武汉`

心动了吗？如果你已经做好准备，那么请投出你的简历到邮箱 `lit31@mingyuanyun.com`，明源云期待你的加入！


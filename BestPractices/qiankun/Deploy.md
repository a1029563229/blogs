# 基于 qiankun 的微前端最佳实践（万字长文） - 部署发布篇

![micro-app](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/qiankun/40.png)

## 写在开头

微前端系列文章：

- [基于 qiankun 的微前端最佳实践（万字长文） - 从 0 到 1 篇](https://github.com/a1029563229/Blogs/tree/master/BestPractices/qiankun/Start.md)
+ [基于 qiankun 的微前端最佳实践（万字长文） - 部署发布篇](https://github.com/a1029563229/Blogs/tree/master/BestPractices/qiankun/Deploy.md)
- [基于 qiankun 的微前端最佳实践（图文并茂） - 应用间通信篇](https://github.com/a1029563229/Blogs/tree/master/BestPractices/qiankun/Communication.md)
- [万字长文+图文并茂+全面解析微前端框架 qiankun 源码 - qiankun 篇](https://github.com/a1029563229/Blogs/tree/master/Source-Code/qiankun/1.md)

本系列其他文章计划一到两个月内完成，点个 `关注` 不迷路。

计划如下：

 - 生命周期篇；
 - IE 兼容篇；
 - 性能优化、缓存方案篇；

## 引言

大家好~

本文是基于 `qiankun` 的微前端最佳实践系列文章之 `部署发布篇`，本文将分享基于 `qiankun` 的微前端架构如何进行打包、部署发布。

本教程采用 `qiankun` 完成主应用与多个微应用之间的联接，在部署发布时与普通的 `Web` 应用并没有太大区别。所以，本文章不仅是对 `qiankun` 微前端架构的部署发布教程，也是对 `Web` 应用部署发布的一个入门。本文将介绍下面这些部署发布方案（见下图）

本教程将结合 [实战案例](https://github.com/a1029563229/micro-front-template) 的多个分支（分支说明在后面介绍)，完成 `qiankun` 微应用架构的部署发布。

最终，我们将在服务器上部署我们微前端应用，就像是 [实战案例 - 线上演示](https://github.com/a1029563229/micro-front-template) 一样，效果图如下（见下图）：


> 注意：
> 
> 保证 `Web` 应用的高可用性需要专业的服务器运维知识，本文对这方面知识不会有太多讨论。
> 
> 主要是因为这不属于前端开发人员的主要工作，二来这些知识对前端人员来说这有些难度，有需要的童鞋可以自己去了解。

## 概述

本文首先从应用的构建打包开始，介绍不同技术栈的构建打包方法：

  1. 主应用的构建打包；
  2. `Vue` 微应用的构建打包；
  3. `React` 微应用的构建打包；
  4. `Angular` 微应用的构建打包；
  5. `Static（无脚手架）` 微应用的构建打包；

介绍完不同技术栈的构建打包方法后，我们会先介绍如何使用 `Node` 部署发布，然后再介绍其他多种部署发布方案：
  
  1. `Node` 服务器部署发布 - 基础方案；
  2. `Go + Docker` 服务器部署发布 - 极简方案；
  3. `Caddy + Go + Docker` 服务器部署发布 - 反向代理方案；
  4. `Nginx + Go + Docker` 服务器部署发布 - 反向代理方案；
  5. `K8S + Caddy + Go + Docker` 服务器部署发布 - 高可用方案：

> 选择 `Node` 作为第一个部署方案是因为前端人员对 `Node` 比较熟悉，希望通过 `Node` 帮助大家理解服务器的基本运作原理。

部署发布方案各有千秋，本文章也会在后面介绍各个部署方案的优缺点，大家可以根据自己的实际需求进行选择。

## 应用构建打包


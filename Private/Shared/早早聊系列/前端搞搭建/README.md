# 前端搞搭建

## 鲁班/搭建页面 500+ - 洛尘·政采云

 一个搭建系统，搭建一个页面，同步多个环境。

 ### 数据类型

 JSON vs JSON Schema 

 ![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/7.jpg)

 ![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/8.jpg)

 ### 如何生成页面

 1. 搭建的页面是 JSON 数据 
 2. 发布时经过渲染模块，将数据渲染成 `html` 文件，然后推送到 OSS 上 
 3. 点发布按钮时，将配置同步到 test 环境，test 环境有路由模块，根据推送过来的配置去查找本地的页面文件，如果本地没有找到，则拉取 OSS 上的页面，最后出现的是一个静态 html。

 ## 飞冰 iceluna/搭建页面 6K+ - 淘宝·月飞

搭建的分类：

    1. 面向运营：可视化配置（no-code） - 页面搭建、PC、h5、Rax、小程序
    2. 面向研发：低代码开发（low-code） - 中后台系统搭建、无线模块搭建

### 产品背景

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/9.jpg)

低代码模式：通过可视化的方式，使具备不同经验水平的开发人员，可以通过图形化的界面，使用拖拽或者模型驱动完成页面的搭建。

#### 定位与目标

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/10.jpg)

#### 产品现状

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/11.jpg)

#### 架构设计

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/12.jpg)

#### 功能模块设计

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/13.jpg)

#### 研发流程设计

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/14.jpg)

#### 中后台搭建基础设施建设

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/15.jpg)

#### 架构分层

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/16.jpg)

#### 沙箱隔离

支持搭建不同技术栈、不同版本。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/17.jpg)

### PasS 平台建设

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/18.jpg)

#### 云端构建架构图

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/19.jpg)

#### 代码回滚服务

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/20.jpg)

#### 总结&展望

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/shared/21.jpg)

#### QA

icewark 和 iceluna 区别：icewark 偏源码方向链路，iceluna 主要定位在搭建产品。

主导：前两年是技术驱动，近一年有设计师团队参与建设，目前还是主要由技术人员驱动的项目。

组件间的业务逻辑交互：这是个难点，iceluna 是通过插件的能力来增强的，进行利灵活搭配，并不是自身提供的能力。


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


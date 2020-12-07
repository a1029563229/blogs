# Taro

每一个 Taro 应用都需要一个入口组件用来注册应用，入口文件默认是 `src` 目录下的 `app.js`，在 Taro 中使用 React，入口组件必须导出一个 React 组件，在入口组件中我们可以设置全局状态或访问小程序入口实例的生命周期：在入口组件不会渲染任何内容，但我们可以在这里做类似于状态管理的事情。

## 生命周期

### onLaunch(options)

在此生命周期中通过 `getCurrentInstance().router.params`，可以访问到程序初始化参数。

### componentDidMount()

页面初次渲染完成时触发，一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。此生命周期可以访问 `getCurrentInstance().router`。此生命周期可以访问 Taro DOM 并且更改 DOM 或添加事件，但无法通过 `Taro.createSelectorQuery` 查找小程序 DOM。

## 配置文件

和入口组件一样，对于一个页面文件(例如 `./pages/index/index.jsx` )而言，我们可以新增一个 `./pages/index/index.config.js` 的文件进行页面配置，`index.config.js` 的默认导出就是页面配置:

```js
export default {
  navigationBarTitleText: "首页",
};
```

### onShareTimeline()

监听右上角菜单“分享到朋友圈”按钮的行为，并自定义发享内容。

注意：只有定义了此事件处理函数，右上角菜单才会显示“分享到朋友圈”按钮。

### 其它限制

由于小程序不支持动态引入，因此小程序中无法使用 `React.lazy` API。

所有组件的 id 必须在整个应用中保持唯一（即使他们在不同的页面），否则可能导致事件不触发的问题。

### 项目配置

通过 Taro 模板创建的项目都会默认拥有 `project.config.json` 这一项目配置文件，这个文件 只能用于微信小程序，若要兼容到其他小程序平台，请按如下对应规则来增加相应平台的配置文件，其配置与各自小程序平台要求的一致

## 尺寸转换

在编译时，Taro 会帮你对样式做尺寸转换操作，但是如果是在 JS 中书写了行内样式，那么编译时就无法做替换了，针对这种情况，Taro 提供了 API `Taro.pxTransform` 来做运行时的尺寸转换。

`Taro.pxTransform(10) // 小程序：rpx，H5：rem`

## 跨平台开发

### 内置环境变量

`process.env.TARO_ENV`

用于判断当前编译类型，目前有 `weapp/swan/alipay/h5/rn/tt/qq/quickapp` 八个取值，可以通过这个变量来书写对应一些不同环境下的代码，在编译时会将不属于当前编译类型的代码去掉，只保留当前编译类型下的代码，例如想在微信小程序和 H5 端分别引用不同资源

```js
if (process.env.TARO_ENV === "weapp") {
  require("path/to/weapp/name");
} else if (process.env.TARO_ENV === "h5") {
  require("path/to/h5/name");
}
```

### 多端组件

假如有一个 Test 组件存在微信小程序、百度小程序和 H5 三个不同版本，那么就可以像如下组织代码

`test.js` 文件，这是 Test 组件默认的形式，编译到微信小程序、百度小程序和 H5 三端之外的端使用的版本

`test.h5.js` 文件，这是 Test 组件的 H5 版本

`test.weapp.js` 文件，这是 Test 组件的 微信小程序 版本

`test.swan.js` 文件，这是 Test 组件的 百度小程序 版本

`test.qq.js` 文件，这是 Test 组件的 QQ 小程序 版本

`test.quickapp.js` 文件，这是 Test 组件的 快应用 版本

四个文件，对外暴露的是统一的接口，它们接受一致的参数，只是内部有针对各自平台的代码实现

## 多端同步调试

从 1.3.5 版本开始，可以在 dist 目录下创建一个与编译的目标平台名同名的目录，并将结果放在这个目录下，例如编译到微信小程序，最终结果是在 `dist/weapp` 目录下，这样做的好处是，各个平台使用独立的目录互不影响，从而达到多端同步调试的目的，在 `config/index.js` 配置如下：

```js
outputRoot: `dist/${process.env.TARO_ENV}`;
```

多端同步调试需要在终端工具中打开多个 `Tab` 来同时执行 `taro` 命令进行同步调试

## 编译配置详情

### defineConstants

用于配置一些全局变量供代码中进行使用。

```js
module.exports = {
  // ...
  defineConstants: {
    A: '"a"', // JSON.stringify('a')
  },
};
```

### 小程序分包

对小程序进行分包，可以优化小程序首次启动的下载时间，以及在多团队共同开发时可以更好的解耦协作。

## 插件功能

### 主要功能

#### 命令行扩展

你可以通过编写插件来为 Taro 拓展命令行的命令，在之前版本的 Taro 中，命令行的命令是固定的，如果你要进行扩展，那你得直接修改 Taro 源码，而如今借助插件功能，你可以任意拓展 Taro 的命令行。

#### 编译过程扩展

## jQuery-like API

Taro 目前官方支持使用 React 或 Vue 构建视图，它们都是数据驱动的声明式渲染方式。

但在少数情况下，我们需要显式地操纵 DOM，而小程序提供的 createQuerySelector API 的用法又较为复杂难懂。在这样的情况下，我们提供了类似 jQuery 的系列 API。使用这个系列 API 很简单，只需要通过 NPM 安装依赖：

```bash
npm i @tarojs/extend
```

然后再需要使用文件引入 $ 即可：

```js
import { $ } from '@tarojs/extend'
```

## 渲染 HTML

### 自定义 HTML 样式

直接设置 HTML 不会让 HTML 标签带上浏览器的默认样式，Taro 提供两种内置样式我们可以直接引入生效：

`@tarojs/taro/html5.css`: `Chrome(Blink) HTML5` 的内置样式，内置样式丰富，包括了大多数 HTML5 标签，体积较大，不一定支持所有小程序容器。

为了让内置的标签样式起作用，我们还需要将 HTML 容器的 CSS 类设置为 `.taro_html`:

```js
import '@tarojs/taro/html.css'

function helloWorld() {
  const html = `<h1 style="color: red">Wallace is way taller than other reporters.</h1>`

  return <View className="taro_html" dangerouslySetInnerHTML={{ __html: html }}></View>
}
```
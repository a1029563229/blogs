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



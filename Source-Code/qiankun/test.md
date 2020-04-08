# 关于 qiankun 的全局污染

1. window 对象：无污染，沙箱在卸载时会还原到之前的状态。（新版本完全无污染）

2. localStorage：有污染，localStorage 会产生副作用，该副作用不可逆。如果需要做隔离，需要约束命名空间，或者自己通过 `storage` 做快照。

3. 全局 DOM 事件监听：
   1. `document.body.addEventListener` 有污染，无法检测到全局元素的事件监听，需要手动移除。
   2. `document.onclick` 这样的事件绑定方式无污染。

4. setInterval：无污染，但是建议手动移除。

5. 样式污染：
   1. 直接引入的样式有污染
   ```js
   import "app.css"; // 有污染
   // 沙箱挂载后执行
   function mount() {
     (() => import("app.css"))(); // 无污染
   }
   ```
   2. 非懒加载 + 没有加 `scoped` 标识符的样式会造成污染

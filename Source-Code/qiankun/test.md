# 关于 qiankun 的全局污染

测试 qiankun 的全局污染

1. window 对象：无污染，沙箱在卸载时会还原到之前的状态。

2. localStorage：有污染，localStorage 会产生副作用，该副作用不可逆。如果需要做隔离，需要约束命名空间，或者自己通过 `storage` 做快照。

3. 全局 DOM 事件监听（如 `document.body`）：有污染，无法检测到全局元素的事件监听，需要手动移除。

4. setInterval：无污染，但是建议手动移除。
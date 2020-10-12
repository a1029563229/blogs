# 从 B 站的秋季主题中学习到 CSS 的妙用

众所周知，[B站](https://www.bilibili.com/) 是个适合学习的好网站，我们团队的小伙伴也是经常上 `B站` 学习。

在某天上 `B站` 学习的时候，发现 `B站` 已经开启了秋季主题，并且在头图的这个交互上还内有乾坤。随着我们的鼠标变换位置，头图也跟随着我们的鼠标位置进行变换，配上秋季主题，显得特别治愈。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/bilibili/2.gif)

## 步骤分析

## 获取图片

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/bilibili/1.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/bilibili/3.png)

首先，我们打开控制台，获取图片

```js
[].slice.call(document.querySelectorAll(".animated-banner .layer img")).map(item => item.src);

"[
  "https://i0.hdslb.com/bfs/vc/8e084d67aa18ed9c42dce043e06e16b79cbb50ef.png",
  "https://i0.hdslb.com/bfs/vc/082e39ef757826401ef82da818310d42e05bc2de.png",
  "https://i0.hdslb.com/bfs/vc/dbd5c17c4315714de9e4ee119694d2e9efaf9639.png",
  "https://i0.hdslb.com/bfs/vc/cd9be0a2716adbae85fd899259381c4b2c2893c7.png",
  "https://i0.hdslb.com/bfs/vc/88537437a7916ecde847fa46652b44fbd3cbbb06.png",
  "https://i0.hdslb.com/bfs/vc/37d9a93baa55870506a6f3e6308e7a0c386b97c7.png"
]"
```

还有个动画轮播图

```js
setInterval(() => {
  console.log(document.querySelector(".animated-banner >.layer:nth-child(2) img").src);
}, 500);

https://i0.hdslb.com/bfs/vc/082e39ef757826401ef82da818310d42e05bc2de.png
https://i0.hdslb.com/bfs/vc/ddad7c909e4c2cf933473e971373d825e6f06519.png
https://i0.hdslb.com/bfs/vc/173eafe211b4671e5aff059a1834f3e4579c7a5d.png
```
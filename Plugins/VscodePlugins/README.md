# 盘一盘那些提效/创意的 vscode 插件

在前端开发中，`vscode` 是最常用的编辑器，而 `vscode` 有着各种实用插件，有些可以帮助我们提升效率，有些可以让我们的工作过程变得更加快乐。

今天我们就来介绍一下这些好用的插件吧~

## 提效类插件

### 代码神器 - Power Mode

首先，介绍的第一款插件是 `Power Mode`，它可以让你的编程过程变得更加快乐（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/10.gif)

除了上面那种效果外，这个插件还有其他的几种效果，都是不错的。接下来我们来学习一下如何使用吧！

首先我们在 `vscode` 插件栏搜索 `Power Mode`（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/11.png)

然后我们点击安装，安装后我们按下键盘组合键 `Ctrl + Shift + P`，然后输入 `setting`，打开 `JSON` 配置文件（如下图）

在最后添加下面三行配置：

```json
"powermode.enabled": true, // 开启 Power Mode
"powermode.shakeIntensity": 0, // 关闭抖动（喜欢的也可以选择不关闭）
"powermode.presets": "particles", // 特效预设，还有 "fireworks", "flames", "magic", "clippy", "simple-rift", "exploding-rift"
```

好了，可以开始你的 “特效编程之旅” 了！

### 高亮标识 - Todo Tree

我们在平时的业务开发中，代码文件越写越多，单文件越来越长。在修改代码时，总是需要频繁在文件中寻找想要的内容，或者在文件中上下滚动来寻找目标代码，然后进行修改。

这里可以推荐一个插件来帮助提高效率，那就是 `Todo Tree`，我们在应用商店搜索进行安装后，我们只需要添加 `// TODO:` 这样的注释代码，我们就可以在 `Todo Tree` 中快速定位到这行注释（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/17.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/12.png)

我们还可以通过下面的设置（`setting.json`），自定义颜色与高亮代码，然后我们就可以迅速定义关键方法的位置啦（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/13.png)

```json
"todo-tree.highlights.customHighlight": {
  "API": { // 关键词
    "background": "green", // 背景颜色
    "icon": "issue-closed", // icon
    "rulerColour": "green", // 文字颜色
    "iconColour": "green" // icon 颜色
  },
  "METHOD": {
    "foreground": "black",
    "background": "yellow",
    "icon": "issue-closed",
    "rulerColour": "yellow",
    "iconColour": "yellow"
  },
},
```

### 快速定位括号 - Bracket Pair Colorizer

写代码总是离不开各种类型的括号，当嵌套比较深的时候，然后需要改动结构时，括号问题经常会困扰我们。

`Bracket Pair Colorizer` 可以帮助你快速区分括号位置和类型，这样你就可以快速定位啦！（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/14.png)

### 拼写检查 - Code Spell Checker

我们在平时的开发过程中，有时候会因为变量名定义时和使用时不一致，debug 半天最后发现是拼写问题。

我们可以使用 `Code Spell Checker` 插件进行拼写检测，我们安装插件后，还可以在 `setting.json` 中指定检测的文件，比如我这里开启了对 `Vue` 文件的拼写检查（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/15.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/16.png)

## Git 管理

vscode 有很多 `Gi1t` 管理的插件，可以帮助你来管理 `Git` 仓库。

### Git History

`Git History` 可以帮助你迅速查看 `Git` 历史记录，图形化的页面，使 `Git` 历史一目了然（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/1.png)

我们还可以查看指定文件的指定版本（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/2.png)

我们还可以将光标停留在某一行代码，查看该行代码的提交信息（提交人、提交时间、提交信息）（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/3.png)

### Git Graph

`Git Graph` 可以帮助你更好的分析分支之间的关系（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/4.png)

### Git Emoji

`Git Emoji` 可以更好的帮助团队形成提交规范，使用一个 `Emoji` 表情概括本次提交，再加上一些文本描述信息，提交记录将会变得赏心悦目（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/5.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/6.png)

### GitLens

`GitLens` 可以帮助你快速比对不同分支的代码差异（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/7.png)

## 番外

### 在 vscode 里画流程图 - draw.io

安装 `draw.io` 后，新建一个 `helloworld.drawio`，就可以在 `vscode` 里面画流程图啦（如下图）！

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/8.png)

用来画一些简单的流程图还是不错的，`vscode` 全栈工程师。

### 彩虹屁 - Rainbow Fart

`Rainbow Fart` 是个鼓励师插件，在你敲代码的时候一直鼓励你，语音包可以选择声音甜美的小姐姐。

安装完成后，按下键盘组合键 `Ctrl + Shift + P`，输入 `Enable Rainbow Fart` 并回车，这时候会打开一个新页面用于播放语音（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/share/plugin/9.png)

这时候，新建一个文件开始敲代码吧，比如写一个 `for` 循环，或者写一个 `function`，都会有惊喜哟~

## 总结

好啦，本次的 `vscode` 插件分析就到这里啦！大家有什么好用的插件也可以在留言区留言分享哟~

下期预告：

盘一盘那些提效/创意的网站

## 最后一件事

如果您已经看到这里了，希望您还是点个赞再走吧~

您的点赞是对作者的最大鼓励，也可以让更多人看到本篇文章！

如果觉得本文对您有帮助，请帮忙在 [github](https://github.com/a1029563229/Blogs) 上点亮 `star` 鼓励一下吧！

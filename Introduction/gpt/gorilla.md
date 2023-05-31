# 通过 Gorilla 入门机器学习

机器学习是一种人工智能领域的技术和方法，旨在让计算机系统能够从数据中学习和改进，而无需显式地进行编程。它涉及构建和训练模型，使其能够自动从数据中提取规律、进行预测或做出决策。

我对于机器学习这方面的了解可以说是一片空白，既不懂机器学习，也不懂 python，更不懂算法。

像我这样的人，在短时间内精通机器学习是不可能的。

那么，现在我可以通过哪些渠道来快速了解机器学习呢？或者说，玩一玩？

答案就是通过 `Gorilla` 这个开源项目来实现机器学习。

## Gorilla 简介&使用

Gorilla 是一个基于 LLM 实现的对话模型，可以接收用户提供的需求，然后给出能够实现需求的机器学习模型 API，目前支持的开源模型 API 来源包含：Hugging Face、Torch、and TensorFlow.

我们可以在 Google 的 Colab 上面运行 Gorilla，也可以在本地运行 Gorilla。

这里我使用 Colab 来运行 Gorilla。

Gorilla 提供了两个案例，一个是翻译的案例，一个是图像识别的案例。

这里我选用了图像识别的案例，点击运行。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/20230531194742.png)

从图中可以看出，我们给出的需求是 `构建一个可以识别图片中的物体的机器人`，使用的模型来源是 `Hugging Face`。

它的回答是：

- 步骤：

1. 引入 `PIL` 和 `transformers` 相关依赖, 其中包含的 `DetrForObjectDetection` 可用于图像识别。
2. 使用 `from_pretrained` 方法加载模型，模型可以用来识别图片中的物体。
3. 从远端下载图片，然后使用 `PIL` 处理图片。
4. 使用模型识别图片中的物体，然后将识别结果返回。

最后，它给出了一段代码，我们可以直接复制到本地文件中运行。

运行之前，需要保证本地具备 `python3` 工作环境，同时需要使用 `pip` 将代码中使用到的依赖进行安装。

我在简单尝试后，发现这段代码是无法运行的，这也是大多数 `LLM` 模型的通病，看起来很专业的答案，但是实际代码是无法运行的。

## Hugging Face 模型

不过，整体代码逻辑我看了一眼，是可以理解的，那么，我们可以自己动手来实现这个需求。

首先，在网上找到 `Hugging Face`，在里面发现了很多模型，这里我选择了最多下载的模型 —— 识别车牌。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/20230531204146.png)

点进去可以看到功能介绍及示例代码。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/2.jpg)

我把代码放到本地，下载相关依赖后，同时准备了下面这张待处理的图片。

```python
import yolov5

# load model
model = yolov5.load('keremberke/yolov5m-license-plate')
  
# set model parameters
model.conf = 0.25  # NMS confidence threshold
model.iou = 0.45  # NMS IoU threshold
model.agnostic = False  # NMS class-agnostic
model.multi_label = False  # NMS multiple labels per box
model.max_det = 1000  # maximum number of detections per image

# set image
img = 'example.jpg'

# perform inference
results = model(img, size=640)

# inference with test time augmentation
results = model(img, augment=True)

# parse results
predictions = results.pred[0]
boxes = predictions[:, :4] # x1, y1, x2, y2
scores = predictions[:, 4]
categories = predictions[:, 5]

# show detection bounding boxes on image
results.show()

# save results into "results/" folder
results.save(save_dir='results/')
```

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/4.jpg)

使用 `py` 命令运行代码后，我得到了处理后的图片。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/10.png)

它成功的将图片中清晰可见的车牌扫描出来了，结果是 2 个。

对于完全没了解过相关知识的我，能做到这一步，我还是觉得有些意外的。

我又尝试了一下 `Hugging Face` 上的其他免费模型，都挺有意思的，大家感兴趣的可以自己去尝试一下。

## 小结

`Gorilla` 目前提供给我的代码，并没有帮助我写出一个可用的项目。

但是，它所提供的思路和方向是正确的，并且相关的模型也是可以使用的。

作为 0 基础选手，通过 `Gorilla`，确实可以快速的了解到机器学习的相关知识，同时也可以快速的实现一个机器学习的项目。

下面附上一些相关资料，包含 Gorilla 教程：

[Gorilla 官方地址](https://github.com/ShishirPatil/gorilla)

[Gorilla Colab](https://colab.research.google.com/drive/1DEBPsccVLF_aUnmD0FwPeHFrtdC0QIUP?usp=sharing#scrollTo=WochUPqf8HLa)

[Hugging Face 模型](https://huggingface.co/keremberke)

## 最后一件事

如果您已经看到这里了，希望您还是点个赞再走吧~

您的点赞是对作者的最大鼓励，也可以让更多人看到本篇文章！

如果觉得本文对您有帮助，请帮忙在 [github](https://github.com/a1029563229/Blogs) 上点亮 `star` 鼓励一下吧！
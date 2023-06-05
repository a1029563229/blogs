# [译]你的 ChatGPT 使用姿势是错的！告诉你 4 个使用 ChatGPT 的小技巧

> 本文译自 [You’re Using ChatGPT Wrong! Here’s How to Be Ahead of 99% of ChatGPT Users](https://artificialcorner.com/youre-using-chatgpt-wrong-here-s-how-to-be-ahead-of-99-of-chatgpt-users-886a50dabc54)

大部分人使用 ChatGPT 的方式都是错的，比如：

1. 没有在提问时提供案例。
2. 忽略了可以通过设置 ChatGPT 的角色来控制它的行为。
3. 没有提供过多有效信息，而是让 ChatGPT 猜猜猜。

之所以会犯这些错误，是因为我们使用 ChatGPT 时还停留在传统思维上。这样的话，就会导致我们有时候得不到正确的答案。

我们需要学习如何更好地向 ChatGPT 提需求，就像是学习如何做一名“AI 提示工程师”。

在本篇教程中，我将会告诉你 4 个关于使用 ChatGPT 的小技巧。

## 1. 标准的需求范式

标准的需求范式包含以下三个部分：

  - 需求/任务描述
  - 案例
  - 需要处理的信息

当我们在提需求时提供了案例，ChatGPT 的回答将会充分参考你提供的案例，这会使得到正确答案的概率大大提高。所以，标准的提问范式中必须要包含案例。

下面这个案例就是一个标准的需求范式，我提供了需求描述和实际案例，再将需要处理的信息提供给 ChatGPT，将需要它完成的部分进行留白处理。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common4/Xnip2023-06-04_15-00-00.jpg)

请注意，你提供的案例不一定需要是正确的，即使你提供的案例是错误的，它也能够正常工作。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common4/Xnip2023-06-04_15-10-33.jpg)

虽然案例的结果可以是错的，但是要注意案例的方向别弄错了，比如你的需求是翻译中文到英文，但是你提供了一个中文翻译成泰文的案例，就会导致结果出现一些问题。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common4/Xnip2023-06-04_15-18-21.jpg)

在 ChatGPT 内部使用了一种叫做 `标签空间` 的概念，标签空间被用来组织和分类所有的问题与答案。而我们提供的案例就是帮助 ChatGPT 建立标签空间，从而能够帮助我们得到更正确的回答，并且格式化输出。

## 2. 角色扮演

在有些时候，ChatGPT 并不能给到你想要的答案。这时候，我们就需要用到 `角色扮演` 了。

比如你最近准备找工作，你想锻炼一下你的面试能力。你可以告诉 `ChatGPT`：

- 我需要你扮演一名面试官。我将会作为面试者，来回答你作为“前端开发工程师”面试官提出的面试题。你不需要和我进行任何除了面试以外的对话，我只需要你对我进行面试即可。用技术相关的问题考察我的技术能力，而且不需要加以解释，然后等待我的回答。一次只问一个问题，我来回答，回答后再问另一个问题。我的开场白是：你好，面试官。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common4/Xnip2023-06-04_15-38-18.jpg)

从上图可以看出，`ChatGPT` 用相关的前端技术问题对我进行考察，并且能够识别出我的回答是否正确，然后进行点赞或纠正。作为一个有正确反馈的系统，它可以迅速提升你在某些领域的能力。

你只需要和 `ChatGPT` 说 `请你扮演 xx 角色`，然后再补充一些描述信息即可，就可以让 `ChatGPT` 扮演各个行业的专家，然后做很多的事情，比如作为你的英语私教，又或是作为一名专业影评人来评价电影。

这个 [网站](https://www.aishort.top/) 收录了各种 `ChatGPT` 的 `coser` 身份。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images%5Cimages%5C%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230605111226.png)

## 3. 自媒体创作

`ChatGPT` 还特别擅长于 `无中生有`，也就是凭空捏造出邮件、博客、故事、文章等信息。

在创作之前，我们需要给 `ChatGPT` 先润色一下，让它能够按照我们预设的语气、风格、形式来进行创作。

如果你只是告诉 `ChatGPT` 像下面这样创作的话，你只能得到一篇生硬的文章。

> 写一篇主题为[AI 将会怎样替代人类]的 500 字文章。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images%5Cimages%5C%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230605092600.png)

所以，我们需要比其他人更进一步，添加一些具体的形容词来描述我们的需求。

> 写一篇`诙谐幽默的`，主题为[AI 为什么不会取代人类]的 500 字文章。在创作时，你的身份是有十几年经验的 AI 领域专家，请用一些`有趣的`例子加以解释。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/616.png)

除了文章风格以外，多使用形容词描述你的创作需求，还可以避开 AI 生成检测器。在上面的案例中，第一个案例的 AI 内容测试得分是 `78`，而第二个案例的 AI 内容测试得分是 `85`，本篇文章的得分是 `91`.(???)

## 4. 详细的推理过程

如果你问 `ChatGPT` 一些数学或者常识问题，它会直接给出答案，而不会给出它的推理过程。这样可能会导致 `ChatGPT` 会在一些简单的问题上（例如基础的加减乘除），给出错误的回答。

我们可以通过提供一些案例，来告诉 `ChatGPT` 如何进行推理，同时将推理过程呈现出来，从而得到正确的答案。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images%5Cimages%5C%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230605102143.png)

我们可以看到，在给出推理过程中，`ChatGPT` 基本上都能给出最终的正确答案。在数学、常识、逻辑推理类问题中，让 `ChatGPT` 给出详细的推理过程是提高回答正确性和质量的关键。

> 注意：GPT-4 的推理能力已经得到了加强，可能不再需要让它给出详细的推理过程，也能得到正确的答案，大家可以自行尝试一下。

## 最后一件事

如果您已经看到这里了，希望您还是点个赞再走吧~

您的点赞是对作者的最大鼓励，也可以让更多人看到本篇文章！

如果觉得本文对您有帮助，请帮忙在 [github](https://github.com/a1029563229/Blogs) 上点亮 `star` 鼓励一下吧！
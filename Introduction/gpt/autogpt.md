# AutoGPT 使用教程及上手体验（一分钟配置可用）

ChatGPT 是新一代 AI 文本助手，可以帮助解决我们在多个领域的问题。

在某些复杂问题上，ChatGPT 需要经过不断的调教与沟通，才能得到接近正确的答案。

当你是某个领域的专家时，你很容易做到这一点。

但是，在你不熟悉的领域，你甚至不知道该怎么提问。

所以，在一个不精通的领域，要怎么向 ChatGPT 正确提问，得到正确答案呢？

我们可以使用 AutoGPT，AutoGPT 是基于 ChatGPT 的文本 AI 助手，在 ChatGPT 的基础上做了增强，用户在终端输入指令后，AutoGPT 可以根据最终的目标，不断生成任务及提示语交给 ChatGPT 处理，然后一步又一步的接近正确答案，在得到最终结果返回给用户。

## 使用教程

在引入 docker 后，AutoGPT 的使用变得更加简单。

### 第一步：拉取 docker 镜像

```bash
docker pull significantgravitas/auto-gpt
```

### 第二步：创建项目文件夹

AutoGPT 需要一个目录放置配置文件及运行日志，创建一个项目目录，并且将其添加进 `docker` 的 `File sharing`（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images%5Cimages%5C%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230530164644.png)

### 第三步：添加配置文件

1. 添加 `.env` 配置文件

```env
OPENAI_API_KEY=【写入你的 OpenAI key】
ALLOWLISTED_PLUGINS=
DENYLISTED_PLUGINS=
```

个人的 `openai-key` 需要写入 `env` 文件中，可以在 [OpenAI Keys](https://platform.openai.com/account/api-keys) 生成一个用于使用。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images%5Cimages%5C%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230530165257.png)

2. 添加 `docker-compose.yml` 配置文件

```yml
version: "3.9"
services:
  auto-gpt:
    image: significantgravitas/auto-gpt
    depends_on:
      - redis
    env_file:
      - .env
    environment:
      MEMORY_BACKEND: ${MEMORY_BACKEND:-redis}
      REDIS_HOST: ${REDIS_HOST:-redis}
    profiles: ["exclude-from-up"]
    volumes:
      - ./auto_gpt_workspace:/app/autogpt/auto_gpt_workspace
      - ./data:/app/data
      ## allow auto-gpt to write logs to disk
      - ./logs:/app/logs
      ## uncomment following lines if you want to make use of these files
      ## you must have them existing in the same folder as this docker-compose.yml
      #- type: bind
      #  source: ./azure.yaml
      #  target: /app/azure.yaml
      #- type: bind
      #  source: ./ai_settings.yaml
      #  target: /app/ai_settings.yaml
  redis:
    image: "redis/redis-stack-server:latest"
```

### 第四步：启动 AutoGPT

输入命令：

```bash
docker-compose run --rm auto-gpt --gpt3only
```

可以看到控制台输出，代表启动成功（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/1_20230530165758.png)

到这里，就可以向 `AutoGPT` 输入你的目标了。

## 上手体验 - `淘宝童装选品`

我准备让 `AutoGPT` 帮我做 `淘宝童装选品`，看看它是怎么做的吧。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images%5Cimages%5C%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230530170409.png)

可以看到，它对于一个任务，会将其按照套路拆解：

    - Name：任务名称
    - Role：给 ChatGPT 设定的角色
    - Goals：任务目标
    - THOUGHTS：想法 —— 它认为当前第一步是需要分析当前市场流行的趋势，分析流行趋势有利于帮助更好选品。
    - REASONING：推理 —— 分析市场从而更好的了解当前的市场需求，
    - PLAN：行动计划
        1. 使用谷歌搜索当前童装市场的流行趋势
        2. 分析数据找到市场机会
        3. 将分析结果写入到本地文件中
    - CRITICISM：意见 —— 需要保证数据是正确的，从而保证分析结果是正确的。
    - NEXT ACTION：下一步 —— 使用 Google 搜索当前童装市场的流行趋势
    
输入 `y` 可以让它继续，输入 `y -N` 可以让它继续往下 `N` 步而不需要确认，这里我输入 `y`，它将在 `Google` 进行搜索。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images%5Cimages%5C%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230530171603.png)

这里可以看到：

    - 系统操作：在 `Google` 搜索到了一堆童装市场的数据，JSON 格式。
    - 想法：现在，我们有了一些市场数据，我们需要分析这些数据，分析前先把这些数据存起来。
    - 推理：分析数据可以有助于得出更有效的答案。把数据存起来可以在后面分析时随时进行回顾。
    - 计划：分析数据，存储数据。
    - 意见：仍然需要保证数据的正确性。
    - 下一步：将数据写到本地存起来先。
    
输入 `y`，就可以在本地看到存储的文件记录了。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images%5Cimages%5C%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230530172133.png)

然后再看它下一步准备做什么，他准备执行一个 `python` 脚本来进行数据分析。由于这个文件不存在，所以他又自己把这个文件写进来，然后又做了一轮代码分析。代码分析完了以后，觉得代码有问题，它又进行调整...

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/1_20230530172654.png)

这是它写的代码，我感觉还是有问题的，它要读取的 `csv` 文件并不存在啊（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images%5Cimages%5C%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230530172704.png)

然后，我发现我高估它了，它连 `pandas` 这个依赖包都不存在，它还要去谷歌搜索一下怎么安装 `pandas` 包。然后，我们又可以看到它的一系列迷惑行为。（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/1_20230530173354.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/1_20230530173523.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/1_20230530173735.png)

迷惑归迷惑，它还真把依赖问题给解决了，然后接着往下执行，果然还是遇到了 `csv` 文件不存在的问题，类似的问题还有一大堆，我这里直接输入 `y -20`，让它自己先跑一段时间，等下我们再来看结果。

下面就是运行了 20 次后的结果。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/1_20230530180140.png)

我简单描述一下：它发现 `csv` 文件不存在，然后跑去网上找数据，然后找了半天，在 `yahoo` 上找到了，准备下载，写了个下载数据的脚本，结果下载数据的脚本又报错了，然后又在改下载数据的脚本。

结果就是，我的账户已经烧掉了 0.3 刀乐，也就是两块多，结果它连一点有效信息也还没提供给我，还在 `debug` 它的那个破脚本。

我决定让它再跑一阵子试试...

又跑了 10 次后，然后我发现它进入了一个死循环：
    
    - 执行 `python` 脚本分析数据
    - csv 文件不存在，下载文件（实际下载没成功）
    - 执行 `python` 脚本分析数据
    - csv 文件不存在，下载文件（实际下载没成功）
    - ...

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/images/1_20230530181553.png)

它一直反复这两步，无法再继续工作下去了，更别说达成目标了。

本次体验，到此结束。

### 体验小结

它能做的事情看起来确实很强大，全自动化的 AI 助手，只需要你输入指令，他就能自己设定目标和计划，然后去完成。

但是，经过实际体验后，我发现它还是存在几个问题，导致它没法很好的应用于实际生产工作中：

    1. 非异步模型，任务执行周期长，我到现在还没有完整执行完成过一次任务，实际可应用性存疑。
    2. 每一次都是从 0 开始，单次费用成本特别高（预计 $1 - $15），一次下去烧的都是真金白银的刀乐，我用的是还是 GPT3 模型， 而 GPT4 更贵。免费额度（$5）用完后，很难再持续维系下去。
    3. 重复性的动作特别多，这些动作会增加任务耗时，同时消耗你的 OpenAI 费用额度，在某些情况下还会陷入死循环。
    4. 中文支持仅限于第一句，后续都是英文，对英文阅读水平有要求。

最后，我的结论是：

这是一个初见感觉很惊艳的产品，但是实际上手后会发现，目前来说它可能只是个充满科技感的高级“玩具”，并不能给你的工作带来更多实质性的帮助。

## 最后一件事

如果您已经看到这里了，希望您还是点个赞再走吧~

您的点赞是对作者的最大鼓励，也可以让更多人看到本篇文章！

如果觉得本文对您有帮助，请帮忙在 [github](https://github.com/a1029563229/Blogs) 上点亮 `star` 鼓励一下吧！
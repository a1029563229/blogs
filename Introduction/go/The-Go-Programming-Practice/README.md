# Go 语言圣经-习题汇总（Go 程序设计语言/The Go Programming Language）

本文针对 Go 语言圣经 - 《Go 程序设计语言/The Go Programming Language》的所有习题进行筛选去重后，选取了一些比较典型的案例（80%以上）进行解析解答，分为两个版本，分别适合有原书和没有原书的童鞋进行学习巩固，本文将持续更新。

![Go 语言圣经](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/new/Jietu20191214-094452.png)

## 原书版

### 第一章：入门

- [1.1：修改 echo 程序输出 os.Args[0]，即命令的名称。](https://github.com/a1029563229/The-Go-Programming-Language/tree/master/practice/1/1.1)
- [1.2：修改 echo 程序，输出参数的索引和值，每行一个。](https://github.com/a1029563229/The-Go-Programming-Language/tree/master/practice/1/1.2)
- [1.3：尝试测量可能低效的程序和使用 strings.Join 的程序在执行时间上的差异。](https://github.com/a1029563229/The-Go-Programming-Language/tree/master/practice/1/1.3)
- [1.4：修改 dup2 程序，输出出现重复行的文件的名称。](https://github.com/a1029563229/The-Go-Programming-Language/tree/master/practice/1/1.4)
- [1.7：函数 io.Copy(dst, src) 从 src 读，并且写入 dst。使用它代替 ioutil.ReadAll 来复制响应内容到 os.Stdout，这样不需要装下整个响应数据流的缓冲区。确保检查 io.Copy 返回的错误结果。](https://github.com/a1029563229/The-Go-Programming-Language/tree/master/practice/1/1.7)
- [1.8：修改 fetch 程序添加一个 http:// 前缀（假如该 URL 参数缺失协议前缀）。可能会用到 strings.HasPrefix。](https://github.com/a1029563229/The-Go-Programming-Language/tree/master/practice/1/1.8)
- [1.9：修改 fetch 来输出 HTTP 的状态码，可以在 resp.Status 中找到它。](https://github.com/a1029563229/The-Go-Programming-Language/tree/master/practice/1/1.9)
- [1.10：找一个产生大量数据的网站。连续两次运行 fetchall，看报告的时间是否会有大的变化，调查缓存情况。每一次获取的内容一样吗？修改 fetchall 将内容输出到文件，这样可以检查它是否一致。](https://github.com/a1029563229/The-Go-Programming-Language/tree/master/practice/1/1.10)
- [1.11：使用更长的参数列表来尝试 fetchall，例如使用 alexa.com 排名前 100 万的网站。如果一个网站没有响应，程序的行为是怎样的？](https://github.com/a1029563229/The-Go-Programming-Language/tree/master/practice/1/1.11)

### 第二章：程序结构

- [2.1：添加类型、常量和函数到 tempconv 包中，处理以开尔文为单位（K）的温度值， 0K = -273.15℃，变化 1K 和变化 1 ℃ 是等价的。](https://github.com/a1029563229/The-Go-Programming-Language/tree/master/practice/2/2.1)
- [2.2：写一个类似于 cf 的通用的单位转换程序，从命令行参数或者标准输入（如果没有参数）获取数字，然后将每一个数字转换为以摄氏温度和华氏温度表示的温度，以英寸和米表示的长度单位，以磅和千克表示的重量，等等。](https://github.com/a1029563229/The-Go-Programming-Language/tree/master/practice/2/2.2)
- [2.3：使用循环重写 PopCount 来代替单个表达式。对比两个版本的效率。](https://github.com/a1029563229/The-Go-Programming-Language/tree/master/practice/2/2.3)

## 无原书版

暂无

[原文地址，欢迎收录](https://github.com/a1029563229/Blogs/tree/master/Introduction/go/The-Go-Programming-Practice)

[读书笔记，欢迎收录](https://github.com/a1029563229/The-Go-Programming-Language)

[Go 学习笔记，欢迎收录](https://github.com/a1029563229/go-excerpt)

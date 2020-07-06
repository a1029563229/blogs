# 开始学习 C++

## 进入 C++

案例（如下图）：

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/3.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/4.png)

通常，C++ 程序必须包含一个名为 `main()` 的函数。

### C++ 预处理器和 iostream 文件

```cpp
#include <iostream>
```

该编译指令导致预处理器将 `iostream` 文件的内容添加到程序中。这是一种典型的预处理器操作：在源代码被编译之前，替换或添加文本。`iostream` 文件的内容将取代程序中的代码行 `#include <iostream>`。

> 注意：使用 `cin` 和 `count` 进行输入和输出的程序必须包含文件 `iostream`。

### 头文件名

像 `iostream` 这样的文件叫做包含文件（include file） —— 由于它们被包含在其他文件中；也叫头文件（header file） —— 由于它们被包含在文件起始处。

C++ 编译器自带了很多头文件，每个头文件都支持一组特定的工具。C 语言的传统是，头文件使用扩展名 h，将其作为一种名称标识文件类型的简单方式。例如
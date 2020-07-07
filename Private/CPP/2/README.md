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

C++ 编译器自带了很多头文件，每个头文件都支持一组特定的工具。C 语言的传统是，头文件使用扩展名 h，将其作为一种名称标识文件类型的简单方式。例如，头文件 `math.h` 支持各种 C 语言数学函数，但 C++ 的用法变了。现在，对老式 C 的头文件保留了扩展名 h（C++ 程序仍可以使用这种文件），而 C++ 头文件则没有扩展名。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/5.png)

### 名称空间

如果使用 `iostream`，而不是 `iostream.h`，则需要通过名称空间编译指令 `using namespace std` 来使 `iostream` 对程序可用。

使用 `using namespace std` 可以让 `iostream` 的代码不需要带 `std` 前缀。而更好的方法是，通过 `using` 声明来使所需的名称可用：

```cpp
using std::cout;
using std::endl;
using std::cin;
```

### 使用 cout 进行 C++ 输出

从概念上看，输出是一个流，即从程序流出的一系列字符。`cout` 的对象属性包括一个插入运算符（<<），它可以将右侧的信息插入到流中。它将字符串插入到输出流中。因此，与其说程序显示了一条消息，不如说它将一个字符串插入到了输出流中（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/6.png)

### 类简介

类描述了一种数据类型的全部属性（包括可使用它执行的操作），对象是根据这些描述创建的实体。

## 函数

在使用函数之前，C++ 编译器必须知道函数的参数类型和返回值类型。C++ 提供这种信息的方式是使用函数原型语句。原型结尾的分号代表它是一条语句，这使得它是一个原型，而不是函数头（如下）。

```cpp
double sqrt(double);
```

`C++ 程序应当为程序中使用的每个函数提供原型。`

### 用户定义的函数

对于库函数，在使用之前必须提供其原型，通常把原型放到 `main()` 定义之前。但是自己的定义的函数必须提供新函数的源代码，通常放在 `main()` 函数的后面。


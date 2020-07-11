# 复合类型

## 数组

数组（array）是一种数据格式，能够存储多个同类型的值。

声明数组的通用格式如下：

```cpp
typeName arrayName[arraySize]
```

只有在定义数组时才能使用初始化，此后就不能使用了，也不能将一个数组赋给另一个数组。如果只对数组的一部分进行初始化，则编译器将把其他元素设置为 0。

## 字符串

存储在连续字节中的一系列字符意味着可以将字符串存储在 char 数组中，其中每个字符都位于自己的数组元素中。

### 字符串输入

`cin` 使用空白（空格、制表符和换行符）来确定字符串的结束位置。

面向行的输入：`cin.getline()`、`cin.get()`。

### string 类

要使用 `string` 类，必须在程序中包含头文件 `string`。`string` 类位于名称空间 `std` 中，因此必须提供一条 `using` 编译指令。

函数 `strlen()` 是一个常规函数，它接受一个 C- 风格字符串作为参数，并返回该字符串包含的字符数。

## 结构简介

结构可以存储多种类型的数据。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/15.png)

在 C++ 中，结构标记的用法与基本类型名相同。这种变化强调的是，结构声明定义了一种新类型。

## 共用体

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/16.png)

共用体常用于（但并非只能用于）节省内存。对于嵌入式系统编程，如控制烤箱、MP3 播放器或火星漫步者的处理器 - 这些应用程序来说，内存可能非常宝贵。

## 枚举

```cpp
enum spectrum { red, orange, yellow }
```

在默认情况下，后面没有被初始化的枚举量的值将比其前面的枚举量大 1。

## 指针和自由存储空间

计算机程序在存储数据时，必须跟踪的 3 种基本属性：信息存储在何处、存储的值为多少、存储的信息是什么类型。

只需要对变量应用地址运算符（&），就可以获得它的位置（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/17.png)

一种特殊类型的变量——指针用于存储值的地址。因此，指针名表示的是地址。`*` 运算符被称为间接值（indirect value）或解除引用（dereferencing）运算符，将其应用于指针，可以得到该地址处存储的地址（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/18.png)


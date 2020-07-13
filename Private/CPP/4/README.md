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

#### 声明和初始化指针

声明如下：

```cpp
int * p_updates
```

这表明，`*p_updates` 的类型为 `int`。由于 * 运算符被用于指针，因此 `p_updates` 变量本身必须是指针。我们说 `p_updates` 指向 `int` 类型，我们还说 `p_updates` 的类型是指向 `int` 的指针，或 `int*`。可以这样说，`p_updates` 是指针（地址），而 `*p_updates` 是 `int`，而不是指针。

在 C++ 中，`int*` 是一种符合类型，是指向 `int` 的指针。

在 C++ 创建指针时，计算机将分配用来存储地址的内存，但不会分配用来存储指针所指向的数据的内存。

#### 使用 new 来分配内存

```cpp
int *pn = new int;
```

`new int` 告诉程序，需要适合存储 `int` 的内存。`new` 运算符根据类型来确定需要多少字节的内存。然后，它找到这样的内存，并返回其地址。接下来，将地址赋给 `pn`，`pn` 是被声明为指向 `int` 的指针。现在，`pn` 是地址，而 `*pn` 是存储在那里的值。

为一个数据对象（可以是结构，也可以是基本类型）获得并指定分配内存的通用格式如下：

```cpp
typeName *pointer_name = new typeName;
```

由于程序知道指针的类型，所以 `cout` 知道要读取多少字节以及如何解释它们。

`new` 分配的内存块通常与常规变量声明分配的内存块不同。常规变量被存储在被称为 `栈(stack)` 的内存区域中，而 `new` 从被称为 `堆（heap）` 或 `自由存储区(free store)` 的内存区域分配内存。

#### 使用 delete 释放内存

delete 运算符可以在使用完内存后，将其归还给内存池。
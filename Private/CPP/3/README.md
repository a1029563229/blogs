# 处理数据

## 简单变量

可以在程序中使用 C++ 工具来检查类型的长度。首先，`sizeof` 运算符返回类型或变量的长度，单位为字节。

头文件 `climits` 定义了符号常量来表示类型的限制（如下）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/8.png)

`climits` 文件中包含了下面类似的语句行：

```cpp
#define INT_MAX 32767
```

在 C++ 编译过程中，首先将源代码传递给预处理器。在这里，`#define` 和 `#include` 一样，也是一个预处理器编译指令。该编译指令告诉预编译器：在程序中查找 `INT_MAX`，并将所有的 `INT_MAX` 都替换成 32767。因此 `#define` 编译指令的工作方式与文本编辑器或字处理器中的全局搜索并替换指令相似。

C++ 的整型溢出（如下图）：

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/9.png)

`cout << hex` 可以修改 `cout` 显示整数的方式。

`cout.put()` 将显示字符。

### char 字面值

ASCII 系统中的对应情况如下：

  - 'A' 为 65，即字符 A 的 ASCII 码；
  - 'a' 为 97，即字符 a 的 ASCII 码；

转义符（如下图）：

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/10.png)

> Unicode 提供了一种表示各种字符集的解决方案——为大量字符和符号提供标准数值编码，并根据类型将他们分组。例如，ASCII 码为 Unicode 的子集。

### wchar_t

程序需要处理的字符集可能无法用一个 8 位的字节表示，如日文汉字系统。此时使用 `wchar_t` 类型，将每个字符存储在一个或两个字节的内存单元中。

## const 限定符

创建常量的通用格式如下：

`const type name = value;`

`const` 要比 `#define` 更适合用来定义常量。

## 浮点数

浮点数能够表示小数值、非常大和非常小的值，它们的内部表示方法与整数有天壤之别。

`d.dddE+n` 指的是将小数点向右移 n 位，而 `d.dddE~n` 指的是将小数点向左移 n 位。之所以称为 “浮点”，就是因为小数点可移动。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/11.png)

## C++ 算术运算符

运算符重载（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/12.png)

### 类型转换

C++ 自动执行很多类型转换：

  - 将一种算术类型的值赋给另一种算术类型的变量时，C++ 将对值进行转换；
  - 表达式中包含不同的类型时，C++ 将对值进行转换；
  - 将参数传递给函数时，C++ 将对值进行转换；

潜在的数值转换问题（如下图）：

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/13.png)

将浮点型转换为整型时，C++ 采取截取（丢掉小数部分）而不是四舍五入。

当运算涉及两种类型时，较小的类型将被转换为较大的类型。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/14.png)

#### 强制类型转换

强制转换的通用格式如下：

```cpp
(typename) value
typename (value)
```

强制类型转换不会修改变量本身，而是创建一个新的、指定类型的值，可以在表达式中使用这个值。

## 总结

C++ 的基本类型分为两组：一组由存储为整数的值组成，另一组由存储为浮点格式的值组成。整型之间通过存储值时使用的内存量及有无符号来区分。整型从最小到最大一次是：`bool、char、signed char、unsigned char、short、unsigned short、int、unsigned int、long、unsigned long` 以及 C++11 新增的 `long long` 和 `unsigned long long`。还有一种 `wchat_t` 类型，它在这个序列中的位置取决于实现。C++11 新增了类型 `char16_t` 和 `char32_t`，它们的宽度足以分别存储 16 和 32 位的字符编码。C++ 确保了 `char` 足够大，能够存储系统基本字符集中的任何成员，而 `wchar_t` 则可以存储系统扩展字符集中的任意成员，`short` 至少为 `16` 位，而 `int` 至少与 `short` 一样长，`long` 至少为 32 位，且至少和 `int` 一样长。确切的长度取决于实现。

字符通过其数值编码来表示。I/O 系统决定了编码是被解释为字符还是数字。

浮点类型可以表示小数值以及比整型能够表示的值大得多的值。3 种浮点类型分别是 `float、double 和 long double`。C++ 确保 `float` 不比 `double` 长，而 `double` 不比 `long double` 长。通常，`float` 使用 32 位内存，`double` 使用 64 位，`long double` 使用 80 到 128 位。

通过提供各种长度不同、有符号或无符号的类型，C++ 使程序员能够根据特定的数据要求选择合适的类型。

C++ 使用运算符来提供对数字类型的算术运算：加、减、乘、除和求模。当两个运算符对同一个操作数进行操作时，C++ 的优先级和结合性原则可以确定先执行哪种操作。

对变量赋值、在运算中使用不同类型、使用强制类型转换时，C++ 将把值从一种类型转换为另一种类型。很多类型转换都是 “安全的”，即可以在不损失和改变数据的情况下完成转换。例如，可以把 `int` 值转换为 `long` 值，而不会出现任何问题。对于其他一些转换，如将浮点类型转换为整型，则需要更加小心。


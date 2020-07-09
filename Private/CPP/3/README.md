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
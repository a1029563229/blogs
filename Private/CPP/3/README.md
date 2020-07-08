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


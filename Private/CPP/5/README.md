# 循环和关系表达式

## for 循环

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/20.png)

当判定表达式的值这种操作改变了内存中数据的值时，我们说表达式有副作用（side effect）。

## 基于范围的 for 循环（C++11）

```cpp
double prices[5] = { 4.99, 10.99, 6.87, 7.99, 8.49 };
for (double x : prices)
  cout << x << endl;
```

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/21.png)

## 总结

C++ 提供了 3 种循环：for 循环、while 循环和 do while 循环。如果循环测试条件为 true 或非零，则循环将重复执行一组命令；如果测试条件为 false 或 0，则结束循环。for 循环和 while 循环都是入口条件循环，这意味着程序将在执行循环体中你的语句之前检查测试条件。do while 循环是出口条件循环，这意味其将在执行循环体中的语句之后检查按条件。

每种循环的语句都要求循环体由一条语句组成。然而，这条语句可以是复合语句，也可以是语句块（由花括号括起的多条语句）。

关系表达式对两个值进行比较，常被用做循环测试条件。关系表达式是通过使用 6 种关系运算符之一构成的：<、<=、==、>=、> 或 !=。关系表达式的结果为 bool 类型，值为 true 或 false。

许多程序都逐字节地读取文本输入或文本文件，istream 类提供了多种可完成这种工作的方法，如果 ch 是一个 char 变量，则下面的语句将输入中的下一个字符读入到 ch 中：

cin >> ch;

然而，它将忽略空格、换行符和制表符。下面的成员函数调用读取输入中的下一个字符（而不管该字符是什么）并将其存储到 ch 中：

cin.get(ch);

成员函数调用 `cin.get()` 返回下一个输入字符——包括空格、换行符和制表符，因此，可以这样使用它：

ch = cin.get();

`cin.get(char)` 成员函数调用通过返回转换为 false 的 bool 值来指出已到达 EOF，而 `cin.get()` 成员函数调用则通过返回 EOF 值来指出已达到 EOF，EOF 是在文件 iostream 中定义的。

嵌套循环是循环中的循环，适合用于处理二维数组。
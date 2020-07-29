# 函数 —— C++ 的编程模块

## 两类函数

无返回值：

```cpp
void functionName(parameterList) {
  statement(s);
  return; // optional
}
```

有返回值：

```cpp
typeName functionName(parameterList) {
  statements;
  return value; // value is type cast to type typeName
}
```

## 函数参数和按值传递

用于接收传递值的变量被称为形参，传递给函数的值被称为实参。

在函数中声明的变量（包括参数）是该函数私有的。在函数被调用时，计算机将为这些变量分配内存；在函数结束时，计算机将释放这些变量使用的内存。这样的变量被称为局部变量，因为它们被限制在函数中。


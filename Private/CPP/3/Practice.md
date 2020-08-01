# 复习题

## 3.1.1

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/40.png)

A：因为存储大小不同，开发者可以根据实际需求使用对应的类型。

## 3.1.2

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/41.png)

A：

```cpp
short a = 80;

unsigned int b = 42110;

long c = 3000000000;
```

## 3.1.3

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/42.png)

A: 溢出后重新计算。

## 3.1.4

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/43.png)

A：33L 是字符串类型，33 可以是字符串类型也可以是整型。

## 3.1.5

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/44.png)

A：这两条 C++ 语句是等价的，65 是 "A" 的 ASCII 编码值。

## 3.1.6

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/45.png)

A：

```cpp

#include <iostream>

using namespace std;

int main() {
    int code = 88;
    char c = (char)code;
    cout << c << endl;
    return 0;
}
```

? 第二种方法
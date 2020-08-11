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

## 3.1.7

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/46.png)

A：将 `long` 值赋给 `double` 变量是正常的；将 `long long` 值赋给 `double` 变量会导致溢出异常。

## 3.1.8

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/47.png)

A：

a. 74

b. 4

c. 0

d. 4.5

e. 3

## 3.1.9

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/48.png)

```cpp
int main() {
    double a = 1.8;
    double b = 1.3;
    int c = (int)a + (int)b;
    double d = a + b;
    cout << "c = " << c << endl;
    cout << "d = " << int(d) << endl;
    return 0;
}
```

## 3.1.10

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/49.png)

a. int 类型

b. float 类型

c. char 类型

d. string 类型

e. float 类型

## 3.2.1

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/50.png)

```cpp
const float RATIO = 0.08333333;

float convert(int high) {
    return float(high) * RATIO;
}

int main() {
    int high;
    cout << "Please enter your high" << endl;
    cin >> high;
    cout << "Your high is " << high << "英寸, " << convert(high) << "英尺。" << endl;
    return 0;
}
```

## 3.2.2

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/51.png)

```cpp
/**
 * foot 英尺
 * inch 英寸
 * meter 米

 * lb 磅
 * kilogram 千克
 */
const int F2I_RATIO = 12;
const float I2M_RATIO = 0.0254;
const float K2L_RATIO = 2.2;

int main() {
    int highFoot;
    int highInch;
    int weightLb;
    cout << "Enter highFoot: ";
    cin >> highFoot;
    cout << "Enter highInch：";
    cin >> highInch;
    cout << "Enter weightLb：";
    cin >> weightLb;
    float high = float(highFoot * F2I_RATIO + highInch) * I2M_RATIO;
    cout << "BMI = " << float(weightLb) / K2L_RATIO / (high * high)
         << endl;

    return 0;
}
```

## 3.2.4

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/52.png)

```cpp
int main() {
    long timestamp;
    cout << "Enter the number of seconds: ";
    cin >> timestamp;
    int seconds = timestamp % 60;
    timestamp = timestamp / 60;
    int minutes = timestamp % 60;
    timestamp = timestamp / 60;
    int hours = timestamp % 24;
    timestamp = timestamp / 24;
    int days = timestamp;

    cout << timestamp << " seconds = " << days << " days, " << hours << " hours, " << minutes << " minutes, " << seconds
         << " seconds" << endl;
    return 0;
}
```

## 3.2.5

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/54.png)

```cpp
int main() {
    long long all;
    long long us;
    cout << "Enter the world's population: ";
    cin >> all;
    cout << "Enter the population of the US：";
    cin >> us;
    cout << "The population of the US is " << (double(us) / double(all)) * 100 << "% of the world population." << endl;
    return 0;
}
```

## 3.2.6

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/55.png)


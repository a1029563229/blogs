# 复习题

## 2.1.1

Q：C++ 程序的模块叫什么？

A：C++ 程序的模块叫函数。

## 2.1.2

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/23.png)

A：这个预处理器编译命令是引入一些第三方模块，以便在程序中使用这些第三方模块的功能。

## 2.1.3

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/24.png)

A：使用命名空间，这样的话，该模块的函数都可以直接使用了。

## 2.1.4

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/25.png)

A：`std::cout << "Hello, world" << std::endl;`

## 2.1.5

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/26.png)

A：`int cheeses;`

## 2.1.6

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/27.png)

A：`int cheeses = 32;`

## 2.1.7

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/28.png)

A：`cin < cheeses;`

## 2.1.8

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/29.png)

A:

```cpp
int main() {
  int cheeses = 32;
  cout << "We have " << cheeses << " varieties of cheese," << endl;
  return 0;
}
```

## 2.1.9

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/30.png)

A：

```cpp
// 接收 double 类型的入参，返回 int 类型
int froop(double t);

// 接收 int 类型的入参，没有返回值
void rattle(int n);

// 没有入参，返回 int 类型
int prune(void);
```

## 2.1.10

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/31.png)

A：

在函数定义返回值为 void，即无返回值时，不需要使用关键字 `return`。

## 2.1.11

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/32.png)

A：

1. 可能是未引入模块，需要在程序首部加入语句 `#include <iostream>`。

2. 可能是未定义命名空间，需要在使用前定义命名空间 `using namespace std;`

3. 可能是未定义命名空间，需要在使用加入命名空间 `std::cout;`

## 2.2.1

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/33.png)

A：

```cpp
#include <iostream>

using namespace std;

int main() {
    string name = "jack";
    string address = "NewYork";
    cout << "My name is " << name << ", ";
    cout << "live in " << address << "." << endl;
    return 0;
}
```

## 2.2.2

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/34.png)

```cpp
#include <iostream>
using namespace std;

long L2M(long L) {
    long M = L * 220;
    return M;
}

int main() {
    cout << "1 L = " << L2M(1) << "M;\n";
    cout << "3 L = " << L2M(3) << "M;\n";
    cout << "5 L = " << L2M(5) << "M;\n";
    return 0;
}
```

## 2.2.3

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/35.png)

A：

```cpp
#include <iostream>

using namespace std;

void input1() {
    cout << "Three blind mice\n";
}

void input2() {
    cout << "See how they run\n";
}

int main() {
    input1();
    input1();
    input2();
    input2();
    return 0;
}
```

## 2.2.4

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/36.png)

A：

```cpp
#include <iostream>

using namespace std;

int main() {
    int age;
    cin >> age;
    cout << "You age is " << age << ", it has " << age * 12 << " months." << endl;
    return 0;
}
```

## 2.2.5

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/37.png)

```cpp
#include <iostream>

using namespace std;

int main() {
    double celsius;
    cout << "Please enter a Celsius value: ";
    cin >> celsius;
    cout << celsius << " degrees Celsius is " << celsius * 1.8 + 32 << " degrees Fahrenheit." << endl;
    return 0;
}
```

## 2.2.6

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/38.png)

```cpp
#include <iostream>

using namespace std;

int main() {
    double lightYears;
    cout << "Enter the number of light years: ";
    cin >> lightYears;
    cout << lightYears << " light years = " << lightYears * 63240 << " astronomical units." << endl;
    return 0;
}
```

## 2.2.7

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cpp/39.png)

```cpp
#include <iostream>

using namespace std;

int main() {
    int hours;
    int minutes;
    cout << "Enter the number of hours: ";
    cin >> hours;
    cout << "Enter the number of minutes: ";
    cin >> minutes;
    cout << "Time: " << hours << ":" << minutes << endl;
    return 0;
}
```
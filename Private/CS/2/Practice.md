# 练习题

## 2.1 完成下面的数字转换

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/43.png)

解：

A.
|||||||
| ---- | ---- | ---- | ---- | ---- | ---- |
| 3 | 9 | A | 7 | F | 8 |
| 0011 | 1001 | 1010 | 0111 | 1111 | 1000 |

B.
|||||
| ---- | ---- | ---- | ---- |
| 1100 | 1001 | 0111 | 1011 |
| C | 9 | 7 | B |

C.
||||||
| ---- | ---- | ---- | ---- | ---- |
| D | 5 | E | 4 | C |
| 1101 | 0101 | 1110 | 0100 | 1100 |

D.
|||||||
| ---- | ---- | ---- | ---- | ---- | ---- |
| 0010 | 0110 | 1110 | 0111 | 1011 | 0101 |
| 2 | 6 | E | 7 | B | 5 |

## 2.2

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/44.png)

解：

| n   | 2^n（十进制） | 2^n（十六进制） |
| --- | ------------- | --------------- |
| 9   | 512           | 0x200           |
| 19  | 524288        | 0x80000         |
| 14  | 16384         | 0x4000          |
| 16  | 65536         | 0x10000         |
| 17  | 131072        | 0x20000         |
| 5   | 32            | 0x20            |
| 7   | 128           | 0x80            |

## 2.3

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/46.png)

解：

| 十进制 | 二进制    | 十六进制 |
| ------ | --------- | -------- |
| 0      | 0000 0000 | 0x00     |
| 167    | 1010 0111 | 0xA7     |
| 62     | 0011 1101 | 0x3E     |
| 188    | 1011 1100 | 0xBC     |
| 55     | 0011 0111 | 0x37     |
| 128    | 1000 0000 | 0x80     |
| 243    | 1111 0011 | 0xF3     |
| 82     | 0101 0010 | 0x52     |
| 172    | 1010 1100 | 0xAC     |
| 231    | 1110 1000 | 0xE7     |

## 2.4

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/47.png)

解：

A. 0x503C + 0x8 = 0x5045

B. 0x503C - 0x40 = 0x4EEC

C. 0x503C + 64 = 0x5041

D. 0x50EA - 0x503C = 0xAD

## 2.5

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/50.png)

解：

A. 小端法：21 大端法：87

B. 小端法：21 43 大端法：87 65

C. 小端法：21 43 65 大端法：87 65 43

## 2.6

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/51.png)

解：

A.

| 十六进制   | 二进制                                  |
| ---------- | --------------------------------------- |
| 0x00359141 | 0000 0000 0011 0101 1001 0001 0100 0001 |
| 0x4A564504 | 0100 1010 0101 0110 0100 0101 0000 0100 |

B.

？

C.

？

## 2.7

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/81.png)

解：

输出的结果为 61 62 63 64 65 66

## 2.8

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/82.png)

| 运算 | 结果       |
| ---- | ---------- |
| a    | [01101001] |
| b    | [01010101] |
| ~a   | [10010110] |
| ~b   | [10101010] |
| a&b  | [01000001] |
| a\|b | [01111101] |
| a^b  | [00111100] |

## 2.9

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/83.png)

解：

A：黑色 -> 白色、蓝色 -> 黄色、绿色 -> 红紫色、蓝绿色 -> 红色、红色 -> 蓝绿色、红紫色 -> 绿色、黄色 -> 蓝色、白色 -> 黑色

B：
蓝色 | 绿色 = 蓝绿色
黄色 & 蓝绿色 = 绿色
红色 ^ 红紫色 = 蓝色

## 2.10

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/84.png)

| 步骤   | \*x | \*y |
| ------ | --- | --- |
| 初始   | a   | b   |
| 第一步 | a   | a^b |
| 第二步 | b   | a^b |
| 第三步 | b   | a   |

## 2.11

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/85.png)

解：

A. first 值为 k，last 的值为 k.

B. 因为
*y = v ^ v = 0.
*x = 0 ^ 0 = 0.
\*y = 0 ^ 0 = 0.

C. 将 `first <= last` 语句修改为 `first < last`。

## 2.12

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/86.png)

解：

A.
x & 0x21

B.
x ^ 0xFFFFFF00

C.
x | 0xFF

## 2.13

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/86.png)

解：
？

## 2.14

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/88.png)

解：

x 0110 0110
y 0011 1001
x & y 0010 0000
x | y 0111 1111
~x | ~y 1101 1111

| 表达式   | 值   | 表达式   | 值   |
| -------- | ---- | -------- | ---- |
| x & y    | 0x20 | x && y   | 0x01 |
| x \|y    | 0x7F | x \|\| y | 0x01 |
| ~x \| ~y | 0xDF | !x\|\|!y | 0x00 |
| x & !y   | 0x00 | x && ~y  | 0x01 |

## 2.15

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/89.png)

解：!(x ^ y)

## 2.16

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/94.png)

| x        |           | x<<3      |          | x>>2(逻辑右移) |          | x>>>2(算术右移) |          |
| -------- | --------- | --------- | -------- | -------------- | -------- | --------------- | -------- |
| 十六进制 | 二进制    | 二进制    | 十六进制 | 二进制         | 十六进制 | 二进制          | 十六进制 |
| 0xC3     | 1100 0011 | 0001 1000 | 0x18     | 0011 0000      | 0x30     | 1111 0000       | 0xF0     |
| 0x75     | 0111 0101 | 1010 1000 | 0xA8     | 0001 1101      | 0X1D     | 1101 1101       | 0xDD     |
| 0x87     | 1000 0111 | 0011 1000 | 0x38     | 0010 0001      | 0x21     | 1110 0001       | 0xE1     |
| 0x66     | 0110 0110 | 0011 0000 | 0x30     | 0001 1001      | 0x19     | 1101 1001       | 0xD9     |

## 2.17

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/102.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/103.png)

| 十六进制 | 二进制 | B2U_4(x) | B2T_4(x) |
| -------- | ------ | -------- | -------- |
| 0xE      | 1110   | 14       | -2       |
| 0x0      | 0000   | 0        | 0        |
| 0x5      | 0101   | 5        | 5        |
| 0x8      | 1000   | 8        | -8       |
| 0xD      | 1101   | 13       | -3       |
| 0xF      | 1111   | 15       | -1       |

## 2.18

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/106.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/107.png)

解：

- A. 0x2e0 = 16^2 _ 2 + 16^1 _ 14 + 16^0 \* 0 = 0010 1110 0000 = 2^11 + 2^7 + 2^6 + 2^5 = 736.
- B. 0x58 = 16 \* 5 + 8 = 88.
- C. 0x28 = 16 \* 2 + 8 = 40.
- D. 0x30 = 16 \* 3 + 0 = 48.
- E. 0x78 = 16 \* 7 + 8 = 120.
- F. 0x88 = 16 \* 8 + 8 = 136.
- G. 0x1f8 = 16^2 + 16 \* 15 + 8 = 256 + 240 + 8 = 504.
- H. 0xc0 = 16\*12 + 0 = 192.
- I. 0x48 = 16\*4 + 8 = 72.

## 2.19

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/108.png)

解：

| x   | T2U_4(x) |
| --- | -------- |
| -8  | 8        |
| -3  | 13       |
| -2  | 14       |
| -1  | 15       |
| 0   | 0        |
| 5   | 5        |

## 2.20

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/109.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/110.png)

解：

- 当 x < 0 时

  - T = -2^w-1 + 2^w-2\*x +...+ 2^0 \*x.
  - U = 2^w-1 + 2^w-2\*x +...+ 2^0 \*x.
  - U = T + 2^w-1 + 2^w-1 = T(x) + 2^w.

- 当 x > 0 时
  - T = 0 + 2^w-2\*x +...+ 2^0 \*x.
  - U = 0 + 2^w-2\*x +...+ 2^0 \*x.
  - U = T(x).

## 2.21

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/111.png)

解：

| 类型   | 求值 |
| ------ | ---- |
| 无符号 | 1    |
| 有符号 | 1    |
| 无符号 | 0    |
| 有符号 | 1    |
| 无符号 | 0    |

## 2.22

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/134.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/135.png)

解：

A.
[1011] = -2^3 + 2^1 + 2^0 = -8 + 2 + 1 = -5

B.
[11011] = -2^4 + 2^3 + 2^1 + 2^0 = -2^3 + 2^1 + 2^0 = -5

C.
[111011] = -2^5 + 2^4 + 2^3 + 2^1 + 2^0 = -2^3 + 2^1 + 2^0 = -5

## 2.23

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/136.png)

解：

A.

| w          | func1(w) | func2(w) |
| ---------- | -------- | -------- |
| 0x00000076 |          |          |

？

B. ？

## 2.24

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/149.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/150.png)

解：

| 十六进制 |        | 无符号 |        | 补码   |
| -------- | ------ | ------ | ------ | ------ |
| 原始值   | 截断值 | 原始值 | 截断值 | 原始值 | 截断值 |
| 0        | 0      | 0      | 0      | 0      | 0 |
| 2        | 2      | 2      | 2      | 2      | 2 |
| 9        | 1      | 9      | 1      | -7     | 1 |
| B        | 3      | 11     | 3      | -5     | 3 |
| F        | 7      | 15     | 7      | -1     | 7 |

## 2.25

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/151.png)

解：

因为将 `length` 设置为 0 时，`length - 1` 将会发生溢出，最终计算出来的值是 `无符号数最大值 - 1`，然后导致数组取值内存引用错误。

将代码修改为：

```cpp
float sum_elements(float a[], unsigned length) {
    int i;
    float result = 0;
    if (length == 0) return result;

    for (i = 0; i < length - 1; i++)
        result += a[i];
    return result;
}
```

## 2.26

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/152.png)

解：

A. 当字符串 s 的长度小于字符串 t 的长度时会产生不正确的结果。

B. 因为 `size_t` 的类型为 `unsigned`，在 `s < t` 时，计算将发生溢出，得到的结果始终 > 0，该结果不符合预期。

C. 代码调整如下：

```cpp
int strlonger(char *s, char *t) {
  return strlen(s) > strlen(t);
}
```

## 2.27

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/153.png)

解：

```cpp
int uadd_ok(unsigned x, unsigned y) {
    unsigned z = x + y;
    if (z > x && z > y) {
        return 1;
    }
    return 0;
}
```

## 2.28

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/154.png)

解：

| x        |        | 加法逆元 x |          |
| -------- | ------ | ---------- | -------- |
| 十六进制 | 十进制 | 十进制     | 十六进制 |
| 0        | 0      | 0          | 0        |
| 5        | 5      | 11         | B        |
| 8        | 8      | 8          | 8        |
| D        | 13     | 3          | 3        |
| F        | 15     | 1          | 1        |

## 2.29

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/155.png)

| x             | y             | x+y            | x+5ty         | 情况   |
| ------------- | ------------- | -------------- | ------------- | ------ |
| [10100] > -12 | [10001] > -15 | [100101] > -27 | [00101] > 5   | 负溢出 |
| [11000] > -8  | [11000] > -8  | [110000] > -16 | [10000] > -16 | 正常   |
| [10111] > -9  | [01000] > 8   | [11111] > -1   | [11111] > -1  | 正常   |
| [00010] > 2   | [00101] > 5   | [00111] > 7    | [00111] > 7   | 正常   |
| [01100] > 12  | [00100] > 4   | [010000] > 16  | [10000] > -16 | 正溢出 |
| [11111] > -1  | [01111] > 15  | [101110] > -18 | [01110] > 14  | 正常   |

## 2.30

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/156.png)

解：

```cpp
int tadd_ok(int x, int y) {
    int sum = x + y;
    if (x > 0 && y > 0 && sum <= 0) {
        return 0;
    }

    if (x < 0 && y < 0 && sum >= 0) {
        return 0;
    }

    return 1;
}
```

## 2.31

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/157.png)

解：

在补码运算中，该函数将始终返回 1。

## 2.32

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/158.png)

？

## 2.33

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/159.png)

| x        |        | -t4x   |          |
| -------- | ------ | ------ | -------- |
| 十六进制 | 十进制 | 十进制 | 十六进制 |
| 0        | 0      | 0      | 0        |
| 5        | 5      | -5     | -5       |
| 8        | 8      | -8     | -8       |
| D        | 13     | -13    | -D       |
| F        | 15     | -15    | -F       |

## 2.34

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/160.png)

| 模式   | x          | y          | x\*y          | 截断的 x\*y |
| ------ | ---------- | ---------- | ------------- | ----------- |
| 无符号 | 4 > [100]  | 5 > [101]  | 20 > [10100]  | 4 > [100]   |
| 补码   | -4 > [100] | -3 > [101] | 12 > [1100]   | -4 > [100]  |
| 无符号 | 2 > [010]  | 7 > [111]  | 14 > [1110]   | 6 > [110]   |
| 补码   | 2 > [010]  | -1 > [111] | -2 > [110]    | -2 > [110]  |
| 无符号 | 6 > [110]  | 6 > [110]  | 36 > [100100] | 4 > [100]   |
| 补码   | -2 > [110] | -2 > [110] | 4 > [0100]    | -4 > [100]  |

## 2.35

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/161.png)

?

## 2.36

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/162.png)

?

## 2.37

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/163.png)

解：

A. 消除了负溢出。

B. 对溢出做检查，如下。

```cpp
uint64_t asize = ele_cnt * (unit64_t) ele_size;
if (asize < ele_cnt || asize < ele_size) return NULL;
```

## 2.38

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/164.png)

解：

当 b 等于 0 时，可以计算 a 的 1、2、4、8 倍数。

当 a、k 为任意可能的值时，可以计算 a 的 2^k + b 倍数。

## 2.39

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/165.png)

解：

x << n

## 2.40

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/166.png)

解：

| K   | 移位 | 加法/减法 | 表达式              |
| --- | ---- | --------- | ------------------- |
| 6   | 2    | 1         | x << 2 + x << 1     |
| 31  | 1    | 1         | x << 5 - x          |
| -6  | 2    | 1         | x << -2 + x << -1   |
| 55  | 2    | 2         | x << 6 - x << 3 - x |

## 2.41

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/167.png)

解：

选择使用移位、加法和减法的组合，还是使用一条乘法指令，取决于这些指令的相对速度，而这些是与机器高度相关的。大多数编译器只在需要少量移位、加法和减法就足够的时候才使用这种优化。

## 2.42

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/168.png)

```cpp
int div16(int x) {
    return x >> 4;
}
```

## 2.43

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/169.png)

解：

M = 2^5 - 1 = 31;

N = 8;

## 2.44

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/170.png)

？

## 2.45

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/171.png)

| 小数值 | 二进制表示 | 十进制表示 |
| ------ | ---------- | ---------- |
| 1/8    | 0.001      | 0.125      |
| 3/4    | 0.11       | 0.75       |
| 25/16  | 1.1001     | 1.5625     |
| 171/16 | 10.1011    | 10.6875    |
| 9/8    | 1.001      | 1.125      |
| 47/8   | 5.111      | 5.875      |
| 19/16  | 1.0011     | 1.1875     |

## 2.46

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/172.png)

解：

A. 0.1 - x 的二进制表示是：0.[0]\_24 11 [0011]~2

B. ?

C. ?

D. ?

## 2.47

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/173.png)

解：

Baisc

| 位      | e   | E   | 2^E | f   | M   | 2^E \* M | V    | 十进制 |
| ------- | --- | --- | --- | --- | --- | -------- | ---- | ------ |
| 0 00 00 | 0   | 0   | 1   | 0   | 0   | 1 \* 0   | 0    | 0      |
| 0 00 01 | 0   | 0   | 1   | 1/4 | 1/4 | 1 \* 1/4 | 1/4  | 0.25   |
| 0 00 10 | 0   | 0   | 1   | 2/4 | 2/4 | 1 \* 2/4 | 1/2  | 0.5    |
| 0 00 11 | 0   | 0   | 1   | 3/4 | 3/4 | 1\* 3/4  | 3/4  | 0.75   |
| 0 01 01 | 1   | 0   | 1   | 1/4 | 5/4 | 1 \* 5/4 | 5/4  | 1.25   |
| 0 01 10 | 1   | 0   | 1   | 2/4 | 6/4 | 1\*6/4   | 3/2  | 1.5    |
| 0 01 11 | 1   | 0   | 1   | 3/4 | 7/4 | 1\*7/4   | 7/4  | 1.75   |
| 0 10 00 | 2   | 1   | 2   | 0   | 4/4 | 2 \* 4/4 | 8/4  | 2      |
| 0 10 01 | 2   | 1   | 2   | 1/4 | 5/4 | 2 \* 5/4 | 9/4  | 2.25   |
| 0 10 10 | 2   | 1   | 2   | 2/4 | 6/4 | 2 \* 6/4 | 10/4 | 2.5    |
| 0 10 11 | 2   | 1   | 2   | 3/4 | 7/4 | 2 \* 7/4 | 11/4 | 2.75   |
| 0 11 00 | -   | -   | -   | -   | -   | -        | -    | -      |
| 0 11 01 | -   | -   | -   | -   | -   | -        | -    | -      |
| 0 11 10 | -   | -   | -   | -   | -   | -        | -    | -      |
| 0 11 11 | -   | -   | -   | -   | -   | -        | -    | -      |

## 2.48

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/174.png)

解：

首先将 0x00359141 转换为二进制，如下：

0000 0000 0011 0101 1001 0001 0100 0001 = 11 0101 1001 0001 0100 0001;

通过将二进制小数点左移 21 位，得到这个数的规格化显示，如下：

1.1 0101 1001 0001 0100 0001 \* 2^21

为了使用 IEEE 单精度形式来编码，我们丢弃开头的 1，并在末尾添加 2 个 0，用来构造小数字段，得到二进制：

10101100100010100000100

为了构造阶码字段，我们用指数 21 加上偏置量 127，得到 148，用二进制表示为 10010100，加上符号位 0，我们就得到二进制的浮点表示，如下：

0 10010100 10101100100010100000100

最后将其转换为 16 进制，如下：

0 10010100 10101100100010100000100

0100 1010 0101 0110 0100 0101 0000 0100

0x4A564504

可以看出浮点数的小数位二进制与整数的二进制有一大段是相同的。

## 2.49

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/175.png)

解：

A. ?

B. 8 位。

## 2.50

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/176.png)

解：

A. 10.010 -> 2 + 1/4 -> 舍入后 = 10.000 = 2;

B. 10.011 -> 2 + 3/8 -> 舍入后 = 10.100 = 2 + 1/2;

C. 10.110 -> 2 + 3/4 -> 舍入后 = 11.000 = 3;

D. 11.001 -> 3 + 1/8 -> 舍入后 = 11.000 = 0;

## 2.51

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/177.png)

解：

A. x 的二进制表示是 0.000 1100 1100 1100 1100 1101;

B. x - 0.1 的十进制表示的近似值是 0.000 0000 0000 0000 0000 0001 = 2^-7 \* 1/2^23 = 0.000000001;

C. 运行 100 小时候，计算时钟值偏差有 100 _ 60 _ 60 \* 0.000000001 = 0.00036 秒。

D. ？

## 2.52

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/178.png)

| 格式 A   |                            | 格式 B   |          |
| -------- | -------------------------- | -------- | -------- |
| 位       | 值                         | 位       | 值       |
| 011 0000 | 1                          | 0111 000 | 1        |
| 101 1110 | 2^2 \* (1+7/8) = 7.5       | 1011 111 | 7.5      |
| 010 1001 | 2^-1 \* (1+9/16) = 0.78125 | 1000 101 | 0.8125   |
| 110 1111 | ?                          | ?        | ?        |
| 000 0001 | 0.015625                   | 0010 100 | 0.015625 |

## 2.53

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/179.png)

?

## 2.54

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/cs/180.png)

解：

A.

该表达式始终为真。

x 先从 `int` 被转换为 `double` 类型，从 `int` 转换成 `double` 时，因为 `double` 有更大的范围（也就是可表示值的范围），也有更高的精度（也就是有效位数），所以能够保留精确的数值。

然后，x 又从 `double` 被转换为 `int` 类型，值将会向零舍入，该值转换将被完整保留。


B.

该表达式并不始终为真。

x 先从 `int` 转换成 `float`，数字不会溢出，但是可能被舍入，在这一步的时候 x 的值可能发生改变。


C.

该表达式并不始终为真。

d 先从 `double` 转换成 `float`，因为范围要小一些，所以值可能溢出为正无穷或负无穷。另外，由于精确度较小，它还可能被舍入，值在转换的过程中可能会发生改变。


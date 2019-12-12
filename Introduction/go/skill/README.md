# Go 实用小技巧

本文持续产出、收录一些笔者觉得好用的 Go 语法小技巧，还有一些初学 Go 遇到的“坑”，帮助节约日常开发时间，更多的时间可以做自己喜欢做的事情。

### 记录函数耗时

由于 Go 函数支持 `defer` 和闭包两大强大的特性，所以我们可以使用一行语句即可实现统计函数耗时的功能

```go
// 函数主体
func TimeConsuming(tag string) func() {
	now := time.Now().UnixNano() / 1000000
	return func() {
		after := time.Now().UnixNano() / 1000000
		fmt.Printf("%q time cost %d ms\n", tag, after-now)
	}
}

// 你需要统计耗时的函数
func main() {
  // 函数首部调用即可，不影响函数整体美观
  defer TimeConsuming("main")()
  // ...
}
```

### Switch 的基本使用
```go
// 在 Go 中输出 one，如果是 Java 则输出 one two three
// 在 Go 中匹配到匹配项后会自动跳出 switch，不需要在每一条 case 下写 break
func main() {
	i := 1
	fmt.Println("Write ", i, " as ")
	switch i {
	case 1:
		fmt.Println("one")
	case 2:
		fmt.Println("two")
	case 3:
		fmt.Println("three")
	}
}
```

### 定义二维 Slice

```go
twoD := make([][]int, 3)
for i := 0; i < 3; i++ {
	innerLen := i + 1
	twoD[i] = make([]int, innerLen)
	for j := 0; j < innerLen; j++ {
		twoD[i][j] = i + j
	}
}
```

### 获取时间戳

```go
now := time.Now()
// 时间戳：秒
secs := now.Unix()
// 时间戳：纳秒
nanos := now.UnixNano()
// 时间戳：毫秒
millis := nanos / 1000000
```

### 控制并发数量（防止某些情况下宕机）

```go
// 20 就是允许同时运行的最大 goroutine 数量
var sema = make(chan struct{}, 20)

func dirents(dir string) []os.FileInfo {
	// 控制语句写在函数的开头位置即可
	sema <- struct{}{}
	defer func() { <-sema }()
	
	entries, err := ioutil.ReadDir(dir)
	if err != nil {
		fmt.Fprintf(os.Stderr, "du1: %v\n", err)
		return nil
	}
	return entries
}
```

### 定义包级别的枚举字段

```go
type Operation int

const (
  Add Operation = iota + 1
  Subtract
  Multiply
)
```

大家平时有遇到什么比较多的问题或者比较实用的技巧可以贴出来，本文持续解答和收录。

QQ 学习交流群：646026429

[原文地址，建议收录](https://github.com/a1029563229/Blogs/tree/master/Introduction/go/skill)
# Go 自定义日期时间格式解析解决方案 - 解决 `parsing time xx as xx: cannot parse xx as xx` 错误

最近在解析 `Go` 的日期数据格式时（`mysql` 的 `datetime` 类型）时遇到个问题，在网上搜了很多方案都试了以后发现不可行，于是自己尝试解决后将解决方案发布出来。

`Go` 自身的 `time.Time` 类型默认解析的日期格式是 `RFC3339` 标准，也就是 `2006-01-02T15:04:05Z07:00` 的格式。如果我们想要在 `Gin` 的 `shouldBindJSON` 方法中，传入 `YYYY-MM-DD hh:mm:ss` 格式的日期格式作为 `time.Time` 类型的值，就会引发类似于 `parsing time xx as xx: cannot parse xx as xx` 的报错信息。这是因为 `time.Time` 类型默认支持的日期格式与我们传入的格式不同，导致解析出错。。

遇到这个问题后，我在网上找了很多方案，发现都失败了。有的可以完成正常解析，但是无法正确写入到数据库。有的可以正常写入和写出，但是会使得 `gin` 自带的验证规则如 `binding:"required"` 规则失效，失去校验的功能。

## 自定义 `LocalTime` 类型

解决这个问题的关键就是解决 `c.ShouldBindJSON` 和 `gorm.Updates` 的问题，我们需要定义一个新的 `Time` 类型和自定义的日期格式解析（如下），并将我们的 `struct` 结构体 `datetime` 字段指定为我们自定义的类型（如下）

- 自定义 `LocalTime` 类型

```go
// model.LocalTime
package model

const TimeFormat = "2006-01-02 15:04:05"

type LocalTime time.Time
```

- 业务代码结构

```go
// You Application Struct
package order

type OrderTest struct {
	OrderId     int              `json:"order_id"`
	Test        string           `json:"test"`
	PaymentTime *model.LocalTime `json:"payment_time" binding:"required"`
	TestTime    *model.LocalTime `json:"test_time"`
}
```

### 解析 JSON 格式数据 - `UnmarshalJSON` 与 `MarshalJSON`

在 `c.ShouldBindJSON` 时，会调用 `field.UnmarshalJSON` 方法，所以我们需要先设置这个方法（如下）：

```go
func (t *LocalTime) UnmarshalJSON(data []byte) (err error) {
  // 空值不进行解析
	if len(data) == 2 {
		*t = LocalTime(time.Time{})
		return
	}

  // 指定解析的格式
	now, err := time.Parse(`"`+TimeFormat+`"`, string(data))
	*t = LocalTime(now)
	return
}
```

在 `UnmarshalJSON` 解析后，`shouldBindJSON` 就可以正常解析 `YYYY-MM-DD hh:mm:ss` 格式的日期格式了，这样一来就解决了 `parsing time xx as xx: cannot parse xx as xx` 的问题。

既然解决了 `shouldBindJSON` 的问题，我们还需要解决 `c.JSON` 时解析值的问题（实现如下）

```go
func (t LocalTime) MarshalJSON() ([]byte, error) {
	b := make([]byte, 0, len(TimeFormat)+2)
	b = append(b, '"')
	b = time.Time(t).AppendFormat(b, TimeFormat)
	b = append(b, '"')
	return b, nil
}
```

### 数据库写入和写出问题 - `Value` 与 `Scan`

在实现了 `JSON` 格式数据的解析取值后，会发现我们的值依然无法通过 `gorm` 被存储到 `mysql` 数据库中，通过抓包我们可以看看正常的请求和错误的请求的区别（见下图）

![图](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/2.png)

![图](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/1.png)

从 `上图 1 （正常情况）` 可以看出，`payment_time` 字段被传递，这样就可以正常存入更新。

从 `上图 2（我们现在的情况）` 可以看出，我们的 `payment_time` 字段根本没有被传递，从而导致更新失败。

所以这个问题属于 `gorm` 对字段取值的问题，`gorm` 内部是通过 `Value` 和 `Scan` 这两个方法完成值的写入和检出。那么从这个角度出发，我们就需要给我们的类型实现 `Value` 和 `Scan` 方法，分别对应写入的时候获取值和检出的时候解析值。（实现如下）

```go
// 写入 mysql 时调用
func (t LocalTime) Value() (driver.Value, error) {
	// 0001-01-01 00:00:00 属于空值，遇到空值解析成 null 即可
	if t.String() == "0001-01-01 00:00:00" {
		return nil, nil
	}
	return []byte(time.Time(t).Format(TimeFormat)), nil
}

// 检出 mysql 时调用
func (t *LocalTime) Scan(v interface{}) error {
	// mysql 内部日期的格式可能是 2006-01-02 15:04:05 +0800 CST 格式，所以检出的时候还需要进行一次格式化
	tTime, _ := time.Parse("2006-01-02 15:04:05 +0800 CST", v.(time.Time).String())
	*t = LocalTime(tTime)
	return nil
}

// 用于 fmt.Println 和后续验证场景
func (t LocalTime) String() string {
	return time.Time(t).Format(TimeFormat)
}
```

如此一来，我们就可以正常解析存取 `YYYY-MM-DD hh:mm:ss` 格式的时间数据了（见下图）

![图](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/3.png)

`LocalTime` 完整代码如下：

```go
package model

import (
	"database/sql/driver"
	"time"
)

const TimeFormat = "2006-01-02 15:04:05"

type LocalTime time.Time

func (t *LocalTime) UnmarshalJSON(data []byte) (err error) {
	if len(data) == 2 {
		*t = LocalTime(time.Time{})
		return
	}

	now, err := time.Parse(`"`+TimeFormat+`"`, string(data))
	*t = LocalTime(now)
	return
}

func (t LocalTime) MarshalJSON() ([]byte, error) {
	b := make([]byte, 0, len(TimeFormat)+2)
	b = append(b, '"')
	b = time.Time(t).AppendFormat(b, TimeFormat)
	b = append(b, '"')
	return b, nil
}

func (t LocalTime) Value() (driver.Value, error) {
	if t.String() == "0001-01-01 00:00:00" {
		return nil, nil
	}
	return []byte(time.Time(t).Format(TimeFormat)), nil
}

func (t *LocalTime) Scan(v interface{}) error {
	tTime, _ := time.Parse("2006-01-02 15:04:05 +0800 CST", v.(time.Time).String())
	*t = LocalTime(tTime)
	return nil
}

func (t LocalTime) String() string {
	return time.Time(t).Format(TimeFormat)
}
```

## 解决验证器 `binding:"required"` 无法正常工作

在完成上述步骤后，你的 `go` 应用已经可以正常存取自定义的日期格式格式了。但是还有一个问题，那就是 `binding:"required"` 并不能正常工作了，如果你传入一个空字符串 `""` 日期数据，也会通过校验，并在数据库写入 `null`！

这个问题是因为 `gin` 内置的 `validator` 对我们的 `model.LocalTime` 还没有一个完善的空值检测机制，我们只需要加上这个检测机制即可。（实现如下）

```go
package app

func ValidateJSONDateType(field reflect.Value) interface{} {
	if field.Type() == reflect.TypeOf(model.LocalTime{}) {
    timeStr := field.Interface().(model.LocalTime).String()
		// 0001-01-01 00:00:00 是 go 中 time.Time 类型的空值
		// 这里返回 Nil 则会被 validator 判定为空值，而无法通过 `binding:"required"` 规则
		if timeStr == "0001-01-01 00:00:00" {
			return nil
		}
		return timeStr
  }
	return nil
}

func Run() {
	router := gin.Default()

	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
    // 注册 model.LocalTime 类型的自定义校验规则
		v.RegisterCustomTypeFunc(ValidateJSONDateType, model.LocalTime{})
  }
}
```

加上这条自定义规则后，我们的校验规则又可以生效了，问题完美解决！（见下图）

![图](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/4.png)

这个问题困惑了我好几天，一开始想快点解决，在网上找了很多方案拿过来 `copy` 后，都没有解决问题。最后决定静下来心来，思考其背后的原理，仔细分析，最终靠自己攻克了这个问题，真是不容易。

这件事也让我明白了一个道理，授人予鱼不如授人予渔，所以我在这里也把解决问题的思路分享出来，希望对大家也能有一点理解上的提升。

## 最后一件事

如果本文对您有帮助的话，请点个赞和收藏吧！

您的点赞是对作者的最大鼓励，也可以让更多人看到本篇文章！

[原文地址](https://github.com/a1029563229/Blogs/tree/master/BugFix/go/time)

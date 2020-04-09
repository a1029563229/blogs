# Go

## 笔记

1. Go 的内存分配与字段定义顺序有关联（见下图）

![Go](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/shared/1.png)

2. 通过实例的值拷贝（参数非指针），无法修改实例的值
3. 接口不需要显式声明，运行时定义
4. 依赖注入

![Go](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/shared/2.png)

![Go](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/shared/3.png)

![Go](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/shared/4.png)

5. 设计模式

![Go](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/shared/5.png)

6. Go 的 Pool 类型

## QA

1. 请问一下 Go 结构体的 struct 类型成员，什么时候用指针类型，什么时候可以直接用 struct 类型？这个怎么权衡？如 time.Time 和 *time.Time 类型，两者的区别是什么？
   1. 指针和值都有拷贝，只是拷贝指针和拷贝值的区别。
   2. 占用内存较大的结构体使用指针，其他场景的话用值性能会更好，值的拷贝会更快。
   3. 一般情况下用值会更好，值的好处在于不可变特性，可以确定属性不可被修改，避免副作用引发的问题。
   4. 需要改属性的话，就用指针。
2. 请问 Go 的 goroutine 和系统线程的关系是什么？goroutine 的最大数量阈值应该怎么判断，有时候数量限制不对程序就挂了？goroutine 的实现原理可以简单介绍一下吗？
   1. Go 的 goroutine 载体是线程，执行在线程之上。
   2. Go 底层内部有 schedule 调度器，调度 goroutine 挂载到线程上，自动切换。
   3. goroutine 的数量限制由内存有关，第二和线程有关系。
3. 请问一下 Go 语言的优势和应用场景是什么？
   1. 异步场景、并发场景是最大的优势，容易掌握，可维护性强。
   2. 强类型、高性能。
   3. 开源项目多，社区生态好。
   4. 容器天生优势。
   5. 交叉编译后无依赖。
   6. 静态语言，有动态语言的编程效率。
   7. 编译型语言。
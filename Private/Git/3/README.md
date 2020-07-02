# Git 分支

## 分支简介

Git 保存的不是文件的变化或者差异，而是一系列不同时刻的快照。

在进行提交操作时，Git 会保存一个提交对象（commit object）。该提交对象会包含一个指向暂存内容快照的指针。但不仅仅是这样，该提交对象还包含了作者的姓名和邮箱、提交时输入的信息以及指向它的父对象的指针。首次提交产生的提交对象没父对象，普通提交操作产生的提交对象有一个父对象，而由多个分支合并产生的提交对象有多个父对象。

为了更加形象地说明，我们假设现在有一个工作目录，里面包含了三个将要暂存和提交的文件。暂存操作会为每一个文件计算校验和（SHA-1 哈希算法），然后会把当前版本的文件快照保存到 Git 仓库中（Git 用 `blob` 对象来保存它们），最终将校验和加入到暂存区域等待提交：

```bash
$ git add README test.rb LICENSE
$ git commit -m 'The initial commit of my project'
```

当使用 `git commit` 进行提交操作时，Git 会先计算每一个子目录（本例中只有项目根目录）的校验和，然后在 Git 仓库中这些校验和保存为树对象。随后，Git 便会创建一个提交对象，它除了包含上面提到的那些信息外，还包含指向这个树对象（项目根目录）的指针。如此一来，Git 就可以在需要的时候重现此次保存的快照。

现在，Git 仓库中有五个对象：三个 `blob` 对象（保存着文件快照）、一个树对象（记录着目录结构和 blob 对象索引）以及一个 `提交` 对象（包含着指向前述树对象的指针和所有提交信息）（如下图）

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/4.png)

做些修改后再次提交，那么这次产生的提交对象会包含一个指向上次提交对象（父对象）的指针（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/5.png)

Git 的分支，其实本质上仅仅是指向提交对象的可变指针。Git 的默认分支名字是 `master`。在多次提交操作之后，你其实已经有一个指向最后那个提交对象的 `master` 分支。`master` 分支会在每次提交时自动向前移动（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/6.png)

### 分支创建

-- 创建新分支命令 > `git branch [branchName]`

```bash
$ git branch testing
```

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/7.png)


Git 通过一个名为 `HEAD`  的特殊指针指向当前所在的本地分支（可以将 `HEAD`  想象为当前分支的别名）（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/8.png)

-- 查看各个分支当前所指的对象 > `git log --oneline --decorate`

```bash
$ git log --oneline --decorate
f30ab (HEAD -> master, testing) add feature #32 - ability to add new formats to the central interface
34ac2 Fixed bug #1328 - stack overflow under certain conditions
98ca9 The initial commit of my project
```

-- 切换分支 > `git checkout [branchName]`

```bash
$ git checkout testing
```

### HEAD 指向当前所在分支的好处

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/9.png)

> 注意：分支切换会改变你工作目录中的文件。在切换分支时，一定要注意你共走目录里的文件会被改变。如果是切换到一个较旧的分支，你的工作目录会恢复到该分支最后一次提交时的样子。如果 Git 不能干净利落地完成这个任务，它将禁止切换分支。

你你可以在不同分支间不断地来回切换和工作，并在时机成熟时将它们合并起来。而所有这些工作，你需要的命令只有 `branch`、`checkout` 和 `commit`（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/10.png)

-- 查看分支分叉历史 > `git log --oneline --decorate --graph --all`

```bash
$ git log --oneline --decorate --graph --all
* c2b9e (HEAD, master) made other changes
| * 87ab2 (testing) made a change
|/
* f30ab add feature #32 - ability to add new formats to the
* 34ac2 fixed bug #1328 - stack overflow under certain conditions
* 98ca9 initial commit of my project
```

由于 Git 的分支实质上仅是包含所指对象校验和（长度为 40 的 SHA-1 值字符串）的文件，所以它的创建和销毁都异常高效。

> 这与过去大多数版本控制系统形成了鲜明的对比，它们在创建分支时，将所有的项目文件都复制一遍，并保存到一个特定的目录。完成这样繁琐的过程通常需要很久，这取决于项目的规模。
>
> 而在 Git 中，任何规模的项目都能在瞬间创建新分支。同时，由于每次提交都会记录父对象，所以寻找恰当的合并基础（即共同祖先）也是同样的简单和高效。这些高效的特性使得 Git 股利开发人员频繁地创建和使用分支。


-- 创建新分支的同时切换过去 > `git checkout -b <newbranchname>`



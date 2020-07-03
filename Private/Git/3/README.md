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


## Git 分支 - 分支的新建与合并

当你试图合并两个分支时，如果顺着一个分支走下去能够到达另一个分支，那么 Git 在合并两者时，只会简单的将指针向前推进（指针右移），因为这种情况下的合并操作没有需要解决的分期 —— 这就叫做 “快进（fast-forward）”（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/11.png)

-- 删除分支 > `git branch -d [branchname]`

-- 强制删除分支 > `git branch -D [branchname]`

```bash
$ git branch -d hotfix
Deleted branch hotfix (3a0874c).
```

-- 切换分支 > `git checkout [branchname]`

-- 合并分支 > `git merge [branchname]`

```bash
$ git checkout master
Switched to branch 'master'
$ git merge iss53
Merge made by the 'recursive' strategy.
index.html |    1 +
1 file changed, 1 insertion(+)
```

当合并分支时遇到不同的祖先，Git 会先寻找共同祖先，然后做一个简单的三方合并，并将此次三方合并的结果做了一个新的快照并且创建一个新的提交指向它（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/12.png)

如果 Git 在做合并时发生冲突，将会暂停下来，等待你去解决合并产生的冲突，并提交。

## Git 分支 - 分支管理

-- 查看分支 > `git branch`

```bash
$ git branch
  iss53
* master
  testing
```

> 注意：`master` 分支前的 `*` 字符：它代表现在检出的那一个分支（也就是说，当前 `HEAD` 指针所指向的分支）。


-- 查看每一个分支的最后一次提交 > `git branch -v`

```bash
$ git branch -v
  iss53   93b412c fix javascript issue
* master  7a98805 Merge branch 'iss53'
  testing 782fd34 add scott to the author list in the readmes
```

-- 查看已被合并到当前分支的分支 > `git branch --merged`

```bash
$ git branch --merged
  iss53
* master
```

-- 查看未合并工作的分支 > `git branch --no-merged`

```bash
$ git branch --no-merged
  testing
```

## Git 分支 - 分支开发工作流

在整个项目开发周期的不同阶段，你可以同时拥有多个开发的分支；你可以定期地把某些主题合并入其他分支中。

许多使用 Git 的开发者都喜欢使用这种方式来工作，比如只在 `master` 分支上保留完全稳定的代码——有可能仅仅是已经发布或即将发布的代码。 他们还有一些名为 `develop` 或者 `next` 的平行分支，被用来做后续开发或者测试稳定性——这些分支不必保持绝对稳定，但是一旦达到稳定状态，它们就可以被合并入 `master` 分支了。 

稳定分支的指针总是在提交历史中落后一大截，而前沿分支的指针往往比较靠前（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/13.png)

通常把他们想象成流水线（work silos）可能更好理解一点，那些经过测试考验的提交会被甄选到更加稳定的流水线上去（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/14.png)


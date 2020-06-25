# Git 基础

## 取得项目的 Git 仓库

有两种取得 Git 项目仓库的方法。

### 从当前目录初始化

要对现有的某个项目开始使用 Git 管理，只需到此项目所在的目录，执行：

```bash
$ git init
```

如果当前目录下有几个文件想要纳入版本控制，需要先用 `git add` 命令告诉 Git 开始对这些文件进行跟踪，然后提交：

```bash
$ git add *.c
$ git add README
$ git commit -m 'initial project version'
```

### 从现有仓库克隆

使用 `git clone [url]` 命令克隆仓库（如下）。

```bash
$ git clone git://github.com/schacon/grit.git
```

> Git 在 clone 时收取的是项目历史的所有数据（每一个文件的每一个版本），服务器上有的数据克隆之后本地也都有了。

克隆时指定新建的项目目录名称（如下）

```bash
$ git clone git://github.com/schacon/grit.git mygrit
```

> Git 支持许多数据传输协议。之前的例子使用的是 git:// 协议，不过你也可以使用 http(s):// 或者 user@server://path.git 表示的 SSH 传输协议。


## 记录每次更新到仓库

工作目录下面的所有文件只有两种状态：已跟踪或未跟踪。

### 检查当前文件状态

我们编辑 README，保存退出后运行 `git status` 检查当前文件状态（如下）

```bash
$ vim README
$ git status
# On branch master
# Untracked files:
# (use "git add <file>..." to include in what will be committed)
#
# README
nothing added to commit but untracked files present (use "git add" to track)
```

上面的 `Untracked files` 表示 Git 不会自动将其纳入跟踪范围。

### 跟踪新文件

使用命令 `git add` 开始跟踪一个新文件（如下）

```bash
$ git add README

$ git status
# On branch master
# Changes to be committed:
# (use "git reset HEAD <file>..." to unstage)
#
# new file: README
#
```

只要在 `Changes to be committed` 这行下面的，就说明是已暂存状态。如果此时提交，那么该文件此时此刻的版本就被留存在历史记录中。

### 暂存已修改文件

修改已跟踪过的文件，再次运行 status 命令，如下：

```bash
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    new file:   README

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md
```

文件 CONTRIBUTING.md 出现在 Changes not staged for commit 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区。 

如果要暂存这次更新，需要运行 `git add` 命令。这是个多功能命令：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把所有冲突的文件标记为已解决状态等。

在运行了 `git add` 之后又作了修订的文件，需要重新运行 `git add` 把最新版本重新暂存起来。

### 状态简览

使用 `git status -s` 命令或 `git status --short` 命令，可以得到一种格式更为紧凑的输出（如下）：

```bash
$ git status -s
 M README
MM Rakefile
A  lib/git.rb
M  lib/simplegit.rb
?? LICENSE.txt
```

新添加的未跟踪文件前面有 ?? 标记，新添加到暂存区中的文件前面有 A 标记，修改过的文件前面有 M 标记。 输出中有两栏，左栏指明了暂存区的状态，右栏指明了工作区的状态。


## 忽略文件

我们可以创建一个名为 `.gitignore` 的文件，列出要忽略的文件的模式。

文件 `gitignore` 的格式规范如下：

- 所有空行或者以 `#` 开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配，它会递归地应用在整个工作区中。
- 匹配模式可以以 （`/`）开头防止递归。
- 匹配模式可以以 （`/`）结尾指定目录。
- 要忽略指定模式以外的文件或目录，可以在模式前加上叹号（`!`）取反。

> glob 模式是指 shell 所使用的的简化了的正则表达式。

案例（如下）

```bash
# 忽略所有的 .a 文件
*.a

# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
!lib.a

# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
doc/**/*.pdf
```

> GitHub 有一个十分详细的针对数十种项目及语言的 .gitignore 文件列表， 你可以在 https://github.com/github/gitignore 找到它。
>
> 在最简单的情况下，一个仓库可能只根目录下有一个 .gitignore 文件，它递归地应用到整个仓库中。 然而，子目录下也可以有额外的 .gitignore 文件。子目录中的 .gitignore 文件中的规则只作用于它所在的目录中。 （Linux 内核的源码库拥有 206 个 .gitignore 文件。）


## 查看已暂存和未暂存的修改

使用 `git diff` 可以通过文件补丁的格式更加具体地显示哪些行发生了改变（如下）。

```bash
$ git diff
diff --git a/CONTRIBUTING.md b/CONTRIBUTING.md
index 8ebb991..643e24f 100644
--- a/CONTRIBUTING.md
+++ b/CONTRIBUTING.md
@@ -65,7 +65,8 @@ branch directly, things can get messy.
 Please include a nice description of your changes when you submit your PR;
 if we have to read the whole diff to figure out why you're contributing
 in the first place, you're less likely to get feedback and have your change
-merged in.
+merged in. Also, split your changes into comprehensive chunks if your patch is
+longer than a dozen lines.

 If you are starting to work on a particular area, feel free to submit a PR
 that highlights your work in progress (and note in the PR title that it's
```

此命令比较的是工作目录中当前文件和暂存区域快照之间的差异，也就是修改之后还没有暂存起来的变化内容。

使用 `git diff --staged` 可以查看已暂存的将要添加到下次提交里的内容。这条命令将比对已暂存文件与最后一次提交的文件差异：

```bash
$ git diff --staged
diff --git a/README b/README
new file mode 100644
index 0000000..03902a1
--- /dev/null
+++ b/README
@@ -0,0 +1 @@
+My Project
```


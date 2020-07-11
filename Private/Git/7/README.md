# Git 工具

## 选择修订版本

-- 展示某个 `commitId` > `git show [commitId]`

```bash
$ git show 1c002dd4b536e7479fe34593e72e6c6c1819e53b
```

-- 输出简短且唯一的 `commitId` > `git log --abbrev-commit --pretty=oneline`

```bash
$ git log --abbrev-commit --pretty=oneline
ca82a6d changed the version number
085bb3b removed unnecessary test code
a11bef0 first commit
```

-- 查看引用日志 > `git reflog`

```bash
$ git reflog
734713b HEAD@{0}: commit: fixed refs handling, added gc auto, updated
d921970 HEAD@{1}: merge phedders/rdocs: Merge made by the 'recursive' strategy.
1c002dd HEAD@{2}: commit: added some blame and merge stuff
1c36188 HEAD@{3}: rebase -i (squash): updating HEAD
95df984 HEAD@{4}: commit: # This is a combination of two commits.
1c36188 HEAD@{5}: rebase -i (squash): updating HEAD
7e05da5 HEAD@{6}: rebase -i (pick): updating HEAD
```

每当你的 HEAD 所指向的位置发生了变化，Git 就会把这个信息存储到引用日志这个历史记录里。引用日志只存在于本地仓库，它只是一个记录你在 `自己` 的仓库做过什么的日志。

## 贮藏与清理

贮藏（stash）会处理工作目录的脏的状态——及跟踪文件的修改与暂存的修改——然后将未完成的修改保存在一个栈上，而你可以在任何时候重新应用这种改动（甚至在不同的分支上）

-- 创建新的贮藏 > `git stath`

```bash
$ git stash
Saved working directory and index state \
  "WIP on master: 049d078 added the index file"
HEAD is now at 049d078 added the index file
(To restore them type "git stash apply")
```

-- 查看贮藏栈 > `git stash list`

```bash
$ git stash list
stash@{0}: WIP on master: 049d078 added the index file
stash@{1}: WIP on master: c264051 Revert "added file_size"
stash@{2}: WIP on master: 21d80a5 added number to log
```

-- 使用贮藏栈 > `git stash apply [stash@{n}]`

```bash
$ git stash apply
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   index.html
	modified:   lib/simplegit.rb

no changes added to commit (use "git add" and/or "git commit -a")
```

-- 溢出贮藏堆栈 > `git stath drop [stash@{n}]`

```bash
$ git stash list
stash@{0}: WIP on master: 049d078 added the index file
stash@{1}: WIP on master: c264051 Revert "added file_size"
stash@{2}: WIP on master: 21d80a5 added number to log
$ git stash drop stash@{0}
Dropped stash@{0} (364e91f3f268f0900bc3ee613f9f733e82aaed43)
```

-- 贮藏未跟踪文件 > `git stash -u`

```bash
$ git status -s
M  index.html
 M lib/simplegit.rb
?? new-file.txt

$ git stash -u
Saved working directory and index state WIP on master: 1b65b17 added the index file
HEAD is now at 1b65b17 added the index file

$ git status -s
$
```

-- 从贮藏创建一个分支 > `git stash branch <new branchname>`

```bash
$ git stash branch testchanges
M	index.html
M	lib/simplegit.rb
Switched to a new branch 'testchanges'
On branch testchanges
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   index.html

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   lib/simplegit.rb

Dropped refs/stash@{0} (29d385a81d163dfd45a452a2ce816487a6b8b014)
```

-- 移除工作目录中所有未跟踪的文件以及空的子目录 > `git clean -f -d` 加上 `-x` 则会把忽略的文件也一并移除

```bash
$ git clean -d -n
Would remove test.o
Would remove tmp/
```

-- 查看将要移除的内容 -> `git clean -n`

## 搜索

-- 查看某个版本引入的内容 > `git log -S [string] --oneline`

-- 查看文件的每一次变更 > `git log -L [file]`

## 重写历史

在满意之前不要推送你的工作：Git 的基本原则之一是,由于克隆中有很多工作是本地的,因此你可以在本地随便重写历史记录。然而一旦推送了你的工作，那就完全是另一回事了，除非你有充分的理由进行更改，否则应该将推送的工作视为最终结果。简而言之，在对它感到满意并准备与他人分享之前，应当避免推送你的工作。

-- 修改最近一次提交的提交信息 > `git commit --amend`

> 注意：如果已经推送了最后一次提交，就不要修正它。

-- 修改最近一次提交的暂存内容 > `git commit --amend --no-edit`

### 修改多个提交信息

-- 修改最近的 n 次提交 > `git rebase -i HEAD~[n]`

> 注意：不要涉及任何已经推送到中央服务器的提交——这样坐会产生一次变更的两次版本，因而使他人困惑。

```bash
$ git rebase -i HEAD~3

pick f7f3f6d changed my name a bit
pick 310154e updated README formatting and added blame
pick a5f4a0d added cat-file

# Rebase 710f0f8..a5f4a0d onto 710f0f8
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

#### 修改提交信息

修改提交信息，只需要将每一次提交前面的 `pick` 改为 `edit`。例如，只想修改第三次提交信息，可以像下面这样修改文件：

```bash
edit f7f3f6d changed my name a bit
pick 310154e updated README formatting and added blame
pick a5f4a0d added cat-file
```

当保存并退出编辑器时，Git 将你待会列表中的最后一次提交，把你送回命令行并提示以下信息：

```bash
$ git rebase -i HEAD~3
Stopped at f7f3f6d... changed my name a bit
You can amend the commit now, with

       git commit --amend

Once you're satisfied with your changes, run

       git rebase --continue
```

这些指令准确地告诉你该做什么。输入

```bash
$ git commit --amend
```

修改提交信息，然后退出编辑器。然后，运行

```bash
$ git rebase --continue
```

这个命令将会自动地应用另外两个提交，然后就完成了。 如果需要将不止一处的 `pick` 改为 `edit`，需要在每一个修改为 `edit` 的提交上重复这些步骤。 每一次，Git 将会停止，让你修正提交，然后继续直到完成。

#### 合并提交

指定 `squash` 可以将多次提交变为一个提交，可以这样修改脚本：

```bash
pick f7f3f6d changed my name a bit
squash 310154e updated README formatting and added blame
squash a5f4a0d added cat-file
```

当保存并退出编辑器时，Git 应用所有的三次修改然后将你放到编辑器中来合并三次提交信息：

```bash
# This is a combination of 3 commits.
# The first commit's message is:
changed my name a bit

# This is the 2nd commit message:

updated README formatting and added blame

# This is the 3rd commit message:

added cat-file
```

当你保存之后，你就拥有了一个包含前三次提交的全部变更的提交。

-- 撤销最近一次提交 > `git rest HEAD^`

#### 核武器级选项：filter-branch

可以通过脚本的方式改写大量提交。

## 重置揭秘

HEAD 是当前分支引用的指针，它总是指向该分支上的最后一次提交。HEAD 就是该分支上的最后一次提交的快照。

-- 查看快照 > `git cat-file -p HEAD`

-- 查看文件快照 > `git ls-tree -r HEAD`

```bash
$ git cat-file -p HEAD
tree cfda3bf379e4f8dba8717dee55aab78aef7f4daf
author Scott Chacon  1301511835 -0700
committer Scott Chacon  1301511835 -0700

initial commit

$ git ls-tree -r HEAD
100644 blob a906cb2a4a904a152...   README
100644 blob 8f94139338f9404f2...   Rakefile
040000 tree 99f1a6d12cb4b6f19...   lib
```

索引就是你的 `预期的下一次提交`，我们也会将这个概念引用为 Git 的“暂存区”，这就是当你运行 `git commit` 时 Git 看起来的样子。

Git 将上一次检出到工作目录中的所有文件填充到索引区，它们看起来就像最初被检出时的样子。之后你会将其中一些文件替换成新版本，接着通过 `git commit` 将它们转换为树来用做新的提交。

-- 显示索引当前的样子 > `git ls-files`

```bash
$ git ls-files -s
100644 a906cb2a4a904a152e80877d4088654daad0c859 0	README
100644 8f94139338f9404f26296befa88755fc2598c289 0	Rakefile
100644 47c6340d6459e05787f644c2447d2595f5d3a54b 0	lib/simplegit.rb
```

最后，你就有了自己的 `工作目录`（通常也叫 `工作区`）。另外两棵树以一种高效但并不直观的方式，将它们的内容存储在 `.git` 文件夹中。工作目录会将它们解包为实际的文件以便编辑。你可以把工作目录当做沙盒。在你将修改提交到暂存区并记录到历史之前，可以随意更改（如下图）。

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/27.png)

![image](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/git/28.png)

-- 仅修改 HEAD > `git reset --soft`


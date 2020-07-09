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
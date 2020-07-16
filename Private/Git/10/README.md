# Git 内部原理

从根本上来讲 Git 是一个内容寻址（content-address）文件系统，并在此之上提供了一个版本控制系统的用户界面。

## 底层命令与上层命令

当在一个新目录或已有目录执行 `git init` 时，Git 会创建一个 `.git` 目录。这个额目录包含了几乎所有 Git 存储和操作的东西，如下：

```bash
$ ls -F1
config
description
HEAD
hooks/
info/
objects/
refs/
```

- `description`：文件仅供 GitWeb 程序使用，无需关心。
- `config`：项目特有的配置选项。
- `info`：包含一个全局性排除（global exclude）文件，用以放置那些不希望被记录在 `.gitignore` 文件中的忽略模式（ignored patterns）。
- `hooks`：包含客户端或服务端的钩子脚本（hook scripts）。
- `HEAD`：指向目前被检出的分支。
- `index`（尚未创建）：保存暂存区信息。
- `objects`：存储所有数据内容。
- `refs`：存储指向数据（分支、远程仓库和标签等）的提交对象的指针。

## Git 对象

Git 是一个内容寻址文件系统。这意味着，Git 的核心部分是一个简单的键值对数据库（key-value data store）。你可以向 Git 仓库中插入任意类型的内容，它会返回一个唯一的键，通过该键可以在任意时刻再次取回该内容。


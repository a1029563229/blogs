# Linux 安装 Node

## 安装 nvm
- 升级 yum
```bash
yum update
```

- 安装开发工具
```bash
yum groupinstall 'Development Tools'
```

- 下载 nvm
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

- 映射 nvm 命令
```
source ~/.nvm/nvm.sh
```

## 安装 node
```bash
nvm install v10.16.0
# v 为指定版本号
```
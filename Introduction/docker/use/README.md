# Docker 基础使用

## 安装 docker
- 安装需要的软件包
```bash
yum install -y yum-utils device-mapper-persistent-data lvm2
```

- 设置 yum 源
```bash
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
- 查看所有仓库中所有 docker 版本，并选定特定版本安装
```bash
yum list docker-ce --showduplicates | sort -r
```
- 安装 docker
```bash
yum install docker-ce-18.09.6
```

## 基础命令
- 启动 docker
```bash
systemctl start docker
```

- 查看所有正在运行的容器
```bash
docker ps
```

- 查看所有创建的容器
```bash
docker ps -a :
```

- 删除一个容器
```bash
sudo docker rm 容器名字
```

- 列出已经下载的镜像
```bash
docker image ls
```

- 启动一个或多个已经被停止的容器
```bash
docker start :[container]
```

- 停止一个运行中的容器
```bash
docker stop :[container]
```

- 重启容器
```bash
docker restart :[container]
```

- 启动docker
```bash
service docker start
```

- 拉取 image 文件
```bash
docker image pull [image]
```

- docker 运行 image 文件
```bash
docker container run [image]
```

- 列出本机正在运行的容器
```bash
docker container ls
```

- 列出本机所有容器，包括终止运行的容器
```bash
docker container ls --all
```
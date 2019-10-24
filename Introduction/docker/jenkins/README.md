# Docker + Jenkins

## 安装 Jenkins
- 下载 Jenkins 镜像到服务器上
```bash
docker pull jenkins/jenkins
```

- 查看下载的镜像
```bash
docker images
```

## 启动 Jenkins
- 创建 Jenkins 的工作目录
```bash
cd ~
mkdir jenkins_home

# 一个兼容性问题
chown -R 1000:1000 jenkins_home/
ls -nd jenkins_home
```

- 启动 Jenkins
```bash
docker run -d -p 7000:8080 -p 50000:50000 -v ~/jenkins_home:/var/jenkins_home -v /etc/localtime:/etc/localtime --name jenkins docker.io/jenkins/jenkins
```
参数说明：
  - -d 后台运行镜像
  - -p 7000:8080 将镜像的 8080 端口映射到服务器的 7000 端口
  - -p 50000:50000 将镜像的 50000 端口映射到服务器的 50000 端口
  - -v jenkins:~/jenkins_home  /var/jenkins_home 目录为 jenkins 工作目录，我们将硬盘上的一个目录（~/jenkins_home）挂载到这个位置，方便后续更新镜像后继续使用原来的工作目录。
  - -v /etc/localtime:/etc/localtime 让容器使用和服务器同样的时间设置。
  - --name jenkins 给容器起一个别名

 ## 配置 Jenkins
 浏览器打开 `http://[host]:7000` 进入 Jenkins 配置页面，进入容器内部拿到 Jenkins 的管理员密码。
 ```bash
 docker exec jenkins tail /var/jenkins_home/secrets/initialAdminPassword
```

在页面输入密码，点击 `Continue` ，进入插件安装页面。我们点击左边的 `Install suggested plugins`，安装推荐插件就好。

安装好插件后，系统会提示建立管理员账户。创建账户后进入系统即可。

## 生成 SSHKey —— 用于 git 拉取代码
- 进入容器
```bash
docker exec -it jenkins /bin/bash
```

- 生成 ssh-key
```bash
ssh-keygen -t rsa -C <Your-Key>
```

- 获取公钥
```bash
cat /var/jenkins_home/.ssh/id_rsa.pub
```
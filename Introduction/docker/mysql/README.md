# Docker + Mysql

## docker 安装 mysql
- 安装 mysql
```bash
docker pull mysql:5.7
```
- 启动 mysql
```bash
 docker run -p 3306:3306 --name mall-mysql -v ~/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456  -d mysql:5.7
# run                 运行一个docker容器
# --name           后面这个是生成的容器的名字qmm-mysql
# -p 3306:3306  表示这个容器中使用3306（第二个）映射到本机的端口号也为3306（第一个） 
# -e MYSQL_ROOT_PASSWORD=123456  初始化root用户的密码
# -d                   表示使用守护进程运行，即服务挂在后台
```

- 指定存储路径启动 mysql
```bash
mkdir -p /opt/data/mysql

docker run -d -v /opt/data/mysql/:/var/lib/mysql -p 3306:3306 --name mall-mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
```

- 访问 mysql
```bash
mysql -h192.168.95.4 -p3306 -uroot -p123456
```

- 进入 docker 中的 mysql
```bash
docker exec -it mysql bash
mysql -u root -p
# 访问第二台 3307 的 docker
# mysql -h192.168.95.4 -P3307 -uroot -p123456
```
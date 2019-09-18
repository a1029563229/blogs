# Docker + MongoDB

## docker 安装 mongodb
- 拉取镜像
```bash
docker pull mongo
```

- 创建 mongodb 容器
```bash
docker run -p 27017:27017 -v /opt/data/mongodb:/data/db --name mall-mongodb -d mongo --auth
# -p 指定容器的端口映射，mongodb 默认端口为 27017
# -v 为设置容器的挂载目录，这里是将<LocalDirectoryPath>即本机中的目录挂载到容器中的/data/db中，作为 mongodb 的存储目录
# --name 为设置该容器的名称
# -d 设置容器以守护进程方式运行
# --auth 添加验证，默认mongodb是不使用用户认证。
```

- 进入 mongodb 容器
```bash
docker exec -it mall-mongodb mongo admin
```

- 创建用户
```bash
# 创建用户, 此用户创建成功, 则后续操作都需要用户认证
db.createUser({user:"root",pwd:"root",roles:[{role:'root',db:'admin'}]});
```

- 验证身份
```bash
db.auth('root', 'root');
```
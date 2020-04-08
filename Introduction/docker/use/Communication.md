# Docker 容器间通信方法

Docker 容器间的通信方式根据媒介可以分为：volume 共享通信、网络通信等；根据通信范围也可以分为：同主机通信和跨主机通信等；

## Docker 的网络驱动模型

Docker 的网络驱动模型分类：
- bridge: Docker 中默认的网络驱动模型，通常用于同一主机内的多个独立容器之间通信；
- host：打破 Docker 容器与宿主机之间的网络隔离，直接使用宿主机的网络环境；
- overlay：可以连接多个 docker 守护进程或者满足集群服务之间的通信；适用于不同宿主机上的 docker 容器之间的通信；
- macvlan：可以为 docker 容器分配 MAC 地址，使其像真实的物理机一样运行；
- none：禁用网络驱动，需要自己手动自定义网络驱动配置；

### bridge

![bridge 模式](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/other/Jietu20191130-122831.png)

当 Docker 启动时会自动在主机创建一个虚拟网桥 docker0，bridge 驱动模式中，创建 docker 容器时会自动创建一对 veth pair 接口。就像是一对靠虚拟网线连接起来的两个虚拟网卡，一端连接着 docker 容器，一端连接着虚拟网桥 docker0；

通过这种方式，不同 docker 容器之间可以通过 IP 地址互相通信，也可以通过虚拟网桥访问主机上的网络 `eth0`；（添加 iptables 规则，将 docker 容器对目标地址发出的访问通过地址伪装的方式修改为主机对目标地址进行访问）

如果想要外界网络访问 docker 容器时，需要在 docker 容器启动时加上参数'-p[主机端口]:[容器端口]'进行端口映射，原理也是通过修改 iptables 规则将访问 [主机端口] 的数据转发到 docker 容器的 [容器端口] 中，但是这种做法也存在着占用主机有限的端口资源的缺点。

- docker 查看网络情况的命令

```shell
# 查看 docker 中存在的网络
docker network ls

# 查看 bridge 网络的详细配置
docker network inspect bridge
# 输出结果
[
    {
        "Name": "bridge",
        "Id": "dfa496fe3106c176817d87707387045704756d21e079b206c48f4cc9bdc5ff9b",
        "Created": "2019-11-30T03:31:54.678321046Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "ddf90a8610d6c2c55934c1db68a4e008bd4264c1ef9c885df46fa3c9be6e8269": {
                "Name": "helloworld",
                "EndpointID": "870843f9de0a1794587d821e291442211db34eb96eb156cba4e86a0e1a8d4ee6",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]
```

由上述配置信息可以看出，docker 网桥的网关的 IP 为 "172.17.0.1"，也就是 `docker0`，而 docker 的子网为 "172.17.0.0/16"， docker 将会为容器在 "172.17.0.0/16" 中分配 IP，如其中的 `helloworld` 容器的 IP 为 "172.17.0.2/16"、`helloworld2` 的容器的 IP 为 "172.17.0.3/16"。由于不同容器通过 `veth pair` 连接在虚拟网桥 `docker0` 上，所以容器之间可以通过 IP 互相通信，但是无法通过容器名进行通信

- 容器之间互相通信

```bash
# helloworld 容器访问 helloworld2 容器
curl 172.17.0.3:8000
# 输出结果：Hello Docker!
```

默认的网桥 `bridge` 上的容器只能通过 IP 互连，无法通过 NDS 解析名称或者别名，docker 无法保证容器重启后的 IP 地址不变，所以更好的方式是通过别名互连，在网络中加入 DNS 服务器，将容器名与 IP 地址进行匹配，省去了手动修改 Web 服务中连接 IP 的过程，为了实现不同容器通过容器名或别名的互连，docker 提供了以下几种方法：
- 在启动 docker 容器时加入 `--link` 参数，目前已废弃；
- 启动 docker 容器后进入容器并修改 `/etc/hosts` 配置文件，缺点是手动配置较为复杂；
- 用户自定义 `bridge` 网桥，这是目前解决此类问题的主要方法；

#### 用户自定义 bridge

- 用户自定义 bridge 相对于使用默认 bridge 的主要优势：
  - 用户自定义 bridge 可以在容器化的应用程序提供更好的隔离效果和更好的互通性：更好的隔离效果是针对外界网络，更好的互通性是指同一 bridge 下的不同容器之间。以两个容器 container1，container2 为例，container1 只需要对外界网络暴露 Web 服务的 80 端口，而负责后端的 container2 只需要与 container1 互连，不需要对外暴露，有效地保护了后端容器的安全性，提高了容器对外的隔离效果。而同属于用户自定义 bridge 的容器 container1、container2 之间自动将所有端口暴露，方便容器间进行无障碍的通信，而不会遭受到外界的意外访问；
  - 用户自定义 bridge 在容器之间提供了自动 DNS 解析：不同于默认 bridge 只能通过 IP 互连的限制，用户自定义的 bridge 自动提供了容器间的 DNS 解析功能，容器间可以容器名或别名进行通信；

- 如何使用用户自定义 bridge

```bash
# 创建用户自定义 bridge
docker network create my-net

# 将两个服务加入 "my-net" 中，并观察变化
docker network connect my-net helloworld
docker network connect my-net helloworld2

# 查看 my-net 的网络配置
docker network inspect my-net
[
    {
        "Name": "my-net",
        "Id": "d6de67d79ef6f97c68b8f8e48372a8b2fd127659867ef454be51c90cb0ee35ac",
        "Created": "2019-11-30T07:43:27.42066159Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.20.0.0/16", # my-net 的子网
                    "Gateway": "172.20.0.1" # my-net 的网关
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "42eac55f89b9bf6e4fa861abbdd4de5706d38b7a77d8796adea2d68298b09356": {
                "Name": "helloworld2",
                "EndpointID": "a2be19f876c2bcb4d0814e8575a5ff11c5c5660437226f6267e983e5b44d2cca",
                "MacAddress": "02:42:ac:14:00:03",
                "IPv4Address": "172.20.0.3/16", # 容器的 IP，与之前不同
                "IPv6Address": ""
            },
            "ddf90a8610d6c2c55934c1db68a4e008bd4264c1ef9c885df46fa3c9be6e8269": {
                "Name": "helloworld",
                "EndpointID": "59188f90bff0c1f3c2e7ac12b361f1cd676a0a29207b77ee4a9aeaee98adff25",
                "MacAddress": "02:42:ac:14:00:02",
                "IPv4Address": "172.20.0.2/16", # 容器的 IP，与之前不同
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]

# 进入容器
docker exec -it helloworld bash

# 与容器 B 通信
curl http://helloworld2:8000 
# 输出结果：Hello Docker!
```

至此，容器间的通信功能就已经完成了！
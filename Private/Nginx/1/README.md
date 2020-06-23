# 研究 Nginx 前的准备工作


## Nginx 是什么？

Nginx 是 Web 服务器，Web 服务器的基本功能是：基于 REST 架构风格，以统一资源描述符（URI）或者统一资源定位符（URL）作为沟通依据，通过 HTTP 为浏览器等客户端程序提供各种网络服务。


## 为什么选择 Nginx？

1. 更快：单次响应快、高并发。
2. 高扩展性：模块化、模块以二进制的形式嵌入使用（无需二次编译，性能好）。
3. 高可靠性。
4. 低内存消耗。
5. 单机支持 10 万以上的并发连接。
6. 热部署。
7. 最自由的 BSD 许可协议。

选择 Nginx 的核心理由还是它能在支持高并发的同时保持高效的服务。

## 使用 Nginx 的必备软件

### Linux 内核参数的优化

首先，需要修改/etc/sysctl.conf来更改内核参数。例如，最常用的配置：

```bash
fs.file-max = 999999 
net.ipv4.tcp_tw_reuse = 1 
net.ipv4.tcp_keepalive_time = 600
net.ipv4.tcp_fin_timeout = 30 
net.ipv4.tcp_max_tw_buckets = 5000 
net.ipv4.ip_local_port_range = 1024 
net.ipv4.tcp_rmem = 4096 32768 262142 
net.ipv4.tcp_wmem = 4096 32768 262142 
net.core.netdev_max_backlog = 8096 
net.core.rmem_default = 262144 
net.core.wmem_default = 262144 
net.core.rmem_max = 2097152 
net.core.wmem_max = 2097152 
net.ipv4.tcp_syncookies = 1 
net.ipv4.tcp_max_syn.backlog=1024
```

然后执行sysctl-p命令，使上述修改生效。 上面的参数意义解释如下： 

- file-max：这个参数表示进程（比如一个worker进程）可以同时打开的最大句柄数，这 个参数直接限制最大并发连接数，需根据实际情况配置。

- tcp_tw_reuse：这个参数设置为1，表示允许将TIME-WAIT状态的socket重新用于新的 TCP连接，这对于服务器来说很有意义，因为服务器上总会有大量TIME-WAIT状态的连接。

- tcp_keepalive_time：这个参数表示当keepalive启用时，TCP发送keepalive消息的频度。 默认是2小时，若将其设置得小一些，可以更快地清理无效的连接。

- tcp_fin_timeout：这个参数表示当服务器主动关闭连接时，socket保持在FIN-WAIT-2状 态的最大时间。

- tcp_max_tw_buckets：这个参数表示操作系统允许TIME_WAIT套接字数量的最大值， 如果超过这个数字，TIME_WAIT套接字将立刻被清除并打印警告信息。该参数默认为 180000，过多的TIME_WAIT套接字会使Web服务器变慢。

- tcp_max_syn_backlog：这个参数表示TCP三次握手建立阶段接收SYN请求队列的最大 长度，默认为1024，将其设置得大一些可以使出现Nginx繁忙来不及accept新连接的情况时， Linux不至于丢失客户端发起的连接请求。

- ip_local_port_range：这个参数定义了在UDP和TCP连接中本地（不包括连接的远端） 端口的取值范围。

- net.ipv4.tcp_rmem：这个参数定义了TCP接收缓存（用于TCP接收滑动窗口）的最小 值、默认值、最大值。

- net.ipv4.tcp_wmem：这个参数定义了TCP发送缓存（用于TCP发送滑动窗口）的最小 值、默认值、最大值。

- netdev_max_backlog：当网卡接收数据包的速度大于内核处理的速度时，会有一个队列 保存这些数据包。这个参数表示该队列的最大值。

- rmem_default：这个参数表示内核套接字接收缓存区默认的大小。

- wmem_default：这个参数表示内核套接字发送缓存区默认的大小。

- rmem_max：这个参数表示内核套接字接收缓存区的最大大小。

- wmem_max：这个参数表示内核套接字发送缓存区的最大大小。


## nginx 命令速查

nginx 命令如下：

  - 启动 nginx：`nginx`；
  - 指定配置文件启动：`nginx -c [nginx.conf]`；
  - 检查配置信息：`nginx -t [nginx.conf]`；
  - 快速停止服务：`nginx -s stop`；
  - “优雅地”停止服务：`nginx -s quit`；


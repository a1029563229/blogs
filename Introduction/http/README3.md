# 手把手教你用 Node 实现 HTTP 协议（三）

[上一章](https://github.com/a1029563229/Blogs/tree/master/Introduction/http/README2.md)介绍了如何解析 HTTP 请求报文，这一章我们来讲解如何进行报文的收发和 TCP 连接的建立。

TCP 是一条全双工通信通道，我们可以通过使用 Node 的 `net` 模块来创建一个 TCP 进程，监听来自客户端的请求，使用方法如下：

```ts
net.createServer((socket) => {
  socket.on('data', (data: Buffer) => {
    // ... 处理接收的客户端信息
  });

  socket.on('error', error => {
    // ... 处理出错信息
  });
});
```

在 `data` 事件中所接收到的数据属于字节流数据（Buffer 对象），我们需要使用 `Buffer` 对象自带的 `toString` 方法来进行对字节流的解析，将其转化为 `utf-8` 格式的字符。

然后将转化后的字符串交由我们的 `HttpParser` 处理，然后将序列化的请求对象挂载在 `http.createServer((req, res) => {})` 中的 `req` 上，同时可以通过 `res.end(message)` 进行报文响应。

我们将上述步骤解析一下可得知，我们还需要两个类，一个用来承载 Request 信息，一个用于处理响应结果的 Response，那我们现在来新建这两个类：

```js
// 用于处理请求信息
import HttpParser, { HttpMessage } from "./HttpParser";

class IncomingMessage {
  private httpParser: HttpParser;
  public httpMessage: HttpMessage;

  constructor(message: string) {
    this.httpParser = new HttpParser(message);
    this.httpMessage = this.httpParser.httpMessage;
  }
}

export default IncomingMessage;
```

```ts
// 用于响应处理结果
import * as net from 'net';
// ResponseFormatter 就是反序列化 JSON 数据的类，可从源码仓库查看
import ResponseFormatter from './ResponseFormatter';

class ServerResponse {
  private socket: net.Socket;
  private resFormatter: ResponseFormatter;
  
  constructor(socket: net.Socket) {
    this.socket = socket;
    this.resFormatter = new ResponseFormatter();
  }

  public setHeader(key: string, val: string) {
    this.resFormatter.setHeader(key, val);
  }
  
  public end(status: number, body: string) {
    const resFormatter = this.resFormatter;
    resFormatter.setStatus(status);
    resFormatter.setBody(body);
    // 下面三步就是向客户端发送 TCP 字节流数据
    this.socket.write(resFormatter.format());
    this.socket.pipe(this.socket);
    this.socket.end();
  }
}

export default ServerResponse;
```

最后我们在我们的事件监听中，加入这两个处理对象：

```ts
socket.on('data', (data: Buffer) => {
  // ... 处理接收的客户端信息
  const message = data.toString('utf-8'); // 解码字节流数据
  this.request = new IncomingMessage(message); // 封装 request 对象
  this.response = new ServerResponse(socket); // 封装 response 对象
  this.handler(this.request, this.response); // 将两个对象作为参数传入回调函数
});
```

现在我们只需要正确的将回调函数添加到 `HTTP` 对象中即可，我们最后的 `HTTP` 类的实现如下：

```ts
import * as net from 'net';
import * as EventEmitter from 'events';
import IncomingMessage from "./IncomingMessage";
import ServerResponse from "./ServerResponse";

type Handler = (request: IncomingMessage, response: ServerResponse) => void;

class HTTP extends EventEmitter{
  handler: Handler;
  request: IncomingMessage;
  response: ServerResponse;
  server: net.Server;
  socket: net.Socket;

  constructor(handler: Handler) {
    super();
    this.handler = handler;
    this.createServer();
  }

  private createServer(): void {
    this.server = net.createServer((socket) => {
      socket.on('data', (data: Buffer) => {
        const message = data.toString('utf-8');
        this.request = new IncomingMessage(message);
        this.response = new ServerResponse(socket)
        this.handler(this.request, this.response);
      });

      socket.on('error', error => {
        this.emit('error', error)
      });
    });
  }

  public listen(port: number, cb: any = () => { }): void {
    this.server.listen(port, cb);
    this.server.on('error', error => this.emit('error', error));
  }
}

const createServer = (handler: Handler) => {
  return new HTTP(handler)
}

export default {
  createServer
}
```

完成最后的 `HTTP` 类后，我们就可以通过第一章的方法去创建一个 HTTP 服务端了，并且可以处理请求信息，将请求信息如数返回给客户端。

至此，一个 HTTP 协议就被我们实现了！

[源码地址，欢迎 Star](https://github.com/a1029563229/Blogs/tree/master/Introduction/http/README.md)

[原文地址，欢迎 Star](https://github.com/a1029563229/Blogs/tree/master/Introduction/http/README3.md)
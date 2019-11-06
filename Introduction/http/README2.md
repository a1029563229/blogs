# 手把手教你用 Node 实现 HTTP 协议（二）

这一章我们重点讲解如何解析 HTTP 请求报文，HTTP 报文主要分为三个部分：起始行、首部字段、内容主体。

这里我使用 postman 发起下图的 POST 请求，然后看看请求报文的格式是什么样的

![POST 请求](http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/blogs/http/1.png)

收到的请求报文格式是这样的：
```
POST / HTTP/1.1
Content-Type: application/json
User-Agent: PostmanRuntime/7.17.1
Accept: */*
Cache-Control: no-cache
Postman-Token: 5041de72-27c3-44c6-99e8-c04c306b11ef
Host: localhost:8888
Accept-Encoding: gzip, deflate
Content-Length: 19
Connection: keep-alive

{
        "name": "jack"
}
```

我们可以先看第一行，包含的信息有请求的方法为 `POST`，请求的路径为 `/`，HTTP 版本为 `1.1`；然后我们看最后一行，最后一行包含了请求的主体 `{ "name": "jack" }`，而中间的内容就是 HTTP 报文的请求首部。

我们已经把一个复杂的 HTTP 报文分解成了多个简单的部分，那我们希望能得到一个可用的 JSON 格式，最终效果看起来是这样的：

```json
{
    "method": "POST",
    "url": "/",
    "version": "HTTP/1.1",
    "headers": {
        "content-type": "application/json",
        "user-agent": "PostmanRuntime/7.17.1",
        "accept": "*/*",
        "cache-control": "no-cache",
        "postman-token": "5041de72-27c3-44c6-99e8-c04c306b11ef",
        "host": "localhost",
        "accept-encoding": "gzip, deflate",
        "content-length": "19",
        "connection": "keep-alive"
    },
    "body": "{\n\t\"name\": \"jack\"\n}"
}
```

我们新建一个 `src/HttpParser.ts` 文件来进行解析（如果你没有配置 Node TS 运行环境，那么你可以基于这份[已完成的框架](https://github.com/a1029563229/Blogs/tree/master/Introduction/http)进行重新开发），我们先定义我们最后解析的格式为 `HttpMessage`

```ts
export type Headers = { [key: string]: string };

export type HttpMessage = {
  method: string;
  url: string;
  version: string;
  headers: Headers;
  body: string;
}
```

我们的 `HttpParser` 类应该有两个属性，一个用于接收报文流的 `message`，一个承载解析后的报文 `httpMessage`，然后应该还有一个解析的函数 `parse`，所以整体结构看起来应该是像这样的：

```ts
class HttpParser {
  private message: string;
  public httpMessage: HttpMessage = null;

  constructor(message: string) {
    this.message = message;
    this.parse();
  }

  private parse(): void {
    // ...
  }
}

export default HttpParser;
``` 

从上面可以看出，其实我们的关键性函数就是 `parse`，那我们怎么去解析这个报文呢？从第一章的知识可以得知，起步行和首部就是由行分隔的 ASCII 文本。每行都以一个 由两个字符组成的行终止序列作为结束，其中包括一个回车符（ASCII 码 13）和一个换行符（ASCII 码 10）。这个行终止序列可以写作 CRLF。这个 CRLF 在代码中的表示就是 `\r\n`，由此可知，我们只需要用 `String.prototype.split` 函数传入 `\r\n` 就可以得到各个部分，再利用三个函数分别处理起始行、首部和主体字段即可，这里的实现还是比较简单的，所以就直接贴代码出来了

```ts
class HttpParser {
  private message: string;
  public httpMessage: HttpMessage = null;

  constructor(message: string) {
    this.message = message;
    this.parse();
  }

  private parse(): void {
    this.httpMessage = {} as HttpMessage;
    const messages = this.message.split('\r\n');
    const [head] = messages;
    const headers = messages.slice(1, -2);
    const [body] = messages.slice(-1);
    this.parseHead(head);
    this.parseHeaders(headers);
    this.parseBody(body);
  }

  private parseHead(headStr: string) {
    const [method, url, version] = headStr.split(' ');
    this.httpMessage.method = method;
    this.httpMessage.url = url;
    this.httpMessage.version = version;
  }

  private parseHeaders(headerStrList: string[]) {
    this.httpMessage.headers = {};
    for (let i = 0; i < headerStrList.length; i++) {
      const header = headerStrList[i];
      let [key, value] = header.split(":");
      key = key.toLocaleLowerCase();
      value = value.trim();
      this.httpMessage.headers[key] = value;
    }
  }

  private parseBody(bodyStr: string) {
    if (!bodyStr) return this.httpMessage.body = "";
    this.httpMessage.body = bodyStr;
  }
}
```

最后通过调用 `new HttpParser(message).httpMessage` 就可以从 HTTP 报文中得到序列化后的请求报文了。

对请求报文我们做了序列化，对响应报文我们也应该做一个反序列化，最后输出的响应报文格式应该是这样的（根据我们第一章的需求）：

```
HTTP/1.1 200 ok
content-type: application/json

{"method":"POST","url":"/","version":"HTTP/1.1","headers":{"content-type":"application/json","user-agent":"PostmanRuntime/7.17.1","accept":"*/*","cache-control":"no-cache","postman-token":"5cd74556-35fe-488d-a363-b4754992da60","host":"localhost","accept-encoding":"gzip, deflate","content-length":"19","connection":"keep-alive"},"body":"{\n\t\"name\": \"jack\"\n}"}
```

这个反序列化的实现交由读者去自行实现作为练习，我们在最后一章的时候会讲解如何完成一个客户-服务器模式中的服务器应用，接收来自客户端的请求，并响应处理结果。

[原文地址，欢迎 Star](https://github.com/a1029563229/Blogs/tree/master/Introduction/http/README2.md)
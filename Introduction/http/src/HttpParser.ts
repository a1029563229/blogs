export type Headers = { [key: string]: string };

export type HttpMessage = {
  method: string;
  url: string;
  version: string;
  headers: Headers;
  body: string;
}

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

export default HttpParser;
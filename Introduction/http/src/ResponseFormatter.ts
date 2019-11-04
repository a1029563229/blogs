import { Headers } from './HttpParser';

class ResponseFormatter {
  private status: number = 200;
  private message: string = 'ok';
  private version: string = 'HTTP/1.1';
  private headers: Headers = null;
  private body: string = '';

  constructor() {
    this.headers = {
      'Content-Type': 'text/plain'
    };
  }

  public setStatus(status: number) {
    this.status = status;
  }

  public setBody(body: string) {
    this.body = body;
  }

  public format(): string {
    const head = `${this.version} ${this.status} ${this.message}`;
    let headers = '';
    for (let key in this.headers) {
      const value = this.headers[key];
      headers += `${key.toLocaleLowerCase()}: ${value}\r\n`;
    }
    const combineData = [head, headers, this.body].join('\r\n');
    return combineData;
  }
}

export default ResponseFormatter;
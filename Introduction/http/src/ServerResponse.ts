import * as net from 'net';
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
    console.log(resFormatter.format());
    this.socket.write(resFormatter.format());
    this.socket.pipe(this.socket);
    this.socket.end();
  }
}

export default ServerResponse;
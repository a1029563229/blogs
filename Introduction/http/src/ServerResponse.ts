import * as net from 'net';
import ResponseFormatter from './ResponseFormatter';

class ServerResponse {
  private socket: net.Socket;
  
  constructor(socket: net.Socket) {
    this.socket = socket;
  }

  public end(status: number, body: string) {
    const res = new ResponseFormatter();
    res.setStatus(status);
    res.setBody(body);
    this.socket.write(res.format());
    this.socket.pipe(this.socket);
    this.socket.end();
  }
}

export default ServerResponse;
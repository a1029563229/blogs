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
import * as net from 'net';
import HttpParser from './src/HttpParser';

const server = net.createServer((socket) => {
  socket.on('connect', () => {
    console.log('connect...');
  });

  socket.on('end', () => {
    console.log('end...');
  });

  socket.on('data', (data: Buffer) => {
    const message = data.toString('utf-8');
    const httpParser = new HttpParser(message);
    console.log(httpParser.httpMessage);
    socket.write(`HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n{a:1}`);
    socket.pipe(socket);
    socket.end();
  });

  socket.on('error', error => {
    console.log({ error });
  });
});

server.on('error', err => {
  throw err;
});

server.listen(8888, () => {
  console.log('starting...');
});
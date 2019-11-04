import http from './src/Http';
import IncomingMessage from './src/IncomingMessage';
import ServerResponse from './src/ServerResponse';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log(req.httpMessage);
  res.end(200, 'hello world!');
});

server.listen(8888, () => {
  console.log("server is listening in 8888...");
});
import http from './src/Http';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(200, JSON.stringify(req.httpMessage));
});

server.listen(8888, () => {
  console.log("server is listening in 8888...");
});
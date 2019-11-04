import * as net from 'net';

const server = net.createServer((c) => {
  c.on('connect', () => {
    console.log('connect...');
  });

  c.on('end', () => {
    console.log('end...');
  });

  c.on('data', data => {
    const message = data.toString('utf-8');
    console.log(message);
    console.log({ message });
  });

  c.on('error', error => {
    console.log({ error });
  });
});

server.on('error', err => {
  throw err;
});

server.listen(8888, () => {
  console.log('starting...');
});
var net = require('net');

//通过UNIX socket套接字创建客户端
// var client = net.connect({path: '/tmp/echo.sock'}, function() {
//通过端口创建客户端
var client = net.connect({ port: 8888 }, function () {
  console.log('已连接到服务器');
  client.write('itbilu.com!\r\n');
});

//data事件监听。收到数据后，断开连接
client.on('data', function (data) {
  console.log(data.toString('utf-8'));
  client.end();
});

//end事件监听，断开连接时会被触发
client.on('end', function () {
  console.log('已与服务器断开连接');
});
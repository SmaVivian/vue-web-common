var sever = require('http').createServer();
var io = require('socket.io')(sever)

io.on('connection', function (socket) {
  socket.on('login', function (data) { //接收连接中的login事件
    console.log(data);
    io.emit('loginmsg', '你发过来的数据是：' + data) //发送回去 事件名为loginmsg
  })

})
console.log('socket端口：8000');
sever.listen(8000)

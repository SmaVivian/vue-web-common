var sever = require('http').createServer()
var io = require('socket.io')(sever)
var timer

io.on('connection', function (socket) {
  socket.on('chat', function (data) { //接收连接中的chat事件
    console.log('连接', data);
    console.log(timer)

    // io.emit('chatMsg', '你发过来的数据是：' + data) //发送回去 事件名为chatMsg
    io.emit('chatMsg', data) //发送回去 事件名为chatMsg

    // 模仿其他人发消息,每10秒向客户端发送一条消息
    if (timer) return
    timer = setInterval(() => {
      console.log('循环')
      io.emit('chatMsg', { name: 'Tom', msg: '别人发的' })
    }, 10000)
  })

  socket.on('close', function() {
    console.log('断开')
    clearInterval(timer)
    timer = ''
  })

})
console.log('socket端口：8000');
sever.listen(8000)

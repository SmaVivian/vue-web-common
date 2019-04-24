<template>
  <div>
    <ul>
      <li v-for="(item, index) in listData" :key="index">
        {{item.name}}说：{{item.msg}}
      </li>
    </ul>
    <div style="margin-top: 30px;">
      <input type="text" v-model="params.name" placeholder="姓名" style="width:200px;">
      <input type="text" v-model="params.msg" placeholder="内容">
      <button @click='chat'>向8000端口发送数据</button>
      {{backdata}}
    </div>

  </div>
</template>
<script>
import socket from '@/utils/socket';
export default{
  data() {
    return {
      listData: [],
      params: {
        name: 'admin',
        msg: '测试',
      },
      backdata: '',
    }
  },
  // sockets: { //在此接收又服务器发送过来的数据 ps：注意此处的方法名要与服务器的发送的事件保持一致才能接收到
  //   connect: function() {      //与ws:127.0.0.1:8000连接后回调
  //     console.log('连接成功')
  //   },
  //   chatMsg: function(value) {
  //     console.log(value)//监听login(后端向前端emit login的回调)
  //     this.backdata=value

  //     this.listData.push(value)
  //   }
  // },
  methods: {
    chat() {
      socket.emit('chat', this.params)
    }
  },
  mounted() {
    socket.on('connect', ()=> {
      console.log('连接成功')
    })

    socket.on('chatMsg', (value)=> {
      console.log(value)//监听login(后端向前端emit login的回调)
      this.backdata=value

      this.listData.push(value)
    })
  },
  activated() {
    console.log(socket)
    socket.emit('chat', '')
    // ajax 首次获取最近的消息
    this.listData =[
      {
        name: 'Jane',
        msg: '消息1'
      },
      {
        name: 'Vivi',
        msg: '消息2'
      },
      {
        name: 'XiaoMing',
        msg: '消息3'
      },
    ]
  },
  deactivated() {
    // 为缓存组件时需加上  一般情况下不用缓存  该项目使用了keep-alive 故要加上
    socket.emit('close', '')
  },
 }
</script>

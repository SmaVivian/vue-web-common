<template>
  <div>
    <div>
      <input type="text" v-model="msg">
      <button @click='Login'>向8000端口发送数据</button>
      {{backdata}}
    </div>

  </div>
</template>
<script>
export default{
  data:function (){
    return {
      msg:"aaaa",
      backdata:'',
    }
  },
  sockets:{ //在此接收又服务器发送过来的数据 ps：注意此处的方法名要与服务器的发送的事件保持一致才能接收到
   connect:function() {      //与ws:127.0.0.1:8000连接后回调
    console.log('连接成功');
   },
   loginmsg:function(value) {
    console.log(value);//监听login(后端向前端emit login的回调)
    this.backdata=value;
   }
  },
  methods:{
    Login(){
      this.$socket.emit('login',this.msg);
    }
  }

 }
</script>

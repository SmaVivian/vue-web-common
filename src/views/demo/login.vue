<template>
   <div class="login-body">
     <div class="alertMsg" v-if="alertshow">
       <p>6-20位必须包含数字、字母或特殊字符中的两种</p>
     </div>
     <div class="login-cont">
        <p class="Htitle">用户登录</p>
        <input type="text" class="user" placeholder="用户名/手机号码" v-model="name" maxlength="11">
        <input type="password" class="passWord" placeholder="密码" v-model="pass" maxlength="20">
        <div class="pic-vertify-box" v-if="showVertify">
          <input id="inputCode" type="text" class="passWord" placeholder="验证码" v-model="code" @keyup.enter="goLogin">
          <img id="captcha" class="pic-vetify" src="/admin/Tools/getImgCode.do" @click="refreshCode('captcha')">
        </div>
       <div class="loginForm">
         <div class="loginLeft">
           <el-checkbox v-model="checked" id="isNext"></el-checkbox>
           <label for="isNext">下次自动登录</label>
         </div>
         <div class="loginRight">
           <router-link tag="span" to="/person/forgetPW?type=forget">忘记密码 &nbsp;| </router-link>
           <router-link tag="span" to="/person/register?type=add">注册 &nbsp; </router-link>
         </div>
       </div>
       <a href="javascript:void (0);" class="loginBtn" :class="['loginBtn', submitEnable?'enable':'']" @click="goLogin">登录</a>

       <div class="otherBox">
        <p class="otherTitle">------其他登录方式-----</p>
        <div class="otherLogin">
          <a href="javascript:void (0);" class="weixin"></a>
          <a href="javascript:void (0);" class="weibo"></a>
          <a href="javascript:void (0);" class="QQLogin"></a>
        </div>
       </div>
     </div>
   </div>
</template>

<script>
  import md5 from 'js-md5';
  import { validate } from '@/utils/validate';
  export default {
    name: "login",
    data(){
      return {
        checked: true,
        name: '',
        pass: '',
        code: '',
        alertshow: false,
        showVertify: false  //是否显示验证码
      }
    },
    computed: {
      // 登录按钮是否可用
      submitEnable() {
        var _this=this
        if(this.name && this.pass) {
          if(validate(this.pass, 'password')) {
            _this.alertshow=false
            return true
          } else {
            _this.alertshow=true
            return false
          }
          if(this.showVertify && this.code || !this.showVertify) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
    },
    methods: {
      goLogin() {
        if(!this.submitEnable) {
          return
        }
        this.$store.dispatch('LoginUser', {
          loginName: this.name,
          password: 'dc483e80a7a0bd9ef71d8cf973673924',
          // password: md5(this.$salt + this.pass),
          verification: this.code,
          checked: this.checked
        })
        .then((res) => {
          this.$router.push({ path: '/person'})
        }).catch(() => {
          this.showVertify = this.$store.state.user.showVertify
          this.refreshCode('captcha')  // 刷新验证码
        })
      },
      // 刷新验证码
      refreshCode(imgId) {
        document.getElementById(imgId).src='/admin/Tools/getImgCode.do?'+Math.random()
        document.getElementById('inputCode').focus()
        return false
      }
    },
    activated() {
      this.showVertify = this.$store.state.user.showVertify
    }
  }
</script>

<style scoped lang="sass">
  .login-body
    background: url("~@images/demo/person/Group.png") center no-repeat
    background-size: 100% 100%
    position: relative
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    // margin-top: -70px
    .alertMsg
      position: absolute
      z-index: 100
      margin: auto
      top: 80px
      right: 0
      left: 0px
      min-width: 380px
      border-radius: 5px
      width: 438px
      border-color: #ebeef5
      background-color: #edf2fc
      padding: 13px 15px
      text-align: center
      p
        font-size: 14px
    .login-cont
      background: url("~@images/demo/person/login_body1.png") center no-repeat
      background-size: auto 100%
      width: 485px
      height: 590px
      position: absolute
      top: 0
      left: 0
      margin: auto
      right: 0
      bottom: 0
      box-shadow: 0px 10px 30px #1A714B
      padding: 54px 93px 36px
      text-align: center
      .pic-vertify-box
        position: relative
        .pic-vetify
          position: absolute
          top: 21px
          right: 90px
          width: 80px
          height: 30px
          cursor: pointer
      .Htitle
        height: 25px
        font-size: 18px
        font-family: PingFang-SC-Medium
        font-weight: 500
        color: rgba(29,116,78,1)
        line-height: 25px
        /*margin-top: 35px*/
      .user
        width: 300px
        border: none
        outline: none
        height: 30px
        font-size: 14px
        font-family: PingFang-SC-Medium
        font-weight: 500
        color: rgba(153,153,153,1)
        margin-top: 70px
        line-height: 30px
        border-bottom: 2px solid rgba(207,207,207,1)
      .passWord
        width: 300px
        border: none
        outline: none
        height: 30px
        font-size: 14px
        margin-top: 28px
        font-family: PingFang-SC-Medium
        font-weight: 500
        color: rgba(153,153,153,1)
        line-height: 30px
        border-bottom: 2px solid rgba(207,207,207,1)
      .loginForm
        display: flex
        justify-content: space-between
        height: 20px
        font-size: 14px
        font-family: PingFang-SC-Medium
        font-weight: 500
        margin: 10px auto 0
        width: 300px
        color: rgba(153,153,153,1)
        line-height: 20px
        span
          cursor: pointer
        #isNext
          /*width: 14px*/
          /*height: 14px*/
          /*border-radius: 3px*/
          /*border: 1px solid rgba(153,153,153,1)*/
      .loginBtn
        width: 130px
        height: 50px
        background: #999
        border-radius: 30px
        font-size: 16px
        font-family: PingFang-SC-Medium
        font-weight: 500
        color: rgba(255,255,255,1)
        text-align: center
        line-height: 50px
        margin: 51px auto 0px
        display: block
        position: relative
        z-index: 2
        &.enable
          background: rgba(29,116,78,1)
      .otherBox
        position: absolute
        width: 200px
        left: 50%
        bottom: 35px
        margin-left: -100px
      .otherTitle
        height: 20px
        font-size: 14px
        font-family: PingFang-SC-Medium
        font-weight: 500
        color: rgba(153,153,153,1)
        line-height: 20px
        width: 200px
        margin: 111px auto 20px
      .otherLogin
        display: flex
        justify-content: space-around
        margin: 0 auto
        width: 156px
        .weixin
          background: url("~@images/demo/person/Shape.png") center no-repeat
          background-size: 100% 100%
          width: 32px
          height: 32px
          display: block
        .weibo
          background: url("~@images/demo/person/Shape1.png") center no-repeat
          background-size: 100% 100%
          width: 32px
          height: 32px
          display: block
        .QQLogin
          background: url("~@images/demo/person/Shape3.png") center no-repeat
          background-size: 100% 100%
          width: 32px
          height: 32px
          display: block
</style>
<style lang="sass">
  .el-checkbox__input.is-checked
    .el-checkbox__inner
      background-color: #1d744e
      border-color: #1d744e
      &:hover
        border-color: #1d744e
</style>

import Cookies from 'js-cookie'

const user = {
  state: {
    userName: '',
    headImg: '',
    phone: '',
    isLogin: false,
    isNextLogin: true,  //下次自动登录
    showVertify: false,  // 是否显示验证码
    token: '',
    userid: '',
    defaultImg: 'this.src="' + require('@/assets/images/no-data.png') + '"',  // 默认图片
    defaultHeadImg: 'this.src="' + require('@/assets/images/default-head.png') + '"'   // 默认头像
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      if(userInfo) {
        state.token = userInfo.token;
        state.userid = userInfo.userid;
        state.userName = userInfo.userName;
        state.headImg = userInfo.headImg;
        state.isLogin = true;
      } else {
        state.token = '';
        state.userid = '';
        state.userName = '';
        state.headImg = '';
        state.isLogin = false;
      }
      state.isNextLogin = userInfo.checked;
    },
    SET_USER_PHONE(state, val) {
      state.phone = val;
    },
    SET_LOGIN_VERTIFY(state, val) {
      state.showVertify = val;
    }
  },
  actions: {
    setUserIfo({ commit }, info) {
      commit('SET_USER_INFO', info);
    },
    // 用户名登录
    LoginUser({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // this._vm.$http.get("/postLogin.do", userInfo).then((res)=>{
        this._vm.$http.post("/web/login", userInfo).then((res)=>{
          if(res.success==1) {
            commit('SET_LOGIN_VERTIFY', false);
            commit('SET_USER_PHONE', res.data.phone);
            commit('SET_USER_INFO', {
              token: res.data.token,
              userid: res.data.id,
              userName: res.data.userName,
              headImg: res.data.avatarLink,
              checked: userInfo.checked   // 下次是否自动登录
            });
            Cookies.set('showVertify', '0', { expires: 7 });
            Cookies.set('checked', userInfo.checked ? '1':'0', { expires: 7 });
            Cookies.set('token', res.data.token, { expires: 7 });
            // Cookies.remove('userid');
            // Cookies.set('userid', res.data.id, { expires: 7 });
            // 下次是否自动登录
            if(userInfo.checked) {
              Cookies.set('userid', res.data.id, { expires: 7 });
            } else {
              Cookies.set('userid', res.data.id);
            }

            // document.cookie = 'testtest=1'
            // alert('登录成功'+Cookies.get('testtest'))
            Cookies.set('phone', res.data.phone, { expires: 7 });
            Cookies.set('userName', res.data.userName, { expires: 7 });
            Cookies.set('headImg', res.data.avatarLink, { expires: 7 });
            resolve();
          }else{
            commit('SET_LOGIN_VERTIFY', true);
            Cookies.set('showVertify', '1', { expires: 7 });
            this._vm.$message.error(res.msg);
            reject();
          }
        }, error => {
          this._vm.$message.error('服务器异常');
        })
      })
    },
    LoginOut({ commit }) {
      commit('SET_LOGIN_VERTIFY', false);
      commit('SET_USER_INFO', '');
      commit('SET_USER_PHONE', '');
      Cookies.remove('userid');
    }
  }
}

export default user

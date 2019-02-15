const user = {
  state: {
    isLogin: false,
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
        state.isLogin = true;
      } else {
        state.token = '';
        state.userid = '';
        state.isLogin = false;
      }
    },
  },
  actions: {
    setUserIfo({ commit }, info) {
      commit('SET_USER_INFO', info);
    },
    // 用户名登录
    LoginUser({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        this._vm.$http.get("/mobileLogin.do", userInfo)
        .then((res)=>{
          if(res.data.success==1) {
            commit('SET_USER_INFO', {
              token: res.data.data.token,
              userid: res.data.data.id,
            });
            Cookies.set('token', res.data.data.token);
            Cookies.set('userid', res.data.data.id);
            resolve();
          }else{
            this._vm.$toast(res.data.data.tipMessage);
            reject();
          }
        }, error => {
          this._vm.$toast('服务器异常');
          reject(error);
        })
      })
    },
  }
}

export default user
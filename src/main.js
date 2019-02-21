// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'  
import Cookies from 'js-cookie'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import 'babel-polyfill'

import store from '@/store'
import '@/utils/filters'
import request from '@/utils/request'
Vue.prototype.$http = request
// Vue.prototype.$salt = 'tj720'

Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 页面刷新时，重新赋值token、userid
  if (Cookies.get('userid')) {
    store.commit('SET_USER_INFO', {
      token: Cookies.get('token'),
      userid: Cookies.get('userid'),
      userName: Cookies.get('userName'),
      headImg: Cookies.get('headImg'),
      checked: Cookies.get('checked') === '1' ? true : false  // 是否自动登录
    });

    store.commit('SET_USER_PHONE', Cookies.get('phone'))
    // store.commit('SET_LOGIN_VERTIFY', Cookies.get('showVertify') === '1' ? true : false)
  }
  store.commit('SET_LOGIN_VERTIFY', Cookies.get('showVertify') === '1' ? true : false)  // 是否显示验证码

  console.log(Cookies.get('userid'))
  // if(to.meta.requireAuth) {
  //   if(store.state.user.userid) {
  //     next()
  //   } else {
  //     next({
  //       path: '/person/login'
  //     })
  //   }
  //   next()
  // } else {
  //   next()
  // }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

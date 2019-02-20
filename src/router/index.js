import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

//使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
Vue.mixin({
  beforeRouteLeave:function(to, from, next){
    //此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
    if (from && from.meta.rank && to.meta.rank && from.meta.rank>to.meta.rank) {
      
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          if (this.$vnode.componentOptions)
          {
            var key = this.$vnode.key == null
              ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
              : this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys  = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
    }
    next();
  },
});

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/demo/index',
      name: 'demo',
      component: () => import('@/views/demo/index'),
      meta: {rank: 1 }
    },
    {
      path: '/demo/form',
      name: 'demoForm',
      component: () => import('@/views/demo/form'),
      meta: {}
    },
    {
      path: '/demo/list',
      name: 'demoList',
      component: () => import('@/views/demo/list'),
      meta: {rank: 2 }
    },
    {
      path: '/demo/tablist',
      name: 'demoTablist',
      component: () => import('@/views/demo/tablist'),
      meta: {}
    },
    {
      path: '/demo/login',
      name: 'demoLogin',
      component: () => import('@/views/demo/login'),
      meta: {}
    },
  ]
})

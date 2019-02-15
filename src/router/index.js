import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
      meta: {}
    },
    {
      path: '/demo/tablist',
      name: 'demoTablist',
      component: () => import('@/views/demo/tablist'),
      meta: {}
    },
  ]
})

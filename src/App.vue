<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import './assets/css/reset.css';
  @import 'element-ui/lib/theme-chalk/index.css';
  @import '~@/assets/css/theme.scss';
  @import '~@/assets/css/resetCmp.scss';
</style>

<style>
#app {
  font-family: 'PingFangSC-Regular','微软雅黑','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<template>
  <div class="page-demo">
    <el-row class="box" :gutter="20">
      <el-col :span="6"><router-link tag="div" :to="{path: '/demo/list'}" class="item">列表</router-link></el-col>
      <el-col :span="6"><router-link tag="div" :to="{path: '/demo/tablist'}" class="item">tab列表</router-link></el-col>
      <el-col :span="6"><router-link tag="div" :to="{path: '/demo/searchlist'}" class="item">搜索列表</router-link></el-col>
      <el-col :span="6"><router-link tag="div" :to="{path: '/demo/detail'}" class="item">详情</router-link></el-col>
    </el-row>
    <el-row class="box" :gutter="20">
      <el-col :span="6"><router-link tag="div" :to="{path: '/demo/login'}" class="item">登录</router-link></el-col>
      <el-col :span="6"><router-link tag="div" :to="{path: '/demo/form'}" class="item">表单</router-link></el-col>
      <el-col :span="6"><router-link tag="div" :to="{path: '/demo/swiper'}" class="item">轮播-基础</router-link></el-col>
      <el-col :span="6"><router-link tag="div" :to="{path: '/demo/swiper/thumbs'}" class="item">轮播-缩略图</router-link></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@assets/css/mixin.scss';
.page-demo {
  padding: 50px;
  .box {
    margin-bottom: 20px;
  }
  .item {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: solid 1px $border;
    cursor: pointer;
    &:hover {
      background: #dcefec;
    }
  }
}
</style>



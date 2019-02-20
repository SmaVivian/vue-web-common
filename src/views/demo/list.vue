<template>
  <div class="g-main page-info-list">
    <div class="g-content-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资讯动态</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
        <div class="box">
          <router-link tag="div" class="item"
            v-for="(item, index) in dataList"
            :to="{path: '/demo/detail', query: {id: item.id}}"
            :key="index">
            <div class="item-img">
              <img :src="item.picUrl || ''" alt="" :onerror="defaultImg">
            </div>
            <div class="item-word">
              <div class="title ell">
                {{item.title}}
              </div>
              <div class="info">
                <p><span>类型：{{item.des}}</span> <span>发布时间：{{item.createTime}}</span></p>
                <div class="info-content" v-html="item.detail"></div>
              </div>
            </div>
          </router-link>
        </div>

        <el-pagination
          v-show="dataList.length && !hasLoading"
          class="g-outline"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="listQuery.currentPage"
          :page-size="listQuery.size"
          :total="totalNum">
        </el-pagination>

        <div class="g-no-data" v-if="!dataList.length && hasLoading">
          <div class="no-data-bg"></div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "information",
  data() {
    return {
      defaultImg: this.$store.state.defaultImg,
      hasLoading: false,

      dataList: [],
      listQuery: {
        currentPage: 1,
        size: 3
      },
      totalNum: 0,
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getData()
    },
    getData() {
      this.hasLoading = false
      this.$http.get('/list', {
        ...this.listQuery
      })
      .then(res => {
        if(res.success) {
          this.dataList = res.data.list
          this.totalNum = res.data.page.allRow

          this.hasLoading = this.dataList.length ? false: true
        }
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.page-info-list {
  .content {
    width: 1200px;
    margin-top: 30px;
    .box {
      &:first-child .item {
        margin-top: 0;
      }
      .item {
        width: 1200px;
        height: 230px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 5px 10px 0px rgba(208, 207, 204, 0.7);
        padding: 40px;
        box-sizing: border-box;
        position: relative;
        margin-top: 20px;
        margin-bottom: 20px;
        cursor: pointer;
        .item-img {
          float: left;
          width: 200px;
          height: 150px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .item-word {
          float: left;
          .title {
            margin-left: 20px;
            font-size: 18px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 25px;
            width: 850px;
          }
          .info {
            margin-left: 20px;
            margin-top: 30px;
            p {
              font-size: 14px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 20px;
              span {
                margin-right: 70px;
              }
            }
            .info-content {
              width: 880px;
              height: 60px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 20px;
              margin-top: 15px;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>


<template>
  <div class="g-content-wrap">
    <div class="search page-search">
      <div class="content">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
        </el-breadcrumb>
        
        <div class="listCont">
          <div class="searchcont">
            <span>分类</span>
            <el-select v-model="typeName" placeholder="请选择" @change="selectType">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>

            <el-input class="key-box" v-model="listQuery.keyword" placeholder="请输入内容" @keyup.enter.native="search"></el-input>

            <button class="btn" @click="search">搜索</button>
          </div>
          <div class="listTitle">
            <span>来源</span>
            <span>类型</span>
          </div>
          <ul class="list">
            <li v-for="item in dataList" :key="item.id" @click="gotopage(item.id, item.type, item)">
              <div class="names">
              <span class="circle"></span>
              <span class="name ellipse" v-html="brightenKeyword(item.name, listQuery.keyword)"></span>
              </div>
              <span class="type">{{typeArray[item.type]}}</span>
            </li>

            <div class="g-no-databox" v-if="dataList.length === 0 && hasLoading">
                <div class="g-no-data">
                  <div class="no-data-bg"></div>
                </div>
              </div>
          </ul>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data(){
      return {
        hasLoading: false,

        dataList: [],
        totalNum: 0,
        typeName: '',
        listQuery: {
          currentPage: 1,
          size: 3,
          keyword: '',
          typeId: ''
        },
        typeList:[
          {
          id:"",
          name:"请选择"
          },
          {
            id:"1",
            name:"藏品"
          },
          {
            id:"2",
            name:"博物馆"
          },
          {
            id:"3",
            name:"展览"
          },
          {
            id:"4",
            name:"数字展厅"
          },{
            id:"5",
            name:"新闻动态"
          },
          {
            id:"6",
            name:"通知公告"
          },{
            id:"7",
            name:"学术讲座"
          },{
            id:"8",
            name:"亲子活动"
          },{
            id:"9",
            name:"文创产品"
          }
        ],
        // type 1：藏品 2：博物馆 3：展览 4：数字展厅 5：新闻动态 6：通知公告 7：学术讲座 8：亲子活动 9：文创产品
        typeArray:{
          "1":"藏品",
          "2":"博物馆",
          "3":"展览",
          "4":"数字展厅",
          "5":"新闻动态",
          "6":"通知公告",
          "7":"学术讲座",
          "8":"亲子活动",
          "9":"文创产品"
        },
        thmlArray:{
          "1":"/collection/detail",
          "2":"/province/detail",
          "3":"/exhibition/detail",
          "4":"",
          "5":"/information/infodetail?type=info",
          "6":"/information/infodetail?type=notice",
          "7":"/information/studydetail?type=study",
          "8":"/information/studydetail?type=activity",
          "9":"/artical/detail"
        }
      }
    },
    watch: {
      $route() {
        if(this.$route.path !== '/demo/searchlist') return;
        this.listQuery.keyword = unescape(this.$route.query.keyword || '');
        this.getData();
      }
    },
    methods:{
      // 下拉框
      selectType(type) {
        this.listQuery.typeId = type;
        this.getData();
      },
      // 筛选变色
      brightenKeyword(val, keyword) {
        if(!keyword) return val;
        const Reg = new RegExp(keyword, 'i');
        if (val) {
          const res = val.replace(Reg, `<span style="color: #49A6FF;">${keyword}</span>`);
          return res;
        }
      },
      // 搜索
      search() {
        this.getData();
      },
      // 跳转详情
      gotopage(num, type, item){
        this.$router.push({
          path: '/demo/detail',
          query: {id: num}
        });
        // if(type === '4') {
        //   window.open(item.url);
        // } else {
        //   this.$router.push({
        //     path: this.thmlArray[type],
        //     query:{id:num}
        //   });
        // }
      },
      handleCurrentChange(val) {
        this.listQuery.currentPage = val
        this.getData()
      },
      getData() {
        this.$http.get('/list/search', {
          ...this.listQuery
        }).then((res)=>{
          if(res.success==1){
            this.totalNum = res.page.allRow;
            this.dataList = res.data;

            this.hasLoading = this.dataList.length ? false: true;
          }
        })
      }
    },
    created() {
      this.listQuery.keyword = unescape(this.$route.query.keyword || '');
      this.getData();
    }
  }
</script>

<style scoped lang="sass">
.search
  // background: url("../../assets/image/back_bg.png") center repeat
  background-size: 85px 85px
  padding-bottom: 60px
  .content
    width: 1200px
    margin: 0 auto
    min-height: 560px
    .thumber
      height: 50px
      line-height: 50px
      font-size: 14px
      font-family: PingFang-SC-Medium
      font-weight: 500
      text-align: left
      color: rgba(103,120,151,1)
      line-height: 50px
    .listCont
      width: 1160px
      margin: 0 auto
      padding: 47px 20px 83px
      position: relative
      background: rgba(255,255,255,1)
      border-radius: 1px
      .searchcont
        display: flex
        justify-content: start
        span
          height: 28px
          font-size: 20px
          font-family: PingFang-SC-Heavy
          font-weight: 800
          color: rgba(44,43,43,1)
          line-height: 28px
          margin-right: 20px
        .key-box
          margin-left: 20px

        .types
          position: relative
          img
            top: 14px
            right: 10px
            position: absolute
          .popList
            text-align: left
            position: absolute
            border: 1px solid #9AA8B6
            z-index: 10
            width: 157px
            height: 120px
            overflow: auto
            padding: 0 5px
            background-color: white
            &::-webkit-scrollbar
              width: 0 !important
            li
              &:hover
                cursor: pointer
              span
                font-family: PingFang-SC-Medium
                font-weight: 500
                text-align: left
                font-size: 14px
                color: #677897
          input
            padding-left: 10px
            width: 167px
            height: 28px
            box-sizing: border-box
            border-radius: 5px
            outline: none
            border: 1px solid #9AA8B6
            font-size: 12px
            font-family: PingFang-SC-Regular
            font-weight: 400
            color: rgba(154,168,182,1)
            line-height: 28px
        input
          padding-left: 10px
          width: 167px
          height: 28px
          box-sizing: border-box
          border-radius: 5px
          outline: none
          border: 1px solid #9AA8B6
          font-size: 12px
          font-family: PingFang-SC-Regular
          font-weight: 400
          color: rgba(154,168,182,1)
          line-height: 28px
        .btn
          width: 64px
          height: 28px
          background: linear-gradient(126deg,rgba(72,165,255,1) 0%,rgba(129,226,255,1) 100%)
          border-radius: 14px
          font-size: 12px
          text-align: center
          font-family: PingFang-SC-Regular
          font-weight: 400
          border: none
          outline: none
          color: rgba(255,255,255,1)
          line-height: 28px
          margin-left: 20px
          &:hover
            cursor: pointer
      .listTitle
        display: flex
        justify-content: space-between
        width: 1034px
        margin: 30px auto 8px
        span
          width: 40px
          height: 28px
          font-size: 20px
          font-family: PingFang-SC-Heavy
          font-weight: 800
          color: rgba(44,43,43,1)
          line-height: 28px
      .list
        border-top: 2px solid #DFE9EF
        border-bottom: 2px solid #DFE9EF
        padding-top: 10px
        padding-left: 43px
        min-height: 450px
        li
          display: flex
          justify-content: space-between
          margin-bottom: 20px
          width: 1117px
          &:hover
            cursor: pointer
          .names
            display: flex
            justify-content: space-between
            width: 1017px
            text-align: left
            .circle
              width: 6px
              margin-top: 14px
              height: 6px
              display: block
              border-radius: 50%
              background-color: #49A6FF
            .name
              height: 34px
              font-size: 14px
              width: 980px
              display: block
              font-family: PingFang-SC-Medium
              font-weight: 500
              text-align: left
              color: rgba(103,120,151,1)
              line-height: 34px
          .type
            height: 34px
            width: 100px
            text-align: left
            font-size: 14px
            font-family: PingFang-SC-Medium
            font-weight: 500
            color: rgba(103,120,151,1)
            line-height: 34px
      .outline
        height: 28px
        border-radius: 14px
        border: 1px solid
        color: #9AA8B6
        position: absolute
        left: 370px
        bottom: 30px
</style>

<style>
.el-input {
  width: auto;
}
.page-search .el-input__inner {
  border: 1px solid #9AA8B6;
  color: #9aa8b6;
  width: 167px;
  height: 28px;
  line-height: 28px;
}

.page-search .el-input__icon {
  line-height: 28px;
}
</style>


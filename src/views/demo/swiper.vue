<template>
  <div class="page-swiper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
        <div class="wrap" :style="{backgroundImage: 'url('+slide+')'}">
          I'm Slide {{ slide }}

        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.min.css'

let leftScreenVal, moveLeftVal
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        loop: true
      },
      swiperSlides: []
    }
  },
  methods: {
    getData() {
      this.swiperSlides = ['https://www.swiper.com.cn/demo/img/nature1.jpg', 'https://www.swiper.com.cn/demo/img/nature2.jpg', 'https://www.swiper.com.cn/demo/img/nature3.jpg', 'https://www.swiper.com.cn/demo/img/nature4.jpg', 'https://www.swiper.com.cn/demo/img/nature5.jpg', 'https://www.swiper.com.cn/demo/img/nature6.jpg']
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
.page-swiper {
  .swiper-container {
    width: 100%;
    .swiper-slide {
      position: relative;
      width: 100%;
      height: 300px;
      .wrap {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
      }
    }
  }
}
</style>



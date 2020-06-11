<template>
  <!-- 缩略图轮播Demo -->
  <div style="height: 500px;postion:relative;">
    <!-- swiper1 -->
    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
      <swiper-slide v-for="(slide, index) in swiperSlides" :key="index" :style="{backgroundImage: 'url('+slide+')'}">
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
    <!-- swiper2 Thumbs -->
    <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
      <swiper-slide v-for="(slide, index) in swiperSlides" :key="index" :style="{backgroundImage: 'url('+slide+')'}">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from "vue-awesome-swiper"
  import 'swiper/dist/css/swiper.min.css'
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      let vm = this
      return {
        swiperOptionTop: {
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            slideChange() {
              const swiperThumbs = vm.$refs.swiperThumbs.swiper
              swiperThumbs.slideTo(this.activeIndex)

              this.$('.gallery-thumbs .swiper-slide').css({ opacity: 0.4 })
              this.$(this.$('.gallery-thumbs .swiper-slide')[this.activeIndex])
              .css({ opacity: 1 })
            }
          }
        },
        swiperOptionThumbs: {
          spaceBetween: 10,
          slidesPerView: 4,
          touchRatio: 0.2,
          slideToClickedSlide: true,
          on:{
            click: function(){
              const swiperTop = vm.$refs.swiperTop.swiper
              swiperTop.slideTo(this.clickedIndex)

              this.$('.gallery-thumbs .swiper-slide').css({ opacity: 0.4 });
              this.$(this.clickedSlide).css({ opacity: 1 });
            },
          },
        }
      }
    },
    methods: {
      getData() {
        // this.swiperSlides = ['https://www.swiper.com.cn/demo/img/nature1.jpg', 'https://www.swiper.com.cn/demo/img/nature2.jpg', 'https://www.swiper.com.cn/demo/img/nature3.jpg', 'https://www.swiper.com.cn/demo/img/nature4.jpg', 'https://www.swiper.com.cn/demo/img/nature5.jpg', 'https://www.swiper.com.cn/demo/img/nature6.jpg']

        this.swiperSlides = ['https://github.surmon.me/vue-awesome-swiper/static/images/surmon-1.jpg', 'https://github.surmon.me/vue-awesome-swiper/static/images/surmon-6.jpg', 'https://github.surmon.me/vue-awesome-swiper/static/images/surmon-7.jpg','https://github.surmon.me/vue-awesome-swiper/static/images/surmon-8.jpg','https://github.surmon.me/vue-awesome-swiper/static/images/surmon-3.jpg','https://github.surmon.me/vue-awesome-swiper/static/images/surmon-4.jpg','https://github.surmon.me/vue-awesome-swiper/static/images/surmon-5.jpg']
      }
    },
    created() {
      this.getData()
    },
  }
</script>

<style lang="scss" scoped>
  .swiper-container {
    background-color: #000;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .gallery-top {
    height: 80%!important;
    width: 100%;
  }
  .gallery-thumbs {
    height: 20%!important;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
</style>
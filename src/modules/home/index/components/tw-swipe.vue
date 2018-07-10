<template>
    <section class="tw-swipe">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(img,index) in imgs" :key="index">
                <img v-lazy="img"/>
            </van-swipe-item>
        </van-swipe>
    </section>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload } from 'vant'
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
export default {
  props: {
    imgs: Array
  }
}
</script>

<style lang="less">
.tw-swipe {
  height: 1.8rem;
  width: 100%;
  img {
    display: inline-block;
    width: 100%;
    height: 1.8rem;
  }
}
.van-swipe__indicator--active {
    background-color: #007aff;
}
</style>
